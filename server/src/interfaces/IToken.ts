export interface IToken {
  username: string;
  email: string;
  role: string;
  exp?: number;
  iat?: number;
}
