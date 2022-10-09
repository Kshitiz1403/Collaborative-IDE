import UserModel from '@/models/user';
import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import { injectable } from 'inversify';

@injectable()
export class UserRepository {
  constructor() {}

  public findUserByEmail = async (email: string): Promise<IUser> => {
    return UserModel.findOne({ where: { email } }).then(user => {
      if (user) {
        return user.toJSON();
      }
    });
  };

  public findUserByUsername = async (username: string): Promise<IUser> => {
    return UserModel.findOne({ where: { username } }).then(user => {
      if (user) {
        return user.toJSON();
      }
    });
  };

  public updatePasswordByUsername = async (username: string, salt: string, password: string) => {
    return UserModel.update({ salt, password }, { where: { username }, returning: true }).then(async updatedResult => {
      const affectedRow = updatedResult[1];
      if (affectedRow) return await UserModel.findOne({ where: { username } }).then(result => result.toJSON());
    });
  };

  public createUser = async (userInputDTO: IUserInputDTO, salt: string, password: string): Promise<IUser> => {
    return UserModel.create(
      {
        ...userInputDTO,
        salt: salt,
        password: password,
      },
      { raw: true },
    ).then(result => result.toJSON());
  };
}
