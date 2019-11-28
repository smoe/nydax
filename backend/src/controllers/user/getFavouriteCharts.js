import to from 'await-to-js';
import { FavouriteCharts, User } from '../../models';
import { errors, titles } from '../../constants/messages';
import { resError } from '../../utils';

const getFavouriteCharts = async (req, res) => {
  const [err, favouriteCharts] = await to(
    FavouriteCharts.findAll({
      attributes: ['pairId'],
      include: [{ model: User, where: { id: req.user.id }, attributes: [] }],
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json(favouriteCharts.map(chart => chart.pairId));
};

export default getFavouriteCharts;
