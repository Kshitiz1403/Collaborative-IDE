export interface IPasswordResetToken {
  id: number;
  username: string;
  token: string;
  token_expiry: Date;
  createdAt: Date;
  updatedAt: Date;
  used: boolean;
}
export interface IPasswordResetTokenInputDTO {
  username: string;
  token: string;
  token_expiry: Date;
}
