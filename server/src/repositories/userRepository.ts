import UserModel from '@/models/user';
import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import { Service } from 'typedi';

@Service()
export class UserRepository {
  constructor() {}

  public findUserByEmail = async (email: IUserInputDTO['email']): Promise<IUser> => {
    return UserModel.findOne({ where: { email } }).then(user => {
      if (user) {
        return user.toJSON();
      }
    });
  };

  public findUserByUsername = async (username: IUserInputDTO['username']): Promise<IUser> => {
    return UserModel.findOne({ where: { username } }).then(user => {
      if (user) {
        return user.toJSON();
      }
    });
  };

  public updatePasswordByUsername = async (username: IUser['username'], salt: IUser['salt'], password: IUser['password']): Promise<IUser> => {
    return UserModel.update({ salt, password }, { where: { username }, returning: true }).then(async updatedResult => {
      const affectedRow = updatedResult[1];
      if (affectedRow) return await UserModel.findOne({ where: { username } }).then(result => result.toJSON());
    });
  };

  public createUser = async (userInputDTO: IUserInputDTO, salt: IUser['salt'], password: IUser['salt']): Promise<IUser> => {
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
