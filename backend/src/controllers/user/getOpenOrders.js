import to from 'await-to-js';
import { Order } from '../../models';
import { errors, titles } from '../../constants/messages';
import { resError } from '../../utils';

const getOpenOrders = async (req, res) => {
  const [err, orders] = await to(
    Order.findAll({
      where: {
        userId: req.user.id,
      },
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json(orders);
};

export default getOpenOrders;
