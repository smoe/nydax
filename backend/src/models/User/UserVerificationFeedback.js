import DataType from 'sequelize';
import Model from '../../sequelize';

const UserVerificationFeedback = Model.define('UserVerificationFeedback', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataType.STRING(1000),
    allowNull: false,
  },
});

export default UserVerificationFeedback;
