import to from 'await-to-js';
import express from 'express';
import { Timezone } from '../models';
import { errors, titles } from '../constants/messages';
import { resError } from '../utils';

const app = express();

const maxAge = 3600;

app.get('/', async (req, res) => {
  const [err, timezones] = await to(Timezone.findAll());
  if (err) {
    resError(res, 500, titles.GET_INFO_ERROR, errors.GET_TIMEZONES_INFO);
    return;
  }

  res.setHeader('Surrogate-Control', `max-age=${maxAge}`);
  res.status(200).json(timezones);
});

export default app;
