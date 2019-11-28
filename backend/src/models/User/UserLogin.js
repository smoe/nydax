import DataType from 'sequelize';
import Model from '../../sequelize';

const UserLogin = Model.define('UserLogin', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  authToken: {
    type: DataType.STRING(100),
  },
});

export default UserLogin;
