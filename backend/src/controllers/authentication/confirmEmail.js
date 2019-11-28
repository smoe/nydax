import to from 'await-to-js';
import { resError, resSuccess } from '../../utils';
import { User } from '../../models';
import { errors, titles, successes } from '../../constants/messages';
// import config from '../../config';
import { validateToken } from '../../validation';
import sanitize from '../../sanitization';

/* eslint-disable prefer-const */

const confrimEmail = async (req, res) => {
  const { token } = req.params;

  // Input validation
  if (!token) {
    resError(
      res,
      500,
      titles.CONFIRM_EMAIL,
      errors.CONFIRM_EMAIL_TOKEN_NOT_PROVIDED,
    );
    return;
  }

  const tokenValidationError = validateToken(token);
  if (tokenValidationError.length > 0) {
    resError(res, 500, titles.CONFIRM_EMAIL, tokenValidationError);
    return;
  }

  // input sanitization
  const sanitizedToken = sanitize(token);

  let err;
  let user;

  [err, user] = await to(
    User.findOne({
      where: { emailConfirmationToken: sanitizedToken, emailConfirmed: false },
    }),
  );

  if (err) {
    // find user error in database
    resError(res, 500, titles.CONFIRM_EMAIL, errors.DATABASE_ERROR);
    return;
  }

  if (!user) {
    resError(
      res,
      500,
      titles.CONFIRM_EMAIL,
      errors.CONFIRM_EMAIL_TOKEN_NOT_VALID,
    );
    return;
  }

  user.emailConfirmed = true; // eslint-disable-line
  user.emailConfirmationToken = null; // eslint-disable-line

  [err] = await to(user.save());
  if (err) {
    resError(res, 500, titles.CONFIRM_EMAIL, errors.DATABASE_ERROR);
    return;
  }

  resSuccess(
    res,
    200,
    titles.CONFIRM_EMAIL,
    successes.EMAIL_CONFIRMED_SUCCESSFULLY,
  );

  // res.redirect(`${config.frontEndServer}/login?emailConfirmed=1`);
};

export default confrimEmail;
