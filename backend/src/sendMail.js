import nodemailer from 'nodemailer';
import { errors } from './constants/messages';
import config from './config';

const transporter = nodemailer.createTransport({
  host: config.nodemailer.host,
  port: config.nodemailer.port,
  secure: false,
  auth: {
    user: config.nodemailer.user,
    pass: config.nodemailer.pass,
  },
});

const sendMail = (receiver, subject, html) => {
  const mailOptions = {
    from: config.nodemailer.user,
    to: receiver,
    subject,
    // text,
    html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`${errors.EMAIL_SEND_ERROR}: ` , error); // eslint-disable-line
    } else {
      console.log(`Email sent: ${info.response}`); // eslint-disable-line
    }
  });
};

export default sendMail;
