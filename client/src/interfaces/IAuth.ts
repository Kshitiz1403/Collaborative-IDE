import { IAPI } from "../interfaces/IAPI";
export interface IAuth extends Omit<IAPI, "data"> {
  user: {
    role: string;
    name: string;
    username: string;
    email: string;
    updatedAt: Date;
    createdAt: Date;
  };
  token: string;
}


export interface IUserSignupInputDTO {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserLoginInputDTO {
  username: string;
  password: string;
}

export interface IUser extends Omit<IAuth['user'], "token"> {
  
}