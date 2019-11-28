import DataType from 'sequelize';
import Model from '../../sequelize';
import { initialize as initializeBankService } from '../utils';

const BankService = Model.define('BankService', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataType.STRING(100),
    allowNull: false,
  },
});

export const initialize = () => {
  const data = [
    {
      id: 1,
      name: 'Stripe',
    },
    {
      id: 2,
      name: 'Poli',
    },
  ];
  initializeBankService(BankService, data);
};

export default BankService;
