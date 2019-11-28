import DataType from 'sequelize';
import Model from '../../sequelize';
import { initialize as initializeOrderStatus } from './../utils';

const OrderStatus = Model.define('OrderStatus', {
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
      name: 'Filled',
    },
    {
      id: 2,
      name: 'Pending',
    },
    {
      id: 3,
      name: 'Cancelled',
    },
    {
      id: 4,
      name: 'Rejected',
    },
    {
      id: 5,
      name: 'Suspended',
    },
    {
      id: 6,
      name: 'Expired',
    },
  ];
  initializeOrderStatus(OrderStatus, data);
};

export default OrderStatus;
