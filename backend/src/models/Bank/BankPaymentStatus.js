import DataType from 'sequelize';
import Model from '../../sequelize';
import { initialize as initializeBankPaymentStatus } from '../utils';

const BankPaymentStatus = Model.define('BankPaymentStatus', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataType.STRING(70),
    allowNull: false,
  },
});

export const initialize = () => {
  const data = [
    {
      id: 1,
      name: 'Request submitted',
    },
    {
      id: 2,
      name: 'Payment pending',
    },
    {
      id: 3,
      name: 'Payment successfull and waiting to be processed',
    },
    {
      id: 4,
      name: 'Payment successfull and processed',
    },
    {
      id: 5,
      name: 'Payment failed',
    },
  ];
  initializeBankPaymentStatus(BankPaymentStatus, data);
};

export default BankPaymentStatus;
