import DataType from 'sequelize';
import Model from '../../sequelize';
// import { initializeDB } from '../../config';
// import { initialize } from '../utils';

const PriceTick = Model.define(
  'PriceTick',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: DataType.DECIMAL(21, 9),
      allowNull: false,
      defaultValue: 0,
    },
    volume: {
      type: DataType.DECIMAL(21, 9),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    updatedAt: false,
  },
);

// if (initializeDB) {
//   const data = [
//     {
//       id: 1,
//       price: 102,
//       volume: 1000,
//     },
//   ];
//   initialize(PriceTick, data);
// }

export default PriceTick;
