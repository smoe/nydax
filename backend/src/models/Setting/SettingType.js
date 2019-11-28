import DataType from 'sequelize';
import Model from '../../sequelize';
import { initialize as initializeSettingType } from '../utils';

const SettingType = Model.define('SettingType', {
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
      name: 'string',
    },
    {
      id: 2,
      name: 'int',
    },
    {
      id: 3,
      name: 'float',
    },
    {
      id: 4,
      name: 'double',
    },
    {
      id: 5,
      name: 'boolean',
    },
  ];
  initializeSettingType(SettingType, data);
};

export default SettingType;
