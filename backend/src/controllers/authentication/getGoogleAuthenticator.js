import to from 'await-to-js';
import speakeasy from 'speakeasy';
import qrCode from 'qrcode';
import { resError } from '../../utils';
import { User, UserAuthStatus } from '../../models';
import { errors, titles } from '../../constants/messages';
import config from '../../config';

/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */

const capitalizeFirstLetter = string =>
  string
    .toLowerCase()
    .charAt(0)
    .toUpperCase() + string.toLowerCase().slice(1);

const getGoogleAuthenticator = async (req, res) => {
  let err;
  let userAuthStatus;
  let user;

  [err, user] = await to(
    User.findOne({
      where: { id: req.user.id },
    }),
  );

  if (err) {
    resError(res, 500, titles.GOOGLE_AUTH, errors.DATABASE_ERROR);
    return;
  }

  const secret = speakeasy.generateSecret({
    name: `${capitalizeFirstLetter(config.platformName)}.com (${user.email})`,
    length: 20,
  });
  let Qrimg = '';

  [err, Qrimg] = await to(qrCode.toDataURL(secret.otpauth_url));
  if (err) {
    resError(res, 500, titles.GOOGLE_AUTH, errors.GOOGLE_AUTH_GET_QRCODE_ERROR);
    return;
  }

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

  userAuthStatus.twoFactorAuthSecret = secret.base32;

  [err] = await to(userAuthStatus.save());
  if (err) {
    resError(res, 500, titles.GOOGLE_AUTH, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({
    qrUrl: Qrimg,
    secret,
    isAuthenticatorEnable: userAuthStatus.twoFactorAuthEnabled,
  });
};

export default getGoogleAuthenticator;
