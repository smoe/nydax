import to from 'await-to-js';
import express from 'express';
import { Currency } from '../models';
import { errors, titles } from '../constants/messages';
import { resError } from '../utils';

const app = express();

const maxAge = 60;

app.get('/', async (req, res) => {
  const [err, currencies] = await to(Currency.findAll());
  if (err) {
    resError(res, 500, titles.GET_INFO_ERROR, errors.GET_CURRENCIES_INFO);
    return;
  }

  res.setHeader('Surrogate-Control', `max-age=${maxAge}`);
  res.status(200).json(currencies);
});

export default app;
