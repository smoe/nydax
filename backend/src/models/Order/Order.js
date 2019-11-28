import DataType from 'sequelize';
// import schedule from 'node-schedule';
// import rabbitmq from '../../rabbitmq';
import Model from '../../sequelize';
// import OrderType from './OrderType';
// import OrderStatus from './OrderStatus';
// import OrderSide from './OrderSide';
// import User from '../User/User';
// import Pair from '../Pair';
// import { initializeDB } from '../../config'; // alterDB

const Order = Model.define('Order', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
  },
  amount: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
  },
  filledAmount: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
  },
  // stopLoss: {
  // 	type: DataType.DECIMAL,
  // 	allowNull: true
  // },
  // takeProfit: {
  // 	type: DataType.DECIMAL,
  // 	allowNull: true
  // },
});

export default Order;
