import to from 'await-to-js';
import { Pair } from '../../models';
import rabbitmq from '../../rabbitmq';
import { resError, resSuccess } from '../../utils';
import { validateOrder } from '../../validation';
import sanitize from '../../sanitization';
import { errors, successes, titles } from '../../constants/messages';

const addOrder = async (req, res) => {
  let err;
  let orderPair;
  // Input sanitization
  const sanitizedOrder = sanitize(req.body.order);

  let order;
  try {
    order = JSON.parse(sanitizedOrder);
  } catch (error) {
    order = {};
  }
  // Input validation
  [err, orderPair] = await to(Pair.findOne({ where: { id: order.pairId } })); // eslint-disable-line

  if (err) {
    resError(res, 500, titles.ORDER_ERROR, errors.DATABASE_ERROR);
    return;
  }

  const validationError = validateOrder(order, orderPair);
  if (validationError.length > 0) {
    resError(res, 500, titles.ORDER_ERROR, validationError);
    return;
  }

  order.userId = req.user.id;
  rabbitmq.produce(
    'order',
    JSON.stringify({
      action: 'add',
      payload: {
        pairId: Number(order.pairId),
        userId: req.user.id,
        price: Number(order.typeId) === 1 ? 0 : Number(order.price), // put 0 for market orders
        amount: Number(order.amount),
        sideId: Number(order.sideId),
        typeId: Number(order.typeId),
        fillTypeId: 1,
      },
    }),
    error => {
      if (error) {
        resError(res, 500, titles.ORDER_ERROR, errors.ORDER_ADD_PROBLEM);
      } else {
        resSuccess(
          res,
          200,
          titles.ORDER_SENT,
          successes.REGISTER_ORDER_SENT_SUCCESSFULLY,
        );
      }
    },
  );

  // TODO:error handling
};

export default addOrder;
