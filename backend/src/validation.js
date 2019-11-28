/* eslint-disable no-useless-escape */
import validator from 'validator';
import owasp from 'owasp-password-strength-test';
import joi from 'joi';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { errors as errorList } from './constants/messages';

// TODO: find a better place for maxBTCPerTrade
const maxBTCPerTrade = 2;

export const validateOrder = (order, orderPair) => {
  const schema = joi.object().keys({
    pairId: joi
      .number()
      .integer()
      .min(1)
      .required(),
    price: joi
      .number()
      .min(Number((Number(orderPair.lastPrice) * 0.8).toFixed(6)))
      .max(Number((Number(orderPair.lastPrice) * 1.2).toFixed(6)))
      .required()
      .precision(Number(orderPair.priceDecimals))
      .strict(),
    amount: joi
      .number()
      .greater(0)
      .max(Number((maxBTCPerTrade / Number(orderPair.lastPrice)).toFixed(6)))
      .required()
      .min(Number(orderPair.minTradeAmount))
      .precision(Number(orderPair.tradeAmountDecimals))
      .strict(),
    sideId: joi.number().valid(1, 2),
    typeId: joi.number().valid(1, 2),
  });

  const result1 = joi.validate(order, schema, { presence: 'required' });
  const result2 = joi.validate(
    { orderValue: order.price * order.amount },
    joi.object().keys({
      orderValue: joi.number().min(Number(orderPair.minOrderValue)),
    }),
    { presence: 'required' },
  );
  const result = result1.error ? result1 : result2;
  return result.error ? result.error.details[0].message : '';
};

export const validateTransaction = (transaction, token) => {
  const schema = joi.object().keys({
    walletId: joi
      .number()
      .integer()
      .min(1)
      .required(),
    destination: joi
      .string()
      .token()
      .max(256)
      .required(),
    amount: joi
      .number()
      .min(Number(token.minimumWithdrawalAmount))
      .max(Number(token.tokenCap))
      .precision(Number(token.decimalPrecision))
      .greater(0)
      .required(),
    tokenId: joi
      .number()
      .integer()
      .min(1),
    typeId: joi.number().valid(1, 2),
  });

  const result = joi.validate(transaction, schema, { presence: 'required' });
  return result.error ? result.error.details[0].message : '';
};

export const validateArrayOfEmails = array => {
  const schema = joi.array().items(joi.string().email());

  const result = joi.validate(array, schema, { presence: 'required' });
  return result.error ? result.error.details[0].message : '';
};

export const validatePhoneNumber = phoneNumber => {
  const number = parsePhoneNumberFromString(phoneNumber);
  let error = '';
  if (number) {
    if (!number.isValid()) {
      error = errorList.PHONE_NUMBER_IS_INCORRECT;
    }
  } else {
    error = errorList.PHONE_NUMBER_NOT_PROVIDED;
  }
  return error;
};

export const validateName = name => {
  const schema = joi
    .string()
    .max(128)
    .min(1);

  const result = joi.validate(name, schema, { presence: 'required' });
  return result.error ? result.error.details[0].message : '';
};

export const validateId = id => {
  const schema = joi
    .number()
    .integer()
    .min(1);

  const result = joi.validate(id, schema, { presence: 'required' });
  return result.error ? result.error.details[0].message : '';
};

export const validateToken = token => {
  let error = '';
  if (token.length === 0) {
    error = errorList.TOKEN_FIELD_IS_EMPTY;
  } else if (!validator.isLength(token, { min: 0, max: 256 })) {
    error = errorList.TOKEN_IS_TOO_LONG;
  }
  return error;
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

export const validatePassword = (password, isRegister) => {
  let error = '';
  const strength = owasp.test(password);
  if (password.length === 0) {
    error = errorList.PASSWORD_FIELD_IS_EMPTY;
  } else if (password.length === 0) {
    error = errorList.PASSWORD_FIELD_IS_EMPTY;
  } else if (isRegister && strength.errors.length > 0) {
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

export const validateAmount = amount => {
  const schema = joi.number().min(0.000000001);

  const result = joi.validate(amount, schema, { presence: 'required' });
  return result.error ? result.error.details[0].message : '';
};
