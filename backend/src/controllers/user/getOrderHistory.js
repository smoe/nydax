import to from 'await-to-js';
import { Op } from 'sequelize';
import { Order } from '../../models';
import { errors, titles } from '../../constants/messages';
import { resError } from '../../utils';

const getOrderHistory = async (req, res) => {
  const [err, orders] = await to(
    Order.findAll({
      where: {
        userId: req.user.id,
        statusId: { [Op.ne]: 2 },
      },
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json(orders);
};

export default getOrderHistory;
