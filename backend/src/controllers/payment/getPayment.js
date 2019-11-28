import to from 'await-to-js';
import { Token, Currency } from '../../models';
import BankPayment from '../../models/Bank/BankPayment';
import { resError } from '../../utils';
import { errors, titles } from '../../constants/messages';

/* eslint-disable prefer-const */

const getPayment = async (req, res) => {
  const { reqKey } = req.query;
  const userId = req.user.id;
  let err;
  let bankPayment;

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

  const result = {
    tokenAmount: bankPayment.tokenAmount,
    currencyAmount: bankPayment.currencyAmount,
    tokenPriceInUsd: bankPayment.Token.usdPrice,
    tokenPriceInCurrency:
      bankPayment.Token.usdPrice / bankPayment.Currency.usdRatio,
    tokenSymbol: bankPayment.Token.symbol,
    currencyAbbr: bankPayment.Currency.abbreviation,
  };

  res.status(200).json(result);
};

export default getPayment;
