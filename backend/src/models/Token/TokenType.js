import DataType from 'sequelize';
import Model from '../../sequelize';
import { initialize as initializeTokenType } from '../utils';

const TokenType = Model.define('TokenType', {
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
      name: 'BTC',
    },
    {
      id: 2,
      name: 'ERC-20',
    },
    {
      id: 3,
      name: 'OTHER',
    },
  ];
  initializeTokenType(TokenType, data);
};

export default TokenType;
