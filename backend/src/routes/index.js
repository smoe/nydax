import express from 'express';
import userState from './userState';
import generalState from './generalState';
import authentication from './authentication';
import country from './country';
import timezone from './timezone';
import currency from './currency';
import token from './token';
import pair from './pair';
import wallet from './wallet';
import trade from './trade';
import transaction from './transaction';
import favouritePairs from './favouritePairs';
import favouriteCharts from './favouriteCharts';
import price from './price';
import order from './order';
import payment from './payment';
import user from './user';
import ticker from './ticker';

import { jwtVerify, jwtErrorHandle } from '../middleware';
import getOrderBook from '../controllers/order/getOrderBook';

// TODO: make all status codes correct

const app = express();

app.use('/userState', jwtVerify(false), jwtErrorHandle, userState);
app.use('/generalState', jwtVerify(false), jwtErrorHandle, generalState);

app.use('/orderbook', jwtVerify(false), jwtErrorHandle, getOrderBook);

app.use('/auth', jwtVerify(false), jwtErrorHandle, authentication); // TODO: change auth to user

app.use('/country', jwtVerify(false), jwtErrorHandle, country);
app.use('/timezone', jwtVerify(false), jwtErrorHandle, timezone);
app.use('/currency', jwtVerify(false), jwtErrorHandle, currency);

app.use('/token', jwtVerify(false), jwtErrorHandle, token);
app.use('/pair', jwtVerify(false), jwtErrorHandle, pair);
app.use('/ticker', jwtVerify(false), jwtErrorHandle, ticker);

app.use('/price', jwtVerify(false), jwtErrorHandle, price);

app.use('/wallet', jwtVerify(true), jwtErrorHandle, wallet);
app.use('/trade', jwtVerify(true), jwtErrorHandle, trade);
app.use('/favouritePairs', jwtVerify(true), jwtErrorHandle, favouritePairs);
app.use('/favouriteCharts', jwtVerify(true), jwtErrorHandle, favouriteCharts);
app.use('/order', jwtVerify(true), jwtErrorHandle, order);
app.use('/payment', jwtVerify(true), jwtErrorHandle, payment);
app.use('/user', jwtVerify(true), jwtErrorHandle, user);
app.use('/transaction', jwtVerify(true), jwtErrorHandle, transaction);
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log("token invalid!");
  } else {
    next();
  }
});
export default app;
