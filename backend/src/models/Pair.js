import DataType from 'sequelize';
import to from 'await-to-js';
import Model from '../sequelize';
import Token from './Token/Token';

const Pair = Model.define('Pair', {
  id: {
    type: DataType.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataType.STRING(45),
    allowNull: true,
  },
  lastPrice: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
    defaultValue: 0,
  },
  change24Price: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
    defaultValue: 0,
  },
  // change24Percentage: {
  //   type: DataType.DECIMAL(15, 6),
  //   allowNull: true,
  //   defaultValue: 0,
  // },
  high24: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
    defaultValue: 0,
  },
  low24: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
    defaultValue: 0,
  },
  vol24: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
    defaultValue: 0,
  },
  minTradeAmount: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
  },
  tradeAmountDecimals: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
  },
  minTickSize: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
  },
  priceDecimals: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  minOrderValue: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
  },
  // OldPriceUpdateAT: {
  // 	type: DataType.DATE,
  // 	allowNull: true
  // }
});

export const initialize = async () => {
  const data = [
    {
      id: 1,
      baseTokenId: 1,
      quoteTokenId: 2,
      name: 'ETH/BTC',
      lastPrice: 0.031,
      minTradeAmount: 0.001,
      minOrderValue: 0.001,
      minTickSize: 0.000001,
      tradeAmountDecimals: 6,
      priceDecimals: 8,
    },
    {
      id: 2,
      baseTokenId: 3,
      quoteTokenId: 2,
      name: 'INVO/BTC',
      lastPrice: 0.0000091,
      minTradeAmount: 0.000001,
      minOrderValue: 0.0001,
      minTickSize: 0.00000001,
      tradeAmountDecimals: 2,
      priceDecimals: 8,
    },
    {
      id: 3,
      baseTokenId: 4,
      quoteTokenId: 2,
      name: 'TRZ/BTC',
      lastPrice: 0.0000574,
      minTradeAmount: 0.000001,
      minOrderValue: 0.0001,
      minTickSize: 0.00000001,
      tradeAmountDecimals: 2,
      priceDecimals: 8,
    },
  ];
  const [err] = await to(
    Pair.bulkCreate(data, {
      fields: Object.keys(data[0]),
      updateOnDuplicate: 'id',
      include: [Token],
    }),
  );

  if (err) {
    console.warn(`problem with adding initial Pair to Wallet table: `, err);
  } else {
    console.warn(`initial rows added to Pair table successfully.`);
  }
};

export default Pair;
