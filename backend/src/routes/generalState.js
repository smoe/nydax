import to from 'await-to-js';
import express from 'express';
import {
  Country,
  Currency,
  Timezone,
  Token,
  Pair,
  PriceDay,
  TradeFee,
} from '../models';
import { errors, titles } from '../constants/messages';
import { resError, calculateChange24Percentage } from '../utils';

/* eslint-disable prefer-const */

const app = express();

const maxAge = 60;

app.get('/', async (req, res) => {
  let err;
  let currencies;
  let countries;
  let timezones;
  let tokens;
  let pairs;
  let prices;
  let tradeFee;

  [err, countries] = await to(Country.findAll());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.GET_COUNTRIES_INFO);
    return;
  }

  [err, currencies] = await to(Currency.findAll());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.GET_CURRENCIES_INFO);
    return;
  }

  [err, timezones] = await to(Timezone.findAll());
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.GET_TIMEZONES_INFO);
    return;
  }

  [err, tokens] = await to(
    Token.findAll({
      attributes: {
        exclude: ['contractAbi'],
      },
    }),
  );
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.GET_TOKEN_ERROR);
    return;
  }

  [err, pairs] = await to(Pair.findAll()); // eslint-disable-line
  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  // TODO: error handling
  const pairsWithChart = await Promise.all(
    pairs.map(async pair => {
      [err, prices] = await to(
        PriceDay.findAll({
          where: { pairId: pair.dataValues.id },
          limit: 7,
          order: [['createdAt', 'DESC']],
        }),
      );

      [err, tradeFee] = await to(
        TradeFee.findOne({
          where: { pairId: pair.dataValues.id },
        }),
      );

      return {
        ...pair.dataValues,
        makerFee: Number(tradeFee.makerFee),
        takerFee: Number(tradeFee.takerFee),
        chartPriceHistory:
          prices.length === 0
            ? [0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04]
            : prices.map(price => price.close),
      };
    }),
  );

  res.setHeader('Surrogate-Control', `max-age=${maxAge}`);
  res.status(200).json({
    countries,
    currencies,
    timezones,
    tokens,
    pairs: pairsWithChart.map(pair => ({
      ...pair,
      change24Percentage: calculateChange24Percentage(pair),
    })),
  });
});

export default app;
