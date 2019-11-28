import DataType from 'sequelize';
import Model from '../../sequelize';
import { initialize as initializeUserVerificationStatus } from './../utils';

const UserVerificationStatus = Model.define('UserVerificationStatus', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataType.STRING(45),
    allowNull: false,
  },
});

export const initialize = async () => {
  const data = [
    {
      id: 1,
      name: 'Not Submitted',
    },
    {
      id: 2,
      name: 'Submitted',
    },
    {
      id: 3,
      name: 'Waiting for Modification',
    },
    {
      id: 4,
      name: 'Verified',
    },
    {
      id: 5,
      name: 'Rejected',
    },
  ];
  initializeUserVerificationStatus(UserVerificationStatus, data);
};

export default UserVerificationStatus;
