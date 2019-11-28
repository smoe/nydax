import rabbitmq from '../../rabbitmq';
import { resError, resSuccess } from '../../utils';
import { validateId } from '../../validation';
import sanitize from '../../sanitization';
import { errors, successes, titles } from '../../constants/messages';

const cancelOrder = (req, res) => {
  // Input validation
  const { orderId } = req.body;

  const orderValidationError = validateId(orderId);
  if (orderValidationError.length > 0) {
    resError(res, 500, titles.ORDER_ERROR, orderValidationError);
    return;
  }

  // input sanitization
  const orderIdSanitized = sanitize(orderId);

  rabbitmq.produce(
    'order',
    JSON.stringify({
      action: 'cancel',
      payload: { id: Number(orderIdSanitized) },
    }),
    error => {
      if (error) {
        resError(res, 500, titles.ORDER_ERROR, errors.ORDER_CANCEL_PROBLEM);
      } else {
        resSuccess(
          res,
          200,
          titles.CANCEL_ORDER,
          successes.CANCEL_ORDER_DONE_SUCCESSFULLY,
        );
      }
    },
  );
};

export default cancelOrder;
