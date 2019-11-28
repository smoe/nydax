import to from 'await-to-js';
import { Order, OrderSide, Pair } from '../../models';
import { errors, titles } from '../../constants/messages';
import { validateName } from '../../validation';
import sanitize from '../../sanitization';
import { resError } from '../../utils';

/* eslint-disable prefer-const */

const maxAge = 10;

const getOrderBook = async (req, res) => {
  let err;
  let buyOrders;
  let sellOrders;

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

  // input sanitization
  const sanitizedPairName = sanitize(pairName);

  [err, buyOrders] = await to(
    Order.findAll({
      where: { sideId: 1, statusId: 2 },
      limit: 25,
      order: [['price', 'ASC']],
      include: [
        { model: OrderSide, attributes: [] },
        { model: Pair, where: { name: sanitizedPairName }, attributes: [] },
      ],
    }),
  );

  if (err) {
    resError(res, 500, titles.ORDER_BOOK_ERROR, errors.DATABASE_ERROR);
    return;
  }

  [err, sellOrders] = await to(
    Order.findAll({
      where: { sideId: 2, statusId: 2 },
      limit: 25,
      order: [['price', 'ASC']],
      include: [
        { model: OrderSide, attributes: [] },
        { model: Pair, where: { name: sanitizedPairName }, attributes: [] },
      ],
    }),
  );

  if (err) {
    resError(res, 500, titles.ORDER_BOOK_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.setHeader('Surrogate-Control', `max-age=${maxAge}`);
  res.status(200).json([...sellOrders, ...buyOrders]);
};

export default getOrderBook;
