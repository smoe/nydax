import to from 'await-to-js';
import { errors, titles } from '../../constants/messages';
import { User } from '../../models';
import { resError } from '../../utils';
import { validateEmail } from '../../validation';
import sanitize from '../../sanitization';
import sendResetPasswordEmail from './sendResetPasswordEmail';

const resetPasswordEmail = async (req, res) => {
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

  const [err, user] = await to(
    User.findOne({ where: { email: emailSanitized } }),
  );

  if (err) {
    resError(
      res,
      500,
      titles.RESET_PASSWORD_EMAIL_ERROR,
      errors.RESET_PASSWORD_LINK_NOT_SEND,
    );
    return;
  }

  if (!user) {
    // user with this email does not exist
    resError(
      res,
      500,
      titles.RESET_PASSWORD_EMAIL_ERROR,
      errors.USER_DOES_NOT_EXIST,
    );
    return;
  }

  sendResetPasswordEmail(req, res);
};

export default resetPasswordEmail;
