import DataType from 'sequelize';
import Model from '../../sequelize';
import { initialize as initializeOrderFillType } from '../utils';

const OrderFillType = Model.define('OrderFillType', {
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
      name: 'normal',
    },
    {
      id: 2,
      name: 'ioc',
    },
    {
      id: 3,
      name: 'aon',
    },
  ];
  initializeOrderFillType(OrderFillType, data);
};

export default OrderFillType;
