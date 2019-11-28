import DataType from 'sequelize';
import Model from '../../sequelize';
import { initialize as initializeOrderSide } from '../utils';

const OrderSide = Model.define('OrderSide', {
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
      name: 'buy',
    },
    {
      id: 2,
      name: 'sell',
    },
  ];
  initializeOrderSide(OrderSide, data);
};

export default OrderSide;
