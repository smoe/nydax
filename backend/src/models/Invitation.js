import DataType from 'sequelize';
import to from 'await-to-js';
import Model from '../sequelize';
import User from './User/User';
import config from '../config';

const Invitation = Model.define('Invitation', {
  // id: {
  //   type: DataType.INTEGER(11),
  //   primaryKey: true,
  //   allowNull: false,
  //   autoIncrement: true,
  // },
  // invitedBy: {
  //   type: DataType.INTEGER(11),
  //   references: {
  //     model: 'User',
  //     key: 'id',
  //   },
  // },
  email: {
    type: DataType.STRING(255),
    validate: { isEmail: true },
    primaryKey: true,
    allowNull: false,
  },
  token: {
    type: DataType.STRING(64),
    allowNull: true,
  },
});

// TODO: add token for reward purposes

export const initialize = async () => {
  const data = [
    {
      email: `friend@${config.platformName.toLowerCase()}.com`,
      invitedBy: 1,
    },
  ];

  const [err] = await to(
    Invitation.bulkCreate(data, {
      fields: Object.keys(data[0]),
      updateOnDuplicate: 'id',
      include: [User],
    }),
  );

  if (err) {
    console.warn(`problem with adding initial rows to Invitation table: `, err);
  } else {
    console.warn(`initial rows added to Invitation table successfully.`);
  }
};

export default Invitation;
