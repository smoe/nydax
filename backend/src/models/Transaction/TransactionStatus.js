import DataType from 'sequelize';
import Model from '../../sequelize';
import { initialize as initializeTransactionStatus } from '../utils';

const TransactionStatus = Model.define('TransactionStatus', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataType.STRING(45),
    allowNull: true,
  },
});

export const initialize = () => {
  const data = [
    {
      id: 1,
      name: 'Waiting',
    },
    {
      id: 2,
      name: 'Cancelled',
    },
    {
      id: 3,
      name: 'Pending',
    },
    {
      id: 4,
      name: 'Rejection',
    },
    {
      id: 5,
      name: 'BlockchainRejection',
    },
    {
      id: 6,
      name: 'Completed',
    },
  ];
  initializeTransactionStatus(TransactionStatus, data);
};

export default TransactionStatus;
