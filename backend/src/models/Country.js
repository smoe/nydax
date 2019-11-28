import DataType from 'sequelize';
import Model from '../sequelize';
import countries from '../constants/countries';
import { initialize as initializeCountry } from './utils';

const Country = Model.define(
  'Country',
  {
    id: {
      type: DataType.INTEGER(3),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING(100),
      allowNull: true,
    },
    phoneCode: {
      type: DataType.STRING(10),
      allowNull: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

export const initialize = () => {
  const data = countries.map((country, i) => ({ id: i + 1, ...country }));
  initializeCountry(Country, data);
};

export default Country;
