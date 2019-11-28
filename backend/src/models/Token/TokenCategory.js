import DataType from 'sequelize';
import Model from '../../sequelize';
import { initialize as initializeTokenCategory } from '../utils';

const TokenCategory = Model.define('TokenCategory', {
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
});

export const initialize = () => {
  const data = [
    {
      id: 1,
      name: 'Currency',
    },
    {
      id: 2,
      name: 'Utility',
    },
    {
      id: 3,
      name: 'Equity',
    },
    {
      id: 4,
      name: 'Asset',
    },
    {
      id: 5,
      name: 'Dividend',
    },
  ];
  initializeTokenCategory(TokenCategory, data);
};

export default TokenCategory;
