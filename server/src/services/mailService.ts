import { inject, injectable } from 'inversify';
import { Inject } from 'typedi';
import Mailer from '@/loaders/mailer';
import { MailUtilService } from './mailUtilService';

@injectable()
export default class MailerService {
  constructor(
    @Inject('emailClient') private emailClient: typeof Mailer,
    @Inject('logger') private logger,
    @inject(MailUtilService) private mailUtilService: MailUtilService,
  ) {}

  private SUCCESS = messageId => {
    return { delivered: 1, messageId, status: 'OK' };
  };

  private ERROR = error => {
    return { delivered: 0, messageId: null, status: 'error', error };
  };

  public sendWelcomeEmail = async (email: string, name: string) => {
    const template = this.mailUtilService.welcomeEmailTemplate(name, email);
    
    const data = {
      from: 'Kshitiz Agrawal <no_reply@ide.kshitizagrawal.in>',
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
