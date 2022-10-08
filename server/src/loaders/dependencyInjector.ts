import { Container } from 'typedi';
import LoggerInstance from './logger';
import MailerInstance from './mailer';

export default () => {
  try {
    Container.set('emailClient', MailerInstance)
    Container.set('logger', LoggerInstance);
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
