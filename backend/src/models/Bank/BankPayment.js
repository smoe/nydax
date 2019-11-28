import DataType from 'sequelize';
import Model from '../../sequelize';

const BankPayment = Model.define('BankPayment', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tokenAmount: {
    type: DataType.DECIMAL(15, 6),
    allowNull: true,
  },
  currencyAmount: {
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
  },
  bankRefId: {
    type: DataType.STRING(255),
  },
  paymentToken: {
    type: DataType.STRING(100),
    allowNull: false,
  },

  // userId
  // tokenId
  // currencyId
  // bankPaymentStatusId
  // bankServiceId
});

export default BankPayment;
