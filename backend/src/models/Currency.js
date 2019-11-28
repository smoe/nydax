import DataType from 'sequelize';
import Model from '../sequelize';
import currencies from '../constants/currencies';
import { initialize as initializeCurrency } from './utils';

const Currency = Model.define(
  'Currency',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING(50),
      allowNull: true,
    },
    abbreviation: {
      type: DataType.STRING(4),
      allowNull: true,
    },
    usdRatio: {
      type: DataType.DECIMAL(15, 6),
      allowNull: false,
      defaultValue: 1,
    },
    symbol: {
      type: DataType.STRING(5),
      allowNull: true,
    },
    symbolNative: {
      type: DataType.STRING(5),
      allowNull: true,
    },
    decimalPrecision: {
      type: DataType.INTEGER(11),
      allowNull: false,
    },
  },
  {
    charset: 'utf8mb4',
    createdAt: false,
    updatedAt: false,
  },
);

export const initialize = () => {
  const data = Object.keys(currencies).map((abbreviation, i) => ({
    id: i + 1,
    name: currencies[abbreviation].name,
    abbreviation,
    symbol: currencies[abbreviation].symbol,
    symbolNative: currencies[abbreviation].symbol_native,
    decimalPrecision: currencies[abbreviation].decimal_digits,
    usdRatio: currencies[abbreviation].usd_ratio,
  }));
  initializeCurrency(Currency, data);
};

export default Currency;
