import to from 'await-to-js';
import { Op } from 'sequelize';
import sanitize from '../../sanitization';
import { validateToken, validatePassword } from '../../validation';
import { User } from '../../models';
import { resError, resSuccess } from '../../utils';
import { errors, successes, titles } from '../../constants/messages';

/* eslint-disable prefer-const */

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  // Input validation
  if (!token) {
    resError(
      res,
      500,
      titles.RESET_PASSWORD,
      errors.RESET_PASSWORD_TOKEN_NOT_PROVIDED,
    );
    return;
  }

  if (!password) {
    resError(res, 500, titles.RESET_PASSWORD, errors.PASSWORD_IS_NOT_PROVIDED);
    return;
  }

  const passwordValidationError = validatePassword(password, false);
  if (passwordValidationError.length > 0) {
    resError(res, 500, titles.RESET_PASSWORD, passwordValidationError);
    return;
  }

  const tokenValidationError = validateToken(token);
  if (passwordValidationError.length > 0) {
    resError(res, 500, titles.RESET_PASSWORD, tokenValidationError);
    return;
  }

  const passwordSanitized = sanitize(password);
  const tokenSanitized = sanitize(token);

  let err;
  let user;

  [err, user] = await to(
    User.findOne({
      where: {
        resetPasswordToken: tokenSanitized,
        resetPasswordTokenCreatedAt: {
          [Op.gt]: new Date(new Date() - 5 * 60 * 1000),
        },
      },
    }),
  );

  if (err) {
    resError(res, 500, titles.RESET_PASSWORD, errors.DATABASE_ERROR);
    return;
  }

  // nobody relates to this token so it is not valid
  if (!user) {
    resError(
      res,
      500,
      titles.RESET_PASSWORD,
      errors.RESET_PASSWORD_TOKEN_NOT_VALID,
    );
    return;
  }

  user.password = User.generateHash(passwordSanitized); // eslint-disable-line
  user.resetPasswordToken = null; // eslint-disable-line
  user.resetPasswordTokenCreatedAt = null;

  [err] = await to(user.save());

  if (err) {
    resError(res, 500, titles.RESET_PASSWORD, errors.DATABASE_ERROR);
    return;
  }

  resSuccess(
    res,
    200,
    successes.RESET_PASSWORD,
    successes.RESET_PASSWORD_SUCCESSFULLY,
  );
};

export default resetPassword;
