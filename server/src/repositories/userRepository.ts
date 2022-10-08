import UserModel from '@/models/user';
import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import { injectable } from 'inversify';

@injectable()
export class UserRepository {
  constructor() {}

  public findUserByEmail = async (email: string): Promise<IUser> => {
    return (await UserModel.findOne({ where: { email } })).toJSON();
  };

  public findUserByUsername = async (username: string): Promise<IUser> => {
    return (await UserModel.findOne({ where: { username } })).toJSON();
  };

  public createUser = async (userInputDTO: IUserInputDTO, salt: string, password: string) => {
    return (
      await UserModel.create(
        {
          ...userInputDTO,
          salt: salt,
          password: password,
        },
        { raw: true },
      )
    ).toJSON();
  };
}
