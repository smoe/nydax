import DataType from 'sequelize';
import to from 'await-to-js';
import moment from 'moment-timezone';
import Model from '../sequelize';
// import { initialize as initializeUser } from '../utils';

const FailedLoginAttempt = Model.define('FailedLoginAttempt', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

export default FailedLoginAttempt;
