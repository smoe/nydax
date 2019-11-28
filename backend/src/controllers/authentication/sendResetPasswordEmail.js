import crypto from 'crypto';
import to from 'await-to-js';
import sequelize from 'sequelize';
import mjml2html from 'mjml';
import User from '../../models/User/User';
import config from '../../config';
import { errors, successes, titles } from '../../constants/messages';
import sendMail from '../../sendMail';
import { resError, resSuccess } from '../../utils';
import { validateEmail } from '../../validation';
import sanitize from '../../sanitization';

const options = {};

const htmlOutput = link =>
  mjml2html(
    `
    <mjml>
  <mj-body background-color="#1c2237">
    <mj-spacer height="50px" />
    <mj-section background-color="#252d47">
      <mj-column>

        <mj-image width="100" src="${
          config.frontEndServer
        }/logo/dark.png"></mj-image>
        <mj-spacer height="20px" />
        
        <mj-text font-size="20px" color="#a5bdea" font-family="helvetica">Password Reset</mj-text>

        <mj-divider border-color="#353e5c"></mj-divider>

        <mj-text font-size="15px" color="#a5bdea" font-family="helvetica">Someone asked us to send you a password reset link. If it was you, please press the button below within 24 hours.
        </mj-text>
        <mj-button background-color="#7577ff" color="white" align="left" font-family="helvetica" href="${link}"> Reset Password </mj-button>
        <mj-spacer height="10px" />
        <mj-text font-size="15px" color="#a5bdea" font-family="helvetica">If you can't confirm by clicking the button above, please copy the address below to the browser address bar to confirm.
        </mj-text>
        <mj-text font-size="15px" font-family="helvetica"><a style="color: #a5bdea" href="${link}">${link}</a>
        </mj-text>
        <mj-text font-size="15px" color="#a5bdea" font-family="helvetica">If you didn't request password reset, just ignore this email.
        </mj-text>

        <mj-spacer height="50px" />
        <mj-text line-height="5px" font-size="14px" color="gray" font-family="helvetica">${
          config.platformName
        } team
        </mj-text>
        <mj-text line-height="5px" font-size="14px" color="gray" font-family="helvetica">Automated message. please do not reply.
        </mj-text>
        
      </mj-column>
    </mj-section>
    <mj-spacer height="50px" />
  </mj-body>
</mjml>
`,
    options,
  );

/* eslint-disable prefer-const */

const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  // Input validation
  if (!email) {
    resError(
      res,
      500,
      titles.RESET_PASSWORD_EMAIL_ERROR,
      errors.EMAIL_IS_NOT_PROVIDED,
    );
    return;
  }

  const emailValidationError = validateEmail(email);
  if (emailValidationError.length > 0) {
    resError(res, 500, titles.RESET_PASSWORD_EMAIL_ERROR, emailValidationError);
    return;
  }

  // input sanitization
  const emailSanitized = sanitize(email);

  let err;
  let user;

  [err, user] = await to(User.findOne({ where: { email: emailSanitized } }));
  if (err) {
    resError(
      res,
      500,
      titles.RESET_PASSWORD,
      errors.RESET_PASSWORD_LINK_NOT_SEND,
    );
  }

  if (!user) {
    resError(res, 500, titles.RESET_PASSWORD, errors.USER_DOES_NOT_EXIST);
    return;
  }

  const token = crypto.randomBytes(32).toString('hex');

  user.resetPasswordToken = token; // eslint-disable-line
  user.resetPasswordTokenCreatedAt = sequelize.literal('CURRENT_TIMESTAMP');
  [err] = await to(user.save());
  if (err) {
    resError(
      res,
      500,
      titles.RESET_PASSWORD,
      errors.RESET_PASSWORD_LINK_NOT_SEND,
    );
    return;
  }

  // let ip =
  //   req.headers['x-forwarded-for'] ||
  //   req.connection.remoteAddress ||
  //   req.socket.remoteAddress ||
  //   req.connection.socket;

  // if (ip.substr(0, 7) === '::ffff:') {
  //   ip = ip.substr(7);
  // }

  sendMail(
    email,
    `[${config.platformName}] Password Reset Request`,
    htmlOutput(`${config.frontEndServer}/resetPassword/${token}`).html,
  );

  resSuccess(
    res,
    200,
    titles.RESET_PASSWORD,
    successes.RESET_PASSWORD_LINK_SENT,
  );
};

export default sendResetPasswordEmail;
