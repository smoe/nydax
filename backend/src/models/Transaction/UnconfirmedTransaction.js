import DataType from 'sequelize';
import Model from '../../sequelize';
// import { initializeDB } from '../../config';
// import { initialize } from '../utils';

const UnconfirmedTransaction = Model.define('UnconfirmedTransaction', {
  txHash: {
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  },
  // walletId: {
  //   type: DataType.INTEGER(11),
  //   allowNull: true,
  // },
  // typeId: {
  //   type: DataType.INTEGER(11),
  //   allowNull: true,
  // },
  amount: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
  },
  sourceId: {
    type: DataType.INTEGER(11),
    allowNull: true,
  },
  destinationId: {
    type: DataType.INTEGER(11),
    allowNull: true,
  },
  // from: {
  //   type: DataType.STRING,
  //   allowNull: true,
  // },
  // to: {
  //   type: DataType.STRING,
  //   allowNull: true,
  // },
  blockNumber: {
    type: DataType.NUMERIC, // TODO: use a better datatype
    allowNull: true,
  },
  blockHash: {
    type: DataType.STRING,
    allowNull: true,
  },
  confirmations: {
    type: DataType.NUMERIC, // TODO: use a better datatype
    defaultValue: 0,
  },
  usdPriceAtTransactionTime: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
    defaultValue: 0,
  },
  // userId: {
  //   type: DataType.INTEGER(11),
  //   allowNull: true,
  // },
  // statusId: {
  //   type: DataType.INTEGER(11),
  //   allowNull: true,
  // },
});

// if (initializeDB) {
//   const data = [
//     {
//       id: 1,
//       amount: 100,
//       price: 200,
//     },
//   ];
//   initialize(UnconfirmedTransaction, data);
// }

export default UnconfirmedTransaction;
