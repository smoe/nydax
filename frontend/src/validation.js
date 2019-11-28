/* eslint-disable no-useless-escape */
import validator from 'validator';
import owasp from 'owasp-password-strength-test';
import joi from 'joi';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { errors as errorList } from './constants/messages';

export const validateOrder = (order, orderPair) => {
  const schema = joi.object().keys({
    pairId: joi
      .number()
      .integer()
      .min(1)
      .required(),
    price: joi
      .number()
      .greater(0)
      .required()
      .precision(Number(orderPair.priceDecimals))
      .strict(),
    amount: joi
      .number()
      .greater(0)
      .required()
      .min(Number(orderPair.minTradeAmount))
      .precision(Number(orderPair.tradeAmountDecimals))
      .strict(),
    sideId: joi.number().valid(1, 2),
    typeId: joi.number().valid(1, 2),
  });

  const result1 = joi.validate(order, schema, { presence: 'required' });
  const result2 = joi.validate(
    { Total: order.price * order.amount },
    joi.object().keys({
      Total: joi.number().min(Number(orderPair.minOrderValue)),
    }),
    { presence: 'required' },
  );
  const result = result1.error ? result1 : result2;
  return result.error ? result.error.details[0].message : '';
};

export const validateUsername = username => {
  const errors = [];
  if (username.length === 0) {
    errors.push(errorList.USERNAME_FIELD_IS_EMPTY);
  } else if (!validator.isLength(username, { min: 0, max: 128 })) {
    errors.push(errorList.USERNAME_IS_TOO_LONG);
  }

  return errors;
};

export const validateFirstName = name => {
  let error = '';
  if (name.length === 0) {
    error = errorList.FIRST_NAME_FIELD_IS_EMPTY;
  } else if (!validator.isLength(name, { min: 0, max: 128 })) {
    error = errorList.NAME_IS_TOO_LONG;
  }
  return error;
};

export const validateLastName = name => {
  let error = '';
  if (name.length === 0) {
    error = errorList.LAST_NAME_FIELD_IS_EMPTY;
  } else if (!validator.isLength(name, { min: 0, max: 128 })) {
    error = errorList.NAME_IS_TOO_LONG;
  }
  return error;
};

export const validateEmail = email => {
  let error = '';
  if (email.length === 0) {
    error = errorList.EMAIL_FIELD_IS_EMPTY;
  } else if (!validator.isEmail(email)) {
    error = errorList.EMAIL_FORMAT_IS_INCORRECT;
  } else if (!validator.isLength(email, { min: 0, max: 128 })) {
    error = errorList.EMAIL_IS_TOO_LONG;
  }
  return error;
};

export const validatePassword = (password, isLogin) => {
  let error = '';
  const strength = owasp.test(password);
  if (isLogin) {
    if (password.length === 0) {
      error = errorList.PASSWORD_FIELD_IS_EMPTY;
    }
  } else if (password.length === 0) {
    error = errorList.PASSWORD_FIELD_IS_EMPTY;
  } else if (strength.errors.length > 0) {
    error = strength.errors[0];
  } else if (!validator.isLength(password, { min: 0, max: 128 })) {
    error = errorList.PASSWORD_IS_TOO_LONG;
  }

  return error;
};

export const validatePasswordConfirm = (password, passwordConfirm) => {
  let error = '';
  if (password !== passwordConfirm) {
    error = errorList.PASSWORD_CONFIRMATION_FAILED;
  }
  return error;
};

export const validatePhoneNumber = (phoneNumber, countryCode) => {
  const number = parsePhoneNumberFromString(countryCode + phoneNumber);
  let error = '';
  if (number) {
    if (!number.isValid()) {
      error = errorList.PHONE_NUMBER_IS_INCORRECT;
    }
  } else {
    error = errorList.PHONE_NUMBER_IS_NOT_PROVIDED;
  }
  return error;
};

export const validateTokenAmount = (amount, maxAmount) => {
  const schema = joi
    .number()
    .max(maxAmount)
    .greater(0)
    .precision(2)
    .strict();

  const result = joi.validate(amount, schema, { presence: 'required' });
  return result.error
    ? result.error.details[0].message.replace('value', 'Amount')
    : '';
};

export const validateTradeAmount = (amount, maxAmount, precision) => {
  const schema = joi
    .number()
    .max(maxAmount)
    .greater(0)
    .precision(precision)
    .strict();

  const result = joi.validate(amount, schema, { presence: 'required' });
  return result.error
    ? result.error.details[0].message.replace('value', 'Amount')
    : '';
};

export const validateTradePrice = (price, minPrice, maxPrice, precision) => {
  const schema = joi
    .number()
    .min(minPrice)
    .max(maxPrice)
    .precision(precision)
    .strict();

  const result = joi.validate(price, schema, { presence: 'required' });
  return result.error
    ? result.error.details[0].message.replace('value', 'Price')
    : '';
};

export const validateWithdrawAmount = (
  amount,
  minAmount,
  maxAmount,
  precision,
) => {
  const schema = joi
    .number()
    .min(minAmount)
    .max(maxAmount)
    .precision(precision)
    .strict();

  const result = joi.validate(amount, schema, { presence: 'required' });
  return result.error
    ? result.error.details[0].message.replace('value', 'Amount')
    : '';
};
