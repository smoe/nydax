import to from 'await-to-js';
import { FavouriteCharts, User, Pair } from '../../models';
import { errors, successes, titles } from '../../constants/messages';
import { validateId } from '../../validation';
import sanitize from '../../sanitization';
import { resError, resSuccess } from '../../utils';
/* eslint-disable prefer-const */

const addFavouriteChart = async (req, res) => {
  const { id } = req.params;

  // Input validation
  if (!id) {
    resError(res, 500, titles.FAVOURITE_CHART, errors.ID_IS_NOT_PROVIDED);
    return;
  }

  const tokenValidationError = validateId(id);
  if (tokenValidationError.length > 0) {
    resError(res, 500, titles.FAVOURITE_CHART, tokenValidationError);
    return;
  }

  // input sanitization
  const sanitizedId = Number(sanitize(id));

  let err;
  let favouriteChart;

  [err, favouriteChart] = await to(
    FavouriteCharts.findOne({
      where: { userId: req.user.id, pairId: sanitizedId },
      include: [User, Pair],
    }),
  );

  if (err) {
    res.status(500).json({ error: errors.DATABASE_ERROR });
  }

  // Check if there is not a chart for this user and pairId
  if (!favouriteChart) {
    [err] = await to(
      FavouriteCharts.create(
        { userId: req.user.id, pairId: sanitizedId },
        {
          include: [Pair, User],
        },
      ),
    );

    if (err) {
      res.status(500).json({
        error: {
          title: errors.FAVOURITE_CHART,
          description: errors.DATABASE_ERROR,
        },
      });
      return;
    }

    resSuccess(
      res,
      200,
      successes.FAVOURITE_CHART,
      successes.FAVOURITE_CHART_ADDED,
    );
    return;
  }

  resError(
    res,
    500,
    errors.FAVOURITE_CHART,
    errors.FAVOURITE_CHART_EXIST_BEFORE,
  );
};

export default addFavouriteChart;
