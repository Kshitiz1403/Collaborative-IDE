export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserInputDTO {
  name: string;
  username: string;
  email: string;
  password: string;
}
