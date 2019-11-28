import DataType from 'sequelize';
import to from 'await-to-js';
import Model from '../../sequelize';

const Setting = Model.define('Setting', {
  // id: {
  //   type: DataType.INTEGER(11),
  //   allowNull: false,
  //   primaryKey: true,
  //   autoIncrement: true,
  // },
  applicationName: {
    type: DataType.STRING(50),
    primaryKey: true,
    allowNull: false,
  },
  sectionName: {
    type: DataType.STRING(50),
    primaryKey: true,
    allowNull: false,
  },
  settingName: {
    type: DataType.STRING(50),
    primaryKey: true,
    allowNull: false,
  },
  settingValue: {
    type: DataType.STRING(1000),
    allowNull: true,
  },
  // settingTypeId: {
  //   type: DataType.INTEGER(11),
  //   allowNull: false,
  // },
});

const settings = [
  {
    id: 1,
    applicationName: 'IXP-BTC',
    sectionName: 'main',
    settingName: 'lastCheckedBlock',
    settingValue:
      '0000000000005fc42b5a760a61b6814fffb601d1e8b6b480d3bdf2db30a64590',
    settingTypeId: 1,
  },
  {
    id: 2,
    applicationName: 'IXP-ETH',
    sectionName: 'main',
    settingName: 'lastCheckedBlock',
    settingValue: '0',
    settingTypeId: 2,
  },
];

export const initialize = async () => {
  const [err] = await to(
    Setting.bulkCreate(settings, {
      fields: Object.keys(settings[0]),
      updateOnDuplicate: 'applicationName',
    }),
  );

  if (err) {
    console.warn(`problem with adding initial data to Setting table: `, err);
  } else {
    console.warn(`initial rows added to Setting table successfully.`);
  }
};

export default Setting;
