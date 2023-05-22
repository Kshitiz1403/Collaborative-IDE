import { Inject, Service } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '@/config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import { UserRepository } from '@/repositories/userRepository';
import MailerService from './mailService';
import { PasswordResetTokenRepository } from '@/repositories/passwordResetTokenRepository';
import { IPasswordResetToken } from '@/interfaces/IPasswordResetToken';
import { RefreshTokenRepository } from '@/repositories/refreshTokenRepository';
import { v4 as uuid } from 'uuid';
import { Logger } from 'winston';

@Service()
export default class AuthService {
  protected mailServiceInstance: MailerService;
  protected userRepositoryInstance: UserRepository;
  protected passwordResetRepositoryInstance: PasswordResetTokenRepository;
  protected refreshTokenRepositoryInstance: RefreshTokenRepository;
  constructor(
    @Inject('logger') private logger: Logger,
    userRepository: UserRepository,
    mailerService: MailerService,
    passwordResetTokenRepository: PasswordResetTokenRepository,
    refreshTokenRepository: RefreshTokenRepository,
  ) {
    this.userRepositoryInstance = userRepository;
    this.mailServiceInstance = mailerService;
    this.passwordResetRepositoryInstance = passwordResetTokenRepository;
    this.refreshTokenRepositoryInstance = refreshTokenRepository;
  }

  public async signUp(userInputDTO: IUserInputDTO, signedUpIP?): Promise<{ user: IUser; token: string }> {
    try {
      const { salt, hashedPassword } = await this.hashPassword(userInputDTO.password);

      this.logger.silly('Creating user db record');
      const userRecord = await this.userRepositoryInstance.createUser(
        userInputDTO,
        salt.toString('hex'),
        hashedPassword,
        signedUpIP
      );

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      const refreshTokenRecord = await this.generateRefreshToken(userRecord);

      this.logger.silly('Sending welcome email');
      this.mailServiceInstance.sendWelcomeEmail(userRecord.email, userRecord.name);

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const user = userRecord;
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw new Error(e);
    }
  }

  public async signIn(
    username: IUserInputDTO['username'],
    password: IUserInputDTO['password'],
  ): Promise<{ user: IUser; token: string }> {
    const userRecord = await this.userRepositoryInstance.findUserByUsername(username);
    if (!userRecord) {
      throw new Error('User not registered');
    }
    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      const user = userRecord;
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      /**
       * Easy as pie, you don't need passport.js anymore :)
       */
      return { user, token };
    } else {
      throw new Error('Invalid Password');
    }
  }

  public forgotPassword = async (username: IUserInputDTO['username'] | undefined, email: IUserInputDTO['email']) => {
    const handleSuccess = (username, email) => {
      if (email) return 'Check your email for password reset instructions';

      if (username) return 'Password reset email sent to email registered with ' + username;
    };
    const token = randomBytes(48).toString('hex');
    const token_expiry = this.getPasswordResetExpiryDuration();
    let user: IUser;

    if (!username) {
      user = await this.userRepositoryInstance.findUserByEmail(email);
    } else {
      user = await this.userRepositoryInstance.findUserByUsername(username);
    }

    if (!user) return handleSuccess(username, email);

    const password_reset_token = await this.passwordResetRepositoryInstance.createResetToken({
      username: user.username,
      token: token,
      token_expiry: token_expiry,
    });

    const reset_link = `https://${config.host}/reset/${token}`;

    this.mailServiceInstance.sendResetPasswordEmail(
      user.name,
      user.email,
      reset_link,
      password_reset_token.token_expiry,
    );

    return handleSuccess(username, email);
  };

  public checkValidResetToken = (token: IPasswordResetToken) => {
    this.logger.silly('Checking reset token');

    return 'Valid Reset Link';
  };

  public resetPassword = async (token: IPasswordResetToken, newPassword: string, username: string) => {
    try {
      const { salt, hashedPassword } = await this.hashPassword(newPassword);

      this.logger.silly('Updating user db record');
      const userRecord = await this.userRepositoryInstance.updatePasswordByUsername(
        username,
        salt.toString('hex'),
        hashedPassword,
      );
      await this.passwordResetRepositoryInstance.markTokenUsed(username, token.token);

      const user = userRecord;
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user };
    } catch (e) {
      throw new Error(e);
    }
  };

  private hashPassword = async (password: string) => {
    const salt = randomBytes(32);

    this.logger.silly('Hashing password');
    const hashedPassword = await argon2.hash(password, { salt });

    return { salt, hashedPassword };
  };

  private generateToken(user: IUser) {
    const today = new Date();
    const exp = new Date(today);
    exp.setTime(today.getTime() + 1000 * 60 * 60 * 24 * 10); //10 days

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for username: ${user.username}`);
    const token = jwt.sign(
      {
        role: user.role,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
    return `Bearer ${token}`;
  }

  private getPasswordResetExpiryDuration = () => {
    const now = new Date();
    const exp = new Date(now);
    exp.setTime(exp.getTime() + 1000 * 60 * 30); // 30 minutes from now
    return exp;
  };

  private generateRefreshToken = async (user: IUser) => {
    const today = new Date();
    const exp = new Date(today);
    exp.setTime(today.getTime() + 1000 * 60 * 60 * 24 * 30); //30 days

    const token = uuid();
    return await this.refreshTokenRepositoryInstance.createRefreshTokenForUser(user.username, token, exp);
  };
}
