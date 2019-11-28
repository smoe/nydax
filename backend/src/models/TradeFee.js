import DataType from 'sequelize';
import to from 'await-to-js';
import Model from '../sequelize';

const TradeFee = Model.define('TradeFee', {
  id: {
    type: DataType.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  makerFee: {
    type: DataType.DECIMAL(4, 4),
    allowNull: false,
  },
  takerFee: {
    type: DataType.DECIMAL(4, 4),
    allowNull: false,
  },
  minVolume: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  maxVolume: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  // pairId: {
  //   type: DataType.INTEGER(11),
  //   references: {
  //     model: 'Pair',
  //     key: 'id',
  //   },
  // },
});

export const initialize = async () => {
  const data = [
    {
      id: 1,
      pairId: 1,
      makerFee: 0.002,
      takerFee: 0.002,
    },
    {
      id: 2,
      pairId: 2,
      makerFee: 0.002,
      takerFee: 0.002,
    },
    {
      id: 3,
      pairId: 3,
      makerFee: 0.002,
      takerFee: 0.002,
    },
  ];
  const [err] = await to(
    TradeFee.bulkCreate(data, {
      fields: Object.keys(data[0]),
      updateOnDuplicate: 'id',
    }),
  );

  if (err) {
    console.warn(`problem with adding initial TradeFee to Wallet table: `, err);
  } else {
    console.warn(`initial rows added to TradeFee table successfully.`);
  }
};

export default TradeFee;
