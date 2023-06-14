import { Inject, Service } from 'typedi';
import Mailer from '@/loaders/mailer';
import { MailUtilService } from './mailUtilService';
import moment from 'moment';
import config from '@/config';

@Service()
export default class MailerService {
  protected FROM = config.emails.from;

  constructor(
    @Inject('emailClient') private emailClient: typeof Mailer,
    @Inject('logger') private logger,
    private mailUtilService: MailUtilService,
  ) {}

  private SUCCESS = (messageId: string) => {
    return { delivered: 1, messageId, status: 'OK' };
  };

  private ERROR = error => {
    return { delivered: 0, messageId: null, status: 'error', error };
  };

  public sendWelcomeEmail = async (email: string, name: string) => {
    const template = this.mailUtilService.welcomeEmailTemplate(name);

    const data = {
      from: this.FROM,
      to: [email],
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    try {
      const message = await this.emailClient.sendMail(data);
      const messageId = message.messageId;

      const status = this.SUCCESS(messageId);
      this.logger.info('%o', status);
      return status;
    } catch (e) {
      const status = this.ERROR(e);
      this.logger.error('%o', status);
      return status;
    }
  };

  public sendResetPasswordEmail = async (name: string, email: string, link: string, token_expiry: Date) => {
    const now = moment(new Date());
    const expireDate = moment(token_expiry);
    const expiryTime = expireDate.from(now, true);

    const template = this.mailUtilService.resetPasswordEmailTemplate(name, expiryTime, link);

    const data = {
      from: this.FROM,
      to: [email],
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    try {
      const message = await this.emailClient.sendMail(data);
      const messageId = message.messageId;

      const status = this.SUCCESS(messageId);
      this.logger.info('%o', status);
      return status;
    } catch (e) {
      const status = this.ERROR(e);
      this.logger.error('%o', status);
      return status;
    }
  };
}
