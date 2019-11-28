import DataType, { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import to from 'await-to-js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import moment from 'moment-timezone';
import Model from '../../sequelize';
import { UserProfile, UserAuthStatus, Blacklist } from '../../models';
import config from '../../config';
import FailedLoginAttempt from '../FailedLoginAttempt';
// import { initialize as initializeUser } from '../utils';

const User = Model.define(
  'User',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
    },
    emailConfirmed: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
    emailConfirmationToken: {
      type: DataType.STRING(64),
      allowNull: true,
      defaultValue() {
        return crypto.randomBytes(32).toString('hex');
      },
    },
    invitationRewardCount: {
      type: DataType.NUMERIC,
      defaultValue: 0,
    },
    resetPasswordToken: {
      type: DataType.STRING(64),
      allowNull: true,
    },
    resetPasswordTokenCreatedAt: {
      type: DataType.DATE,
      allowNull: true,
    },
    password: {
      type: DataType.STRING(100),
      allowNull: true,
    },
    withdrawalLimit: {
      type: DataType.DECIMAL(15, 6),
    },
    feeDiscountFactor: {
      type: DataType.DECIMAL(15, 6),
    },
    referredBy: {
      type: DataType.INTEGER(11),
      allowNull: true,
    },
    isBot: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
    isExchange: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
    isHolder: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    charset: 'utf8mb4',
    indexes: [{ fields: ['email'] }],
  },
);

// generating a hash
User.generateHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

// checking if password is valid
User.validPassword = (password, user) =>
  bcrypt.compareSync(password, user.password);

// checking if password is valid
User.getToken = user => {
  const expirationTime = config.auth.jwt.expiration;
  return jwt.sign({ id: user.id }, config.auth.jwt.secret, {
    expiresIn: expirationTime,
  });
};
User.clearFailAttempts = async user => {
  await to(
    FailedLoginAttempt.destroy({
      where: {
        userId: user.id,
      },
    }),
  );
};
User.addFailAttempts = async user => {
  // first cleared attempts from more than one hours ago
  let m = moment();
  await to(
    FailedLoginAttempt.destroy({
      where: {
        [Op.lte]: m.add(-1, 'hour').format(),
      },
    }),
  );
  // now we create current failed attempt
  await to(FailedLoginAttempt.create({ userId: user.id }));

  // then we check if user needs to be locked
  const failureNo = await to(
    FailedLoginAttempt.count({
      where: {
        userId: user.id,
      },
    }),
  );

  if (failureNo[1] >= config.maxFailedAttempt) {
    m = moment();
    const [err] = await to(
      Blacklist.create({
        email: user.email,
        ip: null,
        until: m.add(1, 'hour').format(),
      }),
    );
    if (err) {
      return false;
    }
  }
  return failureNo[1];
};
// TODO: add wallets in registration time
// TODO: fill all related tables for user in initialization

export const initialize = async () => {
  const botUsers = [];
  const botUsersProfile = [];
  const botUsersAuthStatus = [];
  if (config.initializeBotUsers) {
    for (let i = 1000; i < 11000; i += 1) {
      botUsers.push({
        id: i,
        email: `bot${i - 1000}@${config.platformName}.com`,
        password: bcrypt.hashSync(`123!@#`, bcrypt.genSaltSync(8), null),
        emailConfirmed: true,
        isBot: true,
      });
      botUsersProfile.push({
        firstName: `bot${i - 1000}`,
        lastName: `bot${i - 1000}`,
        baseCurrencyId: 1,
        timezoneId: 1,
        userId: i,
      });
      botUsersAuthStatus.push({
        twoFactorAuthEnabled: false,
        smsEnabled: false,
        userId: i,
      });
    }
  }
  const data = [
    {
      id: 1,
      email: `mm@${config.platformName}.com`,
      password: bcrypt.hashSync(
        `${config.platformName}mm123!@#`,
        bcrypt.genSaltSync(8),
        null,
      ),
      emailConfirmed: true,
      isBot: true,
    },
    {
      id: 2,
      email: `fee@${config.platformName.toLowerCase()}.com`,
      password: bcrypt.hashSync(
        `${config.platformName}fee123!@#`,
        bcrypt.genSaltSync(8),
        null,
      ),
      emailConfirmed: true,
      isBot: true,
    },
    {
      id: 3,
      email: `holder@${config.platformName.toLowerCase()}.com`,
      password: bcrypt.hashSync(
        `${config.platformName}holder123!@#`,
        bcrypt.genSaltSync(8),
        null,
      ),
      emailConfirmed: true,
      isBot: true,
      isHolder: true,
    },
    {
      id: 501,
      email: `bitmex@${config.platformName.toLowerCase()}.com`,
      password: bcrypt.hashSync(`Bitmex123!@#`, bcrypt.genSaltSync(8), null),
      emailConfirmed: true,
      isBot: true,
      isExchange: true,
    },
    {
      id: 502,
      email: `binance@${config.platformName.toLowerCase()}.com`,
      password: bcrypt.hashSync(`Binance123!@#`, bcrypt.genSaltSync(8), null),
      emailConfirmed: true,
      isBot: true,
      isExchange: true,
    },
    ...botUsers,
  ];

  const [err] = await to(
    User.bulkCreate(data, {
      // fields: Object.keys(data[0]),
      updateOnDuplicate: 'id',
    }),
  );

  if (err) {
    console.warn(`problem with adding initial data to User table: `, err);
  } else {
    console.warn(`initial rows added to User table successfully.`);
  }

  if (config.initializeBotUsers) {
    await to(
      UserProfile.bulkCreate(botUsersProfile, {
        fields: Object.keys(botUsersProfile[0]),
        updateOnDuplicate: 'userId',
      }),
    );
    await to(
      UserAuthStatus.bulkCreate(botUsersAuthStatus, {
        fields: Object.keys(botUsersAuthStatus[0]),
        updateOnDuplicate: 'userId',
      }),
    );
  }
  // initializeUser(User, data);
};

export default User;
