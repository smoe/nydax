import DataType from 'sequelize';
import Model from '../sequelize';
// import { initializeDB } from '../config';
// import Pair from './Pair';
// import User from './User/User';

const Trade = Model.define('Trade', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
    defaultValue: '0.0000',
  },
  amount: {
    type: DataType.DECIMAL(21, 9),
    allowNull: false,
    defaultValue: '0.0000',
  },
  sellOrderId: {
    type: DataType.INTEGER(11),
    unique: 'compositeIndex',
  },
  buyOrderId: {
    type: DataType.INTEGER(11),
    unique: 'compositeIndex',
  },
});

// export const initialize = () => {
//   if (initializeDB) {
//     const data = [
//       {
//         id: 1,
//         pairId: 1,
//         sellOrderId: 1,
//         buyOrderId: 2,
//         price: 110,
//         amount: 200,
//       },
//     ];
//     Trade.bulkCreate(data, {
//       fields: Object.keys(data[0]),
//       updateOnDuplicate: 'id',
//       include: [Pair, User],
//     })
//       .then(() => {
//         console.warn(`initial rows added to Trade table successfully.`);
//       })
//       .catch(error => {
//         console.warn(
//           `problem with adding initial rows to Trade table: `,
//           error,
//         );
//       });
//   }
// };

export default Trade;
