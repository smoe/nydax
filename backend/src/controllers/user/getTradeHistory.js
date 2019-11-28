import to from 'await-to-js';
import { Trade, Order, Pair } from '../../models';
import { errors, titles } from '../../constants/messages';
import { resError } from '../../utils';
/* eslint-disable prefer-const */

const getTradeHistory = async (req, res) => {
  let err;
  let sellTrades;
  let buyTrades;

  [err, sellTrades] = await to(
    Trade.findAll({
      include: [
        {
          model: Order,
          as: 'sellOrder',
          where: { userId: req.user.id, sideId: 2, statusId: 1 },
        },
        { model: Pair },
      ],
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  [err, buyTrades] = await to(
    Trade.findAll({
      include: [
        {
          model: Order,
          as: 'buyOrder',
          where: { userId: req.user.id, sideId: 1, statusId: 1 },
        },
        { model: Pair },
      ],
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json([
    ...sellTrades.map(trade => ({
      ...trade,
      pair: trade.Pair.name,
      side: 'Sell',
      type: trade.sellOrder.typeId === 1 ? 'Market' : 'Limit',
      total: trade.price * trade.amount,
      timestamp: trade.createdAt,
      fee: 0,
      // fee: (trade.price * trade.amount * 16) / 1000,
    })),
    ...buyTrades.map(trade => ({
      ...trade,
      pair: trade.Pair.name,
      side: 'Buy',
      type: trade.buyOrder.typeId === 1 ? 'Market' : 'Limit',
      total: trade.price * trade.amount,
      timestamp: trade.createdAt,
      fee: 0,
      // fee: (trade.price * trade.amount * 16) / 1000,
    })),
  ]);
};

export default getTradeHistory;
