import { IPasswordResetToken } from '@/interfaces/IPasswordResetToken';
import { IUserInputDTO } from '@/interfaces/IUser';
import AuthService from '@/services/authService';
import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import { Result } from '../util/result';

@Service()
export class AuthController {
  protected logger: Logger;
  protected authServiceInstance: AuthService;
  constructor(@Inject('logger') logger: Logger, authService: AuthService) {
    this.logger = logger;
    this.authServiceInstance = authService;
  }
  public signup = async (req: Request, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
    try {
      const { user, token } = await this.authServiceInstance.signUp(req.body as IUserInputDTO);
      return res.status(201).json(Result.success<Object>({ user, token }));
    } catch (e) {
      this.logger.error('🔥 error: %o', e);
      return next(e);
    }
  };

  public signin = async (req: Request, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    try {
      const { username, password } = req.body;
      const { user, token } = await this.authServiceInstance.signIn(username, password);
      return res.json(Result.success<Object>({ user, token })).status(200);
    } catch (e) {
      return next(e);
    }
  };

  public forgot = async (req: Request, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Forgot Password endpoint with body: %o', req.body);
    try {
      const username = req.body?.username;
      const email = req.body.email;
      const status = await this.authServiceInstance.forgotPassword(username, email);
      return res.status(200).json(Result.success<Object>(status));
    } catch (e) {
      return res.status(500).json(Result.error(e));
    }
  };

  public checkResetToken = (req: Request & { token: IPasswordResetToken }, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Check Reset Password Token endpoint');
    const isToken = this.authServiceInstance.checkValidResetToken(req.token);
    return res.status(200).json(Result.success(isToken));
  };

  public reset = async (req: Request & { token: IPasswordResetToken }, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Reset Password endpoint with body: %o', req.body);
    try {
      const user = await this.authServiceInstance.resetPassword(req.token, req.body.password, req.token.username);
      return res.status(200).json(Result.success(user));
    } catch (e) {
      return res.status(500).json(Result.error(e));
    }
  };

  public logout = (req: Request, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      this.logger.error('🔥 error %o', e);
      return next(e);
    }
  };
}
