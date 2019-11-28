import DataType from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const UserAuthStatus = Model.define('UserAuthStatus', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  twoFactorAuthEnabled: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  twoFactorAuthSecret: {
    type: DataType.STRING(4000),
    allowNull: true,
  },
  smsVerificationToken: {
    type: DataType.STRING,
  },
  smsEnabled: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  phoneNumber: {
    type: DataType.STRING(50),
  },
});

export const initialize = async () => {
  const data = [];
  const initialUsersId = [1, 2, 3, 501, 502];
  for (let i = 0; i < initialUsersId.length; i += 1) {
    data.push({
      id: i + 1,
      twoFactorAuthEnabled: false,
      smsEnabled: false,
      userId: initialUsersId[i],
    });
  }

  const [err] = await to(
    UserAuthStatus.bulkCreate(data, {
      // fields: Object.keys(data[0]),
      updateOnDuplicate: 'id',
    }),
  );

  if (err) {
    console.warn(
      `problem with adding initial data to UserAuthStatus table: `,
      err,
    );
  } else {
    console.warn(`initial rows added to UserAuthStatus table successfully.`);
  }
};

export default UserAuthStatus;
