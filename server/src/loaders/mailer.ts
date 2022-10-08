import config from '@/config';
import { IMail } from '@/interfaces/IMail';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const NodeMailerInstance = nodemailer.createTransport({
  host: config.emails.host,
  port: config.emails.port,
  secure: false,
  auth: {
    user: config.emails.username,
    pass: config.emails.password,
  },
});

const sendMail = async (data: IMail): Promise<SMTPTransport.SentMessageInfo> => {
  return new Promise(async (resolve, reject) => {
    try {
      const message = await NodeMailerInstance.sendMail(data);
      return resolve(message);
    } catch (e) {
      return reject(e);
    }
  });
};

export default { sendMail };
