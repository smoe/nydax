import DataType, { Op } from 'sequelize';
import to from 'await-to-js';
import moment from 'moment-timezone';
import Model from '../sequelize';
import config from '../config';
// import { initialize as initializeUser } from '../utils';

const Blacklist = Model.define('Blacklist', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataType.STRING(255),
    validate: { isEmail: true },
    defaultValue: null,
    allowNull: true,
  },
  ip: {
    type: DataType.STRING(255),
    validate: { isIP: true },
    defaultValue: null,
    allowNull: true,
  },
  until: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
});

export const initialize = async () => {
  const data = [
    {
      id: 1,
      email: `mm@${config.platformName}.com`,
      ip: null,
      until: '2019-07-04 07:09:48',
    },
    {
      id: 2,
      email: `mm@${config.platformName}.com`,
      ip: null,
      until: '2019-07-04 07:09:48',
    },
  ];

  const [err] = await to(
    Blacklist.bulkCreate(data, {
      // fields: Object.keys(data[0]),
      updateOnDuplicate: 'id',
    }),
  );

  if (err) {
    console.warn(`problem with adding initial data to User table: `, err);
  } else {
    console.warn(`initial rows added to User table successfully.`);
  }
};
Blacklist.clearExpired = async () => {
  const m = moment();
  await to(
    Blacklist.destroy({
      where: {
        [Op.lte]: m.format(),
      },
    }),
  );
};
export default Blacklist;
