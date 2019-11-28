import DataType from 'sequelize';
import Model from '../../sequelize';
// import { initializeDB } from '../../config';
// import { initialize } from '../utils';

const Transaction = Model.define('Transaction', {
  txHash: {
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  },
  // typeId: {
  //   type: DataType.INTEGER(11),
  //   allowNull: true,
  // },
  amount: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
  },
  isBankPayment: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  // sourceId: {
  //   type: DataType.INTEGER(11),
  //   allowNull: true,
  // },
  // destinationId: {
  //   type: DataType.INTEGER(11),
  //   allowNull: true,
  // },
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
//   initialize(Transaction, data);
// }

export default Transaction;
