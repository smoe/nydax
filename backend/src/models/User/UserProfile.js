import DataType from 'sequelize';
import crypto from 'crypto';
import to from 'await-to-js';
import Model from '../../sequelize';
import { Currency, User, Timezone } from '..';

const UserProfile = Model.define(
  'UserProfile',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataType.STRING(100),
      allowNull: true,
    },
    lastName: {
      type: DataType.STRING(100),
      allowNull: true,
    },
    legalFirstName: {
      type: DataType.STRING(100),
      allowNull: true,
    },
    legalLastName: {
      type: DataType.STRING(100),
      allowNull: true,
    },
    legalMiddleName: {
      type: DataType.STRING(100),
      allowNull: true,
    },
    passportPic: {
      type: DataType.STRING(255),
      allowNull: true,
    },
    driverLicenseFrontPic: {
      type: DataType.STRING(255),
      allowNull: true,
    },
    driverLicenseBackPic: {
      type: DataType.STRING(255),
      allowNull: true,
    },
    identityCardFrontPic: {
      type: DataType.STRING(255),
      allowNull: true,
    },
    identityCardBackPic: {
      type: DataType.STRING(255),
      allowNull: true,
    },
    facePic: {
      type: DataType.STRING(255),
      allowNull: true,
    },
    referralToken: {
      type: DataType.STRING(32),
      allowNull: false,
      defaultValue() {
        return crypto.randomBytes(16).toString('hex');
      },
    },
    kycToken: {
      type: DataType.STRING(6),
      allowNull: false,
      defaultValue() {
        return crypto.randomBytes(3).toString('hex');
      },
    },
    verificationStatusId: {
      type: DataType.INTEGER(11),
      allowNull: true,
      defaultValue: 1,
    },
    verificationStatusModified: {
      type: DataType.BOOLEAN,
      defaultValue: 0,
    },
    // timezoneId: {
    //   type: DataType.INTEGER(11),
    // },
    // baseCurrencyId: {
    //   type: DataType.INTEGER(11),
    // },
    picture: {
      type: DataType.STRING(255),
      allowNull: true,
    },
    phoneNumber: {
      type: DataType.STRING(50),
    },
  },
  {
    charset: 'utf8mb4',
  },
);

export const initialize = async () => {
  const initialUsersId = [1, 2, 3, 501, 502];
  const data = [];
  for (let i = 0; i < initialUsersId.length; i += 1) {
    data.push({
      id: i + 1,
      userId: 1,
      timezoneId: 1,
      baseCurrencyId: 1,
      referralToken: crypto.randomBytes(16).toString('hex'),
      kycToken: crypto.randomBytes(3).toString('hex'),
    });
  }
  const [err] = await to(
    UserProfile.bulkCreate(data, {
      fields: Object.keys(data[0]),
      updateOnDuplicate: 'id',
      include: [User, Timezone, Currency],
    }),
  );

  if (err) {
    console.warn(`problem with initialising UserProfile table: `, err);
  } else {
    console.warn(`initial rows added to UserProfile table successfully.`);
  }
};

export default UserProfile;
