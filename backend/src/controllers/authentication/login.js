import speakeasy from 'speakeasy';
import to from 'await-to-js';
import twilio from 'twilio';
import axios from 'axios';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { User, UserAuthStatus, UserLogin, Blacklist } from '../../models';
import config from '../../config';
import {
  validateEmail,
  validatePassword,
  validateToken,
} from '../../validation';
import sanitize from '../../sanitization';

const smsClient = twilio(
  config.twilioService.accountSID,
  config.twilioService.authToken,
);

/* eslint-disable no-param-reassign */

const insertUserLogin = async user => {
  await to(User.clearFailAttempts(user));
  await to(UserLogin.create({ userId: user.id }));
};

const login = async (req, res) => {
  const { email, password, smsToken, twoFAToken, captchaValue } = req.body;

  if (config.environment === 'production' && !smsToken && !twoFAToken) {
    // validate captcha value
    const [recaptchaErr, recaptchaValidationResponse] = await to(
      axios({
        method: 'post',
        url: `https://www.google.com/recaptcha/api/siteverify?secret=${
          config.recaptcha.secretKey
        }&response=${captchaValue}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
      }),
    );

    if (recaptchaErr || recaptchaValidationResponse.data.success === false) {
      resError(res, 500, titles.LOGIN_ERROR, errors.RECAPTCHA_VALIDATION_ERROR);
      return;
    }
  }

  // check if user is blacklisted
  // first we clear the expired records
  await to(Blacklist.clearExpired());
  // now we find the most recent one

  const blacklist = await to(Blacklist.count({ where: { email } }));
  if (blacklist[1] !== 0) {
    console.log(blacklist);
    resError(res, 500, titles.LOGIN_ERROR, errors.USER_IS_SUSPENDED);
    return;
  }
  // Input validation
  if (!email) {
    resError(res, 500, titles.LOGIN_ERROR, errors.EMAIL_IS_NOT_PROVIDED);
    return;
  }

  if (!password) {
    resError(res, 500, titles.LOGIN_ERROR, errors.PASSWORD_IS_NOT_PROVIDED);
    return;
  }

  const emailValidationError = validateEmail(email);
  const passwordValidationError = validatePassword(password, false);

  if (emailValidationError.length > 0) {
    resError(res, 500, titles.LOGIN_ERROR, emailValidationError);
    return;
  }
  if (passwordValidationError.length > 0) {
    resError(res, 500, titles.LOGIN_ERROR, passwordValidationError);
    return;
  }

  let smsTokenValidationError;
  let smsTokenSanitized;
  let twoFATokenValidationError;
  let twoFATokenSanitized;

  if (smsToken) {
    smsTokenValidationError = validateToken(smsToken);
    if (smsTokenValidationError.length > 0) {
      resError(res, 500, titles.LOGIN_ERROR, smsTokenValidationError);
      return;
    }
    smsTokenSanitized = sanitize(smsToken);
  }

  if (twoFAToken) {
    twoFATokenValidationError = validateToken(twoFAToken);
    if (twoFATokenValidationError.length > 0) {
      resError(res, 500, titles.LOGIN_ERROR, twoFATokenValidationError);
      return;
    }
    twoFATokenSanitized = sanitize(twoFAToken);
  }

  // input sanitization
  const emailSanitized = sanitize(email);
  const passwordSanitized = sanitize(password);

  let err;
  let user;

  // check if the user is signed in before
  if (!req.user) {
    [err, user] = await to(
      User.findOne({
        where: { email: emailSanitized },
        include: [{ model: UserAuthStatus }],
      }),
    );
    if (err) {
      console.log(err);
      resError(res, 500, titles.LOGIN_ERROR, errors.DATABASE_ERROR);
      return;
    }
    // wrong username or password
    if (!user || !User.validPassword(passwordSanitized, user)) {
      if (user) {
        User.addFailAttempts(user);
      }
      resError(res, 500, titles.LOGIN_ERROR, errors.EMAIL_PASSWORD_IS_WRONG);
      return;
    }
    // email is not confirmed yet
    if (!user.emailConfirmed) {
      resError(res, 500, titles.LOGIN_ERROR, errors.PLEASE_CONFIRM_YOUR_EMAIL);
      return;
    }

    // send jwt if 2FA is not enabled
    if (
      !user.UserAuthStatus.smsEnabled &&
      !user.UserAuthStatus.twoFactorAuthEnabled
    ) {
      await insertUserLogin(user);
      res.status(200).json({ token: User.getToken(user) });
      return;
    }

    // consider higher priority for google auth than sms auth
    if (!user.UserAuthStatus.twoFactorAuthEnabled) {
      if (smsTokenSanitized) {
        if (user.UserAuthStatus.smsVerificationToken === smsTokenSanitized) {
          await insertUserLogin(user);
          res.status(200).json({ token: User.getToken(user) });
        } else {
          User.addFailAttempts(user);
          resError(res, 500, titles.LOGIN_ERROR, errors.SMS_TOKEN_IS_NOT_VALID);
        }
        return;
      }

      const newSmsToken = String(Math.floor(Math.random() * 90000) + 10000);

      [err] = await to(
        smsClient.messages.create({
          from: config.twilioService.phoneNumber,
          body: `Your ${
            config.platformName
          } verification code is:${newSmsToken}`,
          to: user.UserAuthStatus.phoneNumber,
        }),
      );

      if (err) {
        resError(res, 500, titles.LOGIN_ERROR, errors.PROBLEM_SENDING_SMS);
        return;
      }

      user.UserAuthStatus.smsVerificationToken = newSmsToken;
      user.UserAuthStatus.save();

      await insertUserLogin(user);
      res.status(200).json({
        smsEnabled: user.UserAuthStatus.smsEnabled,
        twoFactorAuthEnabled: user.UserAuthStatus.twoFactorAuthEnabled,
      });
    } else {
      // Google authentication
      if (twoFATokenSanitized) {
        // eslint-disable-line
        const verified = speakeasy.totp.verify({
          secret: user.UserAuthStatus.twoFactorAuthSecret,
          encoding: 'base32',
          token: twoFATokenSanitized,
        });
        if (verified) {
          await insertUserLogin(user);
          res.status(200).json({ token: User.getToken(user) });
        } else {
          User.addFailAttempts(user);
          resError(
            res,
            500,
            titles.LOGIN_ERROR,
            errors.GOOGLE_AUTH_TOKEN_INVALID,
          );
        }
        return;
      }

      await insertUserLogin(user);
      res.status(200).json({
        smsEnabled: user.UserAuthStatus.smsEnabled,
        twoFactorAuthEnabled: user.UserAuthStatus.twoFactorAuthEnabled,
      });
    }
  } else {
    // user is signed in before
    resError(res, 500, titles.Login_ERROR, errors.USER_ALREADY_SIGNED_IN);
  }
};

export default login;
