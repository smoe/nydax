import to from 'await-to-js';
import Stripe from 'stripe';
import uuidv4 from 'uuid/v4';
import { Token, Currency, Wallet, Transaction } from '../../models';
import BankPayment from '../../models/Bank/BankPayment';
import { resError, resSuccess } from '../../utils';
import { errors, titles, successes } from '../../constants/messages';
import config from '../../config';

/* eslint-disable prefer-const */

// TODO: design a polymorphism-like structure
//   to be able to support many payment services
const submitPayment = async (req, res) => {
  const { secretKey } = config.paymentApiKeys.stripe;

  const { stripeToken } = req.body;
  const { reqKey } = req.body;
  const userId = req.user.id;
  let err;
  let bankPayment;
  let charge;
  let wallet;

  [err, bankPayment] = await to(
    BankPayment.findOne({
      where: { paymentToken: reqKey },
      include: [Token, Currency],
    }),
  );

  if (err || !bankPayment) {
    resError(res, 500, titles.PAYMENT_ERROR, errors.GET_PAYMENT_ERROR);
    return;
  }

  if (bankPayment.userId !== userId) {
    resError(res, 403, titles.PERMISSION, errors.NO_PERMISSION);
    return;
  }

  if (
    bankPayment.bankPaymentStatusId === 3 ||
    bankPayment.bankPaymentStatusId === 4
  ) {
    resError(res, 500, titles.PAYMENT_ERROR, errors.PAYMENT_ALREADY_PAID);
    return;
  }

  if (bankPayment.bankPaymentStatusId === 5) {
    resError(res, 500, titles.PAYMENT_ERROR, errors.PAYMENT_ALREADY_FAILED);
    return;
  }

  // Set status to pending, before requesting from bank
  bankPayment.bankPaymentStatusId = 2; // Pending
  [err, bankPayment] = await to(bankPayment.save());
  if (err) {
    resError(res, 500, titles.PAYMENT_ERROR, errors.DATABASE_ERROR);
    return;
  }

  const { tokenAmount } = bankPayment;
  const { currencyAmount } = bankPayment;
  const token = bankPayment.Token;
  const currency = bankPayment.Currency;
  const currencyDecimalsFactor = 10 ** currency.decimalPrecision;

  const description =
    `Buy ${tokenAmount} ${token.symbol}. ` +
    ` Total cost: ${currencyAmount} ${currency.abbreviation}s.`;

  // In Stripe, amounts are in currency's smallest unit (e.g. for usd: cents)
  const costInSmallestUnitOfCurrency = Math.round(
    currencyAmount * currencyDecimalsFactor,
  );

  const stripe = new Stripe(secretKey);

  [err, charge] = await to(
    stripe.charges.create({
      amount: costInSmallestUnitOfCurrency,
      currency: currency.abbreviation,
      description,
      source: stripeToken,
      capture: false,
    }),
  );

  if (err) {
    // let errMsg = `code: ${err.code}, message: ${err.message}, requestId: ${
    //   err.requestId
    // }, statusCode: ${err.statusCode}`;
    resError(res, 500, titles.PAYMENT_ERROR, err.message);
    return;
  }

  if (charge.status === 'failed') {
    bankPayment.bankPaymentStatusId = 5; // Failed
    bankPayment.bankRefId = charge.id;
    [err, bankPayment] = await to(bankPayment.save());
    if (err) {
      resError(res, 500, titles.PAYMENT_ERROR, errors.DATABASE_ERROR);
      return;
    }
    resError(res, 500, titles.PAYMENT_ERROR, errors.PAYMENT_FAILED);
    return;
  }

  if (charge.status === 'succeeded') {
    bankPayment.bankPaymentStatusId = 3; // Paid and waiting
    bankPayment.bankRefId = charge.id;
    [err, bankPayment] = await to(bankPayment.save());
    if (err) {
      resError(res, 500, titles.PAYMENT_ERROR, errors.DATABASE_ERROR);
      return;
    }

    [err, wallet] = await to(
      Wallet.findOne({ where: { tokenId: token.id, userId: req.user.id } }),
    );
    if (err || !wallet) {
      resError(res, 500, titles.PAYMENT_ERROR, errors.DATABASE_ERROR);
      return;
    }

    wallet.balance = Number(wallet.balance) + Number(tokenAmount);

    [err] = await to(wallet.save());
    if (err) {
      resError(res, 500, titles.PAYMENT_ERROR, errors.DATABASE_ERROR);
      return;
    }

    [err] = await to(
      Transaction.create({
        txHash: uuidv4(),
        tokenId: bankPayment.Token.id,
        destinationId: wallet.id,
        amount: tokenAmount,
        isBankPayment: true,
        statusId: 6, // completed
      }),
    );

    if (err) {
      resError(res, 500, titles.WITHDRAW_ERROR, errors.DATABASE_ERROR);
      return;
    }

    resSuccess(res, 200, titles.PAYMENT, successes.PAYMENT_SUCCESSFULL);
    return;
  }

  resError(res, 500, titles.PAYMENT_ERROR, errors.PAYMENT_UNKNOWN_ERROR);
};

export default submitPayment;
