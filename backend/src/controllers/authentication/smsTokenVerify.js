import to from 'await-to-js';
import { UserAuthStatus } from '../../models';
// import { twilioService } from '../../config';
import { resError, resSuccess } from '../../utils';
import { validateToken } from '../../validation';
import sanitize from '../../sanitization';
import { errors, successes, titles } from '../../constants/messages';

/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */

const smsTokenVerify = async (req, res) => {
  const { token } = req.body;

  // Input validation
  if (!token) {
    resError(
      res,
      500,
      titles.SMS_AUTHENTICATION,
      errors.SMS_TOKEN_NOT_PROVIDED,
    );
    return;
  }

  const tokenValidationError = validateToken(token);
  if (tokenValidationError.length > 0) {
    resError(res, 500, titles.SMS_AUTHENTICATION, tokenValidationError);
    return;
  }

  // input sanitization
  const tokenSanitized = sanitize(token);

  let err;
  let userAuthStatus;

  [err, userAuthStatus] = await to(
    UserAuthStatus.findOne({
      where: { userId: req.user.id, smsVerificationToken: tokenSanitized },
    }),
  );

  if (err) {
    resError(res, 500, titles.SMS_AUTHENTICATION, errors.DATABASE_ERROR);
    return;
  }

  if (userAuthStatus) {
    userAuthStatus.smsEnabled = !userAuthStatus.smsEnabled;
    userAuthStatus.smsVerificationToken = null;
    [err] = await to(userAuthStatus.save());
    if (err) {
      resError(res, 500, titles.SMS_AUTHENTICATION, errors.DATABASE_ERROR);
      return;
    }
    resSuccess(
      res,
      200,
      titles.SMS_AUTHENTICATION,
      successes.SMS_TOKEN_VERIFIED(userAuthStatus.smsEnabled),
    );
  }
};

export default smsTokenVerify;
