import to from 'await-to-js';
import twilio from 'twilio';
import config, { twilioService } from '../../config';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import { validatePhoneNumber } from '../../validation';
import sanitize from '../../sanitization';
import { User, UserAuthStatus } from '../../models';

/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */

const smsClient = twilio(twilioService.accountSID, twilioService.authToken);

const smsToken = async (req, res) => {
  const { phoneNumber } = req.body;

  // Input validation
  if (!phoneNumber) {
    resError(
      res,
      500,
      titles.SMS_AUTHENTICATION,
      errors.PHONE_NUMBER_NOT_PROVIDED,
    );
    return;
  }

  const phoneNumberValidationError = validatePhoneNumber(phoneNumber);
  if (phoneNumberValidationError.length > 0) {
    resError(res, 500, titles.SMS_AUTHENTICATION, phoneNumberValidationError);
    return;
  }

  // input sanitization
  const phoneNumberSanitized = sanitize(phoneNumber);

  let err;
  let userAuthStatus;

  const token = String(Math.floor(Math.random() * 90000) + 10000);
  [err] = await to(
    smsClient.messages.create({
      from: twilioService.phoneNumber,
      body: `Your ${config.platformName} verification code is:${token}`,
      to: phoneNumber,
    }),
  );

  if (err) {
    resError(res, 500, titles.SMS_AUTHENTICATION, errors.PROBLEM_SENDING_SMS);
    return;
  }

  [err, userAuthStatus] = await to(
    UserAuthStatus.findOne({
      where: { userId: req.user.id },
      include: [User],
    }),
  );

  if (err) {
    resError(res, 500, titles.SMS_AUTHENTICATION, errors.DATABASE_ERROR);
    return;
  }

  userAuthStatus.smsVerificationToken = token;
  userAuthStatus.phoneNumber = phoneNumberSanitized;
  [err] = await to(userAuthStatus.save());

  if (err) {
    resError(res, 500, titles.SMS_AUTHENTICATION, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({});
};

export default smsToken;
