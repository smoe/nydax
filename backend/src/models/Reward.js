import DataType from 'sequelize';
import Model from '../sequelize';

// TODO: maybe it is better to just refer to Wallet with walletId

const Reward = Model.define(
  'Reward',
  {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataType.DECIMAL(30, 18),
      allowNull: false,
    },
    start_date: {
      type: DataType.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataType.DATE,
      allowNull: false,
    },
  },
  {
    charset: 'utf8mb4',
    createdAt: false,
    updatedAt: false,
  },
);

export default Reward;
