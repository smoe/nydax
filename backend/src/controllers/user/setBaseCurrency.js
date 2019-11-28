import to from 'await-to-js';
import { resError, resSuccess } from '../../utils';
import { validateId } from '../../validation';
import sanitize from '../../sanitization';
import { User, UserProfile } from '../../models';
import { errors, successes, titles } from '../../constants/messages';
/* eslint-disable prefer-const */

const setBaseCurrency = async (req, res) => {
  // Input validation
  const { id } = req.params;

  const idValidationError = validateId(id);
  if (idValidationError.length > 0) {
    resError(res, 500, titles.USER_INFO_ERROR, idValidationError);
    return;
  }

  // Input sanitization
  const idSanitized = sanitize(id);

  let err;
  let userProfile;

  [err, userProfile] = await to(
    UserProfile.findOne({
      where: {
        userId: req.user.id,
      },
      include: [User],
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  userProfile.baseCurrencyId = idSanitized; // eslint-disable-line
  [err] = await to(userProfile.save());
  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  resSuccess(
    res,
    200,
    successes.USER_PROFILE,
    successes.USER_BASE_CURRENCY_CHANGED,
  );
};

export default setBaseCurrency;
