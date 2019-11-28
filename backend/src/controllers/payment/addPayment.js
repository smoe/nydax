import to from 'await-to-js';
import uuidv4 from 'uuid/v4';
import { validateAmount } from '../../validation';
import { Token, Currency } from '../../models';
import BankPayment from '../../models/Bank/BankPayment';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';
import sanitize from '../../sanitization';

/* eslint-disable prefer-const */

const addPayment = async (req, res) => {
  const { tokenAmount } = req.body;
  const { tokenSymbol } = req.body;

  const userId = req.user.id;
  const currencyAbbr = 'USD';
  let err;
  let token;
  let currency;
  let bankPayment;

  // input sanitization
  const sanitizedTokenSymbol = sanitize(tokenSymbol);
  const sanitizedTokenAmount = Number(sanitize(tokenAmount));

  [err, token] = await to(
    Token.findOne({
      where: { symbol: sanitizedTokenSymbol },
    }),
  );

  if (err || !token) {
    resError(res, 500, titles.PAYMENT_ERROR, errors.BAD_TOKEN);
    return;
  }

  // input validation
  if (sanitizedTokenAmount > token.maxAllowedAmountForBuy) {
    resError(
      res,
      500,
      titles.PAYMENT_ERROR,
      errors.AMOUNT_IS_GREATER_THAN_MAX(
        tokenSymbol,
        token.maxAllowedAmountForBuy,
      ),
    );
    return;
  }

  const amountValidationError = validateAmount(sanitizedTokenAmount);
  if (amountValidationError.length > 0) {
    resError(res, 500, titles.USER_INFO_ERROR, amountValidationError);
    return;
  }

  [err, currency] = await to(
    Currency.findOne({
      where: { abbreviation: currencyAbbr },
    }),
  );

  if (err || !currency) {
    resError(res, 500, titles.PAYMENT_ERROR, errors.BAD_CURRENCY);
    return;
  }

  if (currency.abbreviation !== 'USD') {
    resError(
      res,
      500,
      titles.PAYMENT_ERROR,
      errors.CURRENCY_NOT_SUPPORTED_FOR_PAYMENT,
    );
    return;
  }

  let costInCurrency = sanitizedTokenAmount * Number(token.usdPrice);

  const currencyDecimalsFactor = 10 ** currency.decimalPrecision;
  // Correct precision
  costInCurrency =
    Math.round(costInCurrency * currencyDecimalsFactor) /
    currencyDecimalsFactor;

  const bankPaymentFields = {
    paymentToken: uuidv4(),
    tokenAmount: sanitizedTokenAmount,
    currencyAmount: costInCurrency,
    userId,
    tokenId: token.id,
    currencyId: currency.id,
    bankPaymentStatusId: 1, // Requested
    bankServiceId: 1, // Stripe
  };

  [err, bankPayment] = await to(BankPayment.create(bankPaymentFields));

  if (err) {
    resError(res, 500, titles.PAYMENT_ERROR, errors.ADD_PAYMENT_ERROR);
    return;
  }

  res.status(200).json({ paymentToken: bankPayment.paymentToken });
};

export default addPayment;
