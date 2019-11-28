import to from 'await-to-js';
import mjml2html from 'mjml';
import { resError } from '../../utils';
import User from '../../models/User/User';
import config from '../../config';
import { errors, titles } from '../../constants/messages';
import sendMail from '../../sendMail';
import { validateEmail } from '../../validation';
import sanitize from '../../sanitization';
import { UserProfile } from '../../models';

/* eslint-disable prefer-const */

const options = {};

const htmlOutput = (link, user) =>
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
        
        <mj-text font-size="20px" color="#a5bdea" font-family="helvetica">Confirm Your Registration</mj-text>
 
        <mj-divider border-color="#353e5c"></mj-divider>

        <mj-text font-size="18px" color="#a5bdea" font-family="helvetica">Welcome to ${
          config.platformName
        }!</mj-text>
        <mj-text font-size="15px" color="#a5bdea" font-family="helvetica">Hey ${
          user.UserProfile.firstName
        }, thank you for getting started with ${
      config.platformName
    }! Simply click on the button below to verify your Email address.
        </mj-text>
        <mj-button background-color="#7577ff" color="white" align="left" font-family="helvetica" href="${link}"> Verify Email </mj-button>
        <mj-spacer height="10px" />
        <mj-text font-size="15px" color="#a5bdea" font-family="helvetica">If you can't confirm by clicking the button above, please copy the address below to the browser address bar to confirm.
        </mj-text>
        <mj-text font-size="15px" font-family="helvetica"><a style="color: #a5bdea" href="${link}">${link}</a>
        </mj-text>
        <mj-divider border-color="#353e5c"></mj-divider>
        <mj-text font-weight="bold" font-size="15px" color="#F45E43" font-family="helvetica">4 security tips:
        </mj-text>
        <mj-text font-size="14px" color="#a5bdea" font-family="helvetica">* DO NOT give your password to anyone!
        </mj-text>
        <mj-text font-size="14px" color="#a5bdea" font-family="helvetica">* DO NOT call any phone number for someone claiming to be ${
          config.platformName
        } Support!
        </mj-text>
        <mj-text font-size="14px" color="#a5bdea" font-family="helvetica">* DO NOT send any money to anyone claiming to be a member of ${
          config.platformName
        }!
        </mj-text>
        <mj-text font-size="14px" color="#a5bdea" font-family="helvetica">* Enable Google Two Factor Authentication!
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

const sendConfirmationEmail = async (req, res) => {
  const { email, isResend } = req.body;

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

  let err; // eslint-disable-line
  let user;

  [err, user] = await to(
    User.findOne({ where: { email: emailSanitized }, include: [UserProfile] }),
  );

  if (!user) {
    resError(res, 500, titles.CONFIRM_EMAIL, errors.USER_DOES_NOT_EXIST);
    return;
  }

  if (user.emailConfirmed) {
    resError(
      res,
      500,
      titles.CONFIRM_EMAIL,
      errors.USER_EMAIL_ALREADY_CONFIRMED,
    );
    return;
  }

  let ip =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket;

  if (ip.substr(0, 7) === '::ffff:') {
    ip = ip.substr(7);
  }

  sendMail(
    email,
    `[${config.platformName}] Confirm Your Registration From ${ip}`,
    htmlOutput(
      `${config.frontEndServer}/auth/verifyEmail/${
        user.emailConfirmationToken
      }`,
      user,
    ).html,
  );

  if (isResend) {
    res.status(200).json({});
  }
  // resSuccess(
  //   res,
  //   200,
  //   successes.CONFIRM_EMAIL,
  //   successes.EMAIL_CONFIRMED_SUCCESSFULLY,
  // );
};

export default sendConfirmationEmail;
