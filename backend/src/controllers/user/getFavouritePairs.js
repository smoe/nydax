import to from 'await-to-js';
import { FavouritePairs, User } from '../../models';
import { errors, titles } from '../../constants/messages';
import { resError } from '../../utils';

const getFavouritePairs = async (req, res) => {
  const [err, favouritePairs] = await to(
    FavouritePairs.findAll({
      attributes: ['pairId'],
      include: [{ model: User, where: { id: req.user.id }, attributes: [] }],
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json(favouritePairs.map(chart => chart.pairId));
};

export default getFavouritePairs;
