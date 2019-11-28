import DataType from 'sequelize';
import Model from '../../sequelize';
// import { initializeDB } from '../../config';
// import { initialize } from '../utils';

const PriceMinute = Model.define('PriceMinute', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  open: {
    type: DataType.DECIMAL(15, 6),
    allowNull: false,
    defaultValue: 0,
  },
  high: {
    type: DataType.DECIMAL(15, 6),
    allowNull: false,
    defaultValue: 0,
  },
  low: {
    type: DataType.DECIMAL(15, 6),
    allowNull: false,
    defaultValue: 0,
  },
  close: {
    type: DataType.DECIMAL(15, 6),
    allowNull: false,
    defaultValue: 0,
  },
  volume: {
    type: DataType.DECIMAL(15, 6),
    allowNull: false,
    defaultValue: 0,
  },
});

// if (initializeDB) {
//   const data = [
//     {
//       id: 1,
//       open: 100,
//       high: 101,
//       low: 99,
//       close: 100,
//       volume: 1000,
//     },
//   ];
//   initialize(PriceMinute, data);
// }

export default PriceMinute;
