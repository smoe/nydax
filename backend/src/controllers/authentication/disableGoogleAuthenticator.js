import speakeasy from 'speakeasy';
import to from 'await-to-js';
import { validateToken } from '../../validation';
import sanitize from '../../sanitization';
import { resError, resSuccess } from '../../utils';
import { User, UserAuthStatus } from '../../models';
import { errors, successes, titles } from '../../constants/messages';

/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */

const disableGoogleAuthenticator = async (req, res) => {
  const { token } = req.body;

  // Input validation
  if (!token) {
    resError(res, 500, titles.GOOGLE_AUTH, errors.GOOGLE_TOKEN_NOT_PROVIDED);
    return;
  }

  const tokenValidationError = validateToken(token);
  if (tokenValidationError.length > 0) {
    resError(res, 500, titles.GOOGLE_AUTH, tokenValidationError);
    return;
  }

  // input sanitization
  const tokenSanitized = sanitize(token);

  let err;
  let userAuthStatus;

  [err, userAuthStatus] = await to(
    UserAuthStatus.findOne({
      where: { userId: req.user.id },
      include: [User],
    }),
  );

  if (err) {
    resError(res, 500, titles.GOOGLE_AUTH, errors.DATABASE_ERROR);
    return;
  }

  const verified = speakeasy.totp.verify({
    secret: userAuthStatus.twoFactorAuthSecret,
    encoding: 'base32',
    token: tokenSanitized,
  });

  if (verified) {
    userAuthStatus.twoFactorAuthEnabled = false;
    userAuthStatus.twoFactorAuthSecret = null;
    [err] = await to(userAuthStatus.save());

    if (err) {
      resError(res, 500, titles.GOOGLE_AUTH, errors.DATABASE_ERROR);
      return;
    }

    resSuccess(res, 200, titles.GOOGLE_AUTH, successes.GOOGLE_AUTH_DISABLED);
  } else {
    resError(res, 500, titles.GOOGLE_AUTH, errors.GOOGLE_AUTH_TOKEN_INVALID);
  }
};

export default disableGoogleAuthenticator;
