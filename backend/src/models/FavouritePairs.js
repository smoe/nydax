import DataType from 'sequelize';
import Model from '../sequelize';
// import User from './User/User';
// import Pair from './Pair';
// import { initializeDB } from '../config';

const FavouritePairs = Model.define('FavouritePairs', {
  id: {
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  // userId: {
  //   type: DataType.INTEGER(11),
  //   references: {
  //     model: 'User',
  //     key: 'id',
  //   },
  // },
  // pairId: {
  //   type: DataType.INTEGER(11),
  //   references: {
  //     model: 'Pair',
  //     key: 'id',
  //   },
  // },
});

// export const initialize = () => {
//   if (initializeDB) {
//     const data = [
//       {
//         id: 1,
//         userId: 7,
//         pairId: 1,
//       },
//       {
//         id: 2,
//         userId: 7,
//         pairId: 2,
//       },
//     ];
//     FavouritePairs.bulkCreate(data, {
//       fields: Object.keys(data[0]),
//       updateOnDuplicate: 'id',
//       include: [User, Pair],
//     })
//       .then(() => {
//         console.warn(
//           `initial rows added to FavouritePairs table successfully.`,
//         );
//       })
//       .catch(error => {
//         console.warn(
//           `problem with adding initial rows to FavouritePairs table: `,
//           error,
//         );
//       });
//   }
// };

export default FavouritePairs;
