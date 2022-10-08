import { IMailTemplate } from "@/interfaces/IMail";

export class MailUtilService {
  public welcomeEmailTemplate = (name: string, email: string): IMailTemplate => {
    return {
        subject:"Thanks for using Collaborative IDE",
        text: `Hey ${name},\r\n\r\nI\u2019m Kshitiz, the creator of Collaborative IDE and I\u2019d like to personally thank you for signing up.\r\nI\u2019d love to hear what you think of Collaborative IDE and if there is anything I can improve. \r\nIf you have any questions, please reply to this email. I\u2019m always happy to help!\r\n\r\nKshitiz Agrawal`,
        html:"<b>to do</b>"
    }
  };
}
