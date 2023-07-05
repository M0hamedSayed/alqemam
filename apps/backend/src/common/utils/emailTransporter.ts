import nodemailer from 'nodemailer';
import { logger } from './logger';
import config from '../config/env-config';

export const sendEmail = async (email: string, subject: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      port: 465,
      secure: true,
      auth: {
        user: config.email.admin,
        pass: config.email.pass,
      },
    });

    await transporter.sendMail({
      from: config.email.admin,
      to: email,
      subject: subject,
      html: html,
    });
    logger.info('email sent successfully');
  } catch (error: unknown) {
    logger.error(error);
  }
};
