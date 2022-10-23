export interface IMail {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
}

export interface IMailTemplate {
  subject: string;
  text: string;
  html: string;
}
