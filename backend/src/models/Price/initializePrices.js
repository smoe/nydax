import to from 'await-to-js';
import sequelize from 'sequelize';
import { PriceTick, PriceMinute, PriceDay } from '..';

/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */

const initializePriceTable = async interval => {
  const [err, prices] = await to(
    PriceTick.findAll({
      attributes: [
        [sequelize.fn('MAX', sequelize.col('price')), 'high'],
        [sequelize.fn('MIN', sequelize.col('price')), 'low'],
        [sequelize.fn('SUM', sequelize.col('volume')), 'volume'],
        [sequelize.fn('MIN', sequelize.col('id')), 'openId'],
        [sequelize.fn('MAX', sequelize.col('id')), 'closeId'],
        [sequelize.fn('MAX', sequelize.col('createdAt')), 'createdAt'],
        'pairId',
      ],
      group: [
        sequelize.literal(
          `DATE_FORMAT(createdAt, ${
            interval === 'PriceMinute' ? `'%Y-%m-%d %H:%i'` : `'%Y-%m-%d'`
          })`,
        ),
        'pairId',
      ],
    }),
  );

  if (err) {
    return;
  }

  const pricesAll = [];
  for (let i = 0; i < prices.length; i += 1) {
    const price = prices[i].dataValues;
    let error;
    let open;
    let close;

    [error, open] = await to(
      PriceTick.findOne({ where: { id: price.openId } }),
    );
    [error, close] = await to(
      PriceTick.findOne({ where: { id: price.closeId } }),
    );

    if (error) {
      return;
    }

    pricesAll.push({
      high: price.high,
      low: price.low,
      volume: price.volume,
      open: open.price,
      close: close.price,
      createdAt: price.createdAt,
      pairId: price.pairId,
    });
  }

  if (interval === 'PriceMinute') {
    PriceMinute.bulkCreate(pricesAll, {
      fields: Object.keys(pricesAll[0]),
    });
  } else if (interval === 'PriceDay') {
    PriceDay.bulkCreate(pricesAll, {
      fields: Object.keys(pricesAll[0]),
    });
  }
};

const initialize = async () => {
  await initializePriceTable('PriceMinute');
  await initializePriceTable('PriceDay');
};

export default initialize;
