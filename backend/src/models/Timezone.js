import DataType from 'sequelize';
import moment from 'moment-timezone';
import Model from '../sequelize';
import timezones from '../constants/timezones';
import { initialize as initializeTimezone } from './utils';

const Timezone = Model.define(
  'Timezone',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING(100),
      allowNull: true,
    },
    tvCategory: {
      type: DataType.STRING(100),
      allowNull: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

export const initialize = () => {
  // const momentTimezones = moment.tz.names();
  const feb = moment('2019-02-01T12:00:00Z');

  const data = timezones.map((timezone, i) => {
    const utcOffset = feb.tz(timezone).utcOffset();

    const offset =
      utcOffset < 0
        ? `-${moment
            .utc((Math.abs(utcOffset) / 60) * 3600 * 1000)
            .format('HH:mm')}`
        : `+${moment.utc((utcOffset / 60) * 3600 * 1000).format('HH:mm')}`;

    // const tvCategory = timezones.includes(momentTimezone)
    //   ? momentTimezone
    //   : timezones.find((timezone, j) => tvOffset[j] === utcOffset);

    return {
      id: i + 1,
      name: `${timezone} (${offset})`,
      tvCategory: timezone,
    };
  });
  initializeTimezone(Timezone, data);
};

export default Timezone;
