import DataType from 'sequelize';
import Model from '../../sequelize';

const UserAccountActivity = Model.define('UserAccountActivity', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  time: {
    type: DataType.STRING(100),
  },
  browser: {
    type: DataType.STRING(100),
  },
  ip: {
    type: DataType.STRING(100),
  },
  location: {
    type: DataType.STRING(100),
  },
  action: {
    type: DataType.STRING(100),
  },
});

export default UserAccountActivity;
