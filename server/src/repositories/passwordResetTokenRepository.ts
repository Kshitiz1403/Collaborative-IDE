import { IPasswordResetToken, IPasswordResetTokenInputDTO } from '@/interfaces/IPasswordResetToken';
import { injectable } from 'inversify';
import PasswordResetTokenModel from '@/models/password-reset-token';
import UserModel from '@/models/user';

@injectable()
export class PasswordResetTokenRepository {
  constructor() {}

  public createResetToken = async (
    passwordResetTokenInputDTO: IPasswordResetTokenInputDTO,
  ): Promise<IPasswordResetToken> => {
    return PasswordResetTokenModel.create({ ...passwordResetTokenInputDTO }, { raw: true }).then(async token => {
      const username = token.username;
      const user = await UserModel.findOne({ where: { username } });
      const obj = { ...token.toJSON() };
      obj['email'] = user.email;
      return obj;
    });
  };

  public markTokenUsed = async (
    username: IPasswordResetTokenInputDTO['username'],
    token: IPasswordResetTokenInputDTO['token'],
  ): Promise<{ status: string }> => {
    return PasswordResetTokenModel.update({ used: true }, { where: { username, token }, returning: true }).then(
      result => {
        const affectedRow = result[1];
        if (affectedRow) return { status: 'OK' };
        throw { status: 'error' };
      },
    );
  };

  public getResetPasswordToken = async (resetPasswordToken: IPasswordResetTokenInputDTO['token']): Promise<IPasswordResetToken> => {
    return PasswordResetTokenModel.findOne({ where: { token: resetPasswordToken } }).then(record => {
      if (record) return record.toJSON();
    });
  };
}
