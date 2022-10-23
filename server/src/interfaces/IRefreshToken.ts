export interface IRefreshToken {
  id: number;
  username: string;
  token: string;
  expiry: Date;
  createdAt: Date;
  updatedAt: Date;
}
