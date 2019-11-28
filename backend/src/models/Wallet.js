import DataType from 'sequelize';
import to from 'await-to-js';
import Model from '../sequelize';
import User from './User/User';
import Token from './Token/Token';
import config from '../config';

const Wallet = Model.define('Wallet', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  // userId: {
  //   type: DataType.INTEGER(11),
  //   allowNull: true,
  // },
  // tokenId: {
  //   type: DataType.INTEGER(11),
  //   allowNull: true,
  // },
  address: {
    type: DataType.STRING(45),
    allowNull: false,
  },
  privateKey: {
    type: DataType.STRING(128),
    allowNull: false,
  },
  balance: {
    type: DataType.DECIMAL(34, 22),
    defaultValue: 0,
    allowNull: false,
  },
  reservedBalance: {
    type: DataType.DECIMAL(34, 22),
    defaultValue: 0,
    allowNull: false,
  },
  isExternal: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  tokenId: {
    type: DataType.INTEGER(11),
    unique: 'compositeIndex',
  },
  userId: {
    type: DataType.INTEGER(11),
    unique: 'compositeIndex',
  },
});

// const tokenCounts = [
//   285,
//   10,
//   40000,
//   130000,
//   650,
//   13000,
//   250,
//   130000,
//   2600,
//   4000,
//   400,
// ];
const tokenCounts = [285, 10, 10000, 10000];

export const initialize = async () => {
  const tokenNumber = 4;
  let botUserWallets = [];
  const mmUserWallets = [];
  const feeUserWallets = [];
  const holderUserWallets = [];
  if (config.initializeBotUsers) {
    for (let i = 1000; i < 11000; i += 1) {
      for (let j = 0; j < tokenNumber; j += 1) {
        botUserWallets.push({
          id: 2 * tokenNumber + 1 + (i - 1000) * tokenNumber + j,
          userId: i,
          tokenId: j + 1,
          address: '',
          balance: `${tokenCounts[j]}`,
        });
      }
      if (i % 100 === 99) {
        const [err] = await to( // eslint-disable-line
          Wallet.bulkCreate(botUserWallets, {
            fields: Object.keys(botUserWallets[0]),
            updateOnDuplicate: 'id',
            include: [User, Token],
          }),
        );

        if (err) {
          console.warn(
            `problem with adding initial data to Wallet table: `,
            err,
          );
        } else {
          console.warn(`initial rows added to Wallet table successfully.`);
        }
        botUserWallets = [];
      }
    }
  }
  for (let j = 0; j < tokenNumber; j += 1) {
    mmUserWallets.push({
      id: j + 1,
      userId: 1,
      tokenId: j + 1,
      address: '',
    });
  }
  for (let j = 0; j < tokenNumber; j += 1) {
    feeUserWallets.push({
      id: j + tokenNumber + 1,
      userId: 2,
      tokenId: j + 1,
      address: '',
    });
  }
  for (let j = 0; j < tokenNumber; j += 1) {
    holderUserWallets.push({
      id: j + 2 * tokenNumber + 1,
      userId: 3,
      tokenId: j + 1,
      address: '',
    });
  }
  // Bitmex user
  for (let j = 0; j < tokenNumber; j += 1) {
    feeUserWallets.push({
      id: j + 3 * tokenNumber + 1,
      userId: 501,
      tokenId: j + 1,
      address:
        j === 1
          ? '2N6dRRNBaPxDnGF6BMWPF39vJHYuFDau92M'
          : '46b054fe32a36e8f3a09e9f866e3e8628efe7d17',
    });
  }
  // Binance user
  for (let j = 0; j < tokenNumber; j += 1) {
    feeUserWallets.push({
      id: j + 4 * tokenNumber + 1,
      userId: 502,
      tokenId: j + 1,
      address:
        j === 1
          ? '2N6dRRNBaPxDnGF6BMWPF39vJHYuFDau92M'
          : '46b054fe32a36e8f3a09e9f866e3e8628efe7d17',
    });
  }
  const data = [
    ...mmUserWallets,
    ...feeUserWallets,
    ...holderUserWallets,
    // ...botUserWallets,
    // {
    //   id: 3,
    //   userId: 1,
    //   tokenId: 3,
    //   address: '0x4Edae3115348c1a0A177746B86e44bf40E8EA7d5',
    //   balance: '100000',
    // },
    // {
    //   id: 4,
    //   userId: 2,
    //   tokenId: 1,
    //   address: '0x8976541cD645924dFb97B10610dF56FB481e7cf6',
    // },
    // {
    //   id: 5,
    //   userId: 2,
    //   tokenId: 2,
    //   address: '0x8976541cD645924dFb97B10610dF56FB481e7cf6',
    // },
    // {
    //   id: 6,
    //   userId: 2,
    //   tokenId: 3,
    //   address: '0x8976541cD645924dFb97B10610dF56FB481e7cf6',
    // },
  ];

  const [err] = await to(
    Wallet.bulkCreate(data, {
      fields: Object.keys(data[0]),
      updateOnDuplicate: 'id',
      include: [User, Token],
    }),
  );

  if (err) {
    console.warn(`problem with adding initial data to Wallet table: `, err);
  } else {
    console.warn(`initial rows added to Wallet table successfully.`);
  }
};

export default Wallet;
