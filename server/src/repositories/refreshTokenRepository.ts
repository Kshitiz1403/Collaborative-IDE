import { IRefreshToken } from '@/interfaces/IRefreshToken';
import RefreshTokenModel from '@/models/refresh-tokens';
import { injectable } from 'inversify';

@injectable()
export class RefreshTokenRepository {
  constructor() {}

  public getRefreshTokenForUser = async (username: IRefreshToken['username']): Promise<IRefreshToken> => {
    return RefreshTokenModel.findOne({ where: { username } }).then(record => {
      if (record) {
        return record.toJSON();
      }
    });
  };

  public createRefreshTokenForUser = async (
    username: IRefreshToken['username'],
    token: IRefreshToken['token'],
    expiry: IRefreshToken['expiry'],
  ): Promise<IRefreshToken> => {
    return RefreshTokenModel.upsert({ username, token, expiry }).then(created => created[0].toJSON());
  };
}
