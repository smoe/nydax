import to from 'await-to-js';
import express from 'express';
import { resError } from '../utils';
import { Pair } from '../models';
import { errors, titles } from '../constants/messages';
import { validateName } from '../validation';
import sanitize from '../sanitization';

const app = express();

/**
 * @api {get} v1/ticker Get Price Ticker
 * @apiVersion 1.0.0
 * @apiName Price Ticker
 * @apiGroup Pair
 *
 * @apiDescription Get price ticker information for a single pair.
 *
 * @apiHeader {String} Content-Type  application/json
 * @apiHeader {String} Authorization  bearer ACCESS_TOKEN
 *
 * @apiParam {String} pairName  pair symbol with a format similar to 'ETH/BTC'.
 *
 * @apiSuccess {String} name  name of the symbol
 * @apiSuccess {Float} lastPrice  last trade price
 * @apiSuccess {Float} vol24  trade volume in the last 24 hours
 * @apiSuccess {Float} change24Price  price change in the last 24 hours
 * @apiSuccess {Float} high24  highest price in the last 24 hours
 * @apiSuccess {Float} low24  lowest price in the last 24 hours
 * @apiSuccess {Float} minTradeAmount  minimum possible trade amount
 * @apiSuccess {Integer} tradeAmountDecimals  trade amount decimals
 * @apiSuccess {Float} minTickSize  minimum ticker size
 * @apiSuccess {Integer} priceDecimals  price decimals
 * @apiSuccess {Float} minOrderValue  minimum order value (i.e. price * amount)
 *
 * @apiParamExample {json} Sample Request Params
 *   {
 *     "pairName": ETH/BTC
 *   }
 *
 * @apiSuccessExample {json} Sample Success Response
 *   HTTP/1.1 200 Success
 *   {
 *     "name":"ETH/BTC",
 *     "lastPrice":"0.034000",
 *     "vol24":"346330.000000",
 *     "change24Price":"-0.001000",
 *     "high24":"0.000000",
 *     "low24":"0.000000",
 *     "minTradeAmount":0.001,
 *     "tradeAmountDecimals":3,
 *     "minTickSize":0.000001,
 *     "priceDecimals":6,
 *     "minOrderValue":0.001
 *   }
 *
 * @apiErrorExample Error Response
 *   HTTP/1.1 500 Invalid Pair Name
 *   {
 *     "error":{
 *       "title":"Pair information error",
 *       "description":"Database error"
 *     }
 *   }
 */
app.get('/', async (req, res) => {
  const { pairName } = req.query;

  // Input validation
  if (!pairName) {
    resError(
      res,
      500,
      titles.ORDER_BOOK_ERROR,
      errors.PAIR_NAME_IS_NOT_PROVIDED,
    );
    return;
  }

  const tokenValidationError = validateName(pairName);
  if (tokenValidationError.length > 0) {
    resError(res, 500, titles.PRICE_INFO_ERROR, tokenValidationError);
    return;
  }

  // Input sanitization
  const sanitizedPairName = sanitize(pairName);
  const sanitizedPairNameUpperCase = sanitizedPairName.toUpperCase();

  const [err, pair] = await to(
    Pair.findOne({
      where: { name: sanitizedPairNameUpperCase },
    }),
  );

  if (err || pair == null) {
    resError(res, 500, titles.PAIR_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  const result = {
    name: pair.name,
    lastPrice: pair.lastPrice,
    vol24: pair.vol24,
    change24Price: pair.change24Price,
    high24: pair.high24,
    low24: pair.low24,
    minTradeAmount: pair.minTradeAmount,
    tradeAmountDecimals: pair.tradeAmountDecimals,
    minTickSize: pair.minTickSize,
    priceDecimals: pair.priceDecimals,
    minOrderValue: pair.minOrderValue,
  };

  res.status(200).json(result);
});

export default app;
