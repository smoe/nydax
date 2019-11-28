import to from 'await-to-js';
import express from 'express';
import { Token } from '../models';
import { errors, titles } from '../constants/messages';
import { resError } from '../utils';

const app = express();

const maxAge = 3600;

app.get('/', async (req, res) => {
  const [err, tokens] = await to(
    Token.findAll({
      attributes: {
        exclude: ['contractAbi'],
      },
    }),
  );
  if (err) {
    resError(res, 500, titles.GET_INFO_ERROR, errors.GET_TOKEN_ERROR);
    return;
  }

  res.setHeader('Surrogate-Control', `max-age=${maxAge}`);
  res.status(200).json(tokens);
});

export default app;
