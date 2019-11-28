import to from 'await-to-js';
import express from 'express';
import { resError, calculateChange24Percentage } from '../utils';
import { Pair, PriceDay, TradeFee } from '../models';
import { errors, titles } from '../constants/messages';

const app = express();

const maxAge = 3600;

app.get('/', async (req, res) => {
  // FIXME: chartPriceHistory here!
  let err;
  let pairs;
  let prices;
  let tradeFee;

  [err, pairs] = await to( // eslint-disable-line
    Pair.findAll(),
  );

  if (err) {
    resError(res, 500, titles.PAIR_INFO_ERROR, errors.DATABASE_ERROR);
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
  res.status(200).json(
    pairsWithChart.map(pair => ({
      ...pair,
      change24Percentage: calculateChange24Percentage(pair),
    })),
  );
});

export default app;
