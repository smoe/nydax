import DataType from 'sequelize';
import Model from '../../sequelize';
import { initialize as initializeOrderType } from '../utils';

const OrderType = Model.define('OrderType', {
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
      name: 'market',
    },
    {
      id: 2,
      name: 'limit',
    },
  ];
  initializeOrderType(OrderType, data);
};

export default OrderType;
