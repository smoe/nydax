import to from 'await-to-js';
import { validateId } from '../../validation';
import sanitize from '../../sanitization';
import { FavouriteCharts, User, Pair } from '../../models';
import { errors, successes, titles } from '../../constants/messages';
import { resError, resSuccess } from '../../utils';

/* eslint-disable prefer-const */

const removeFavouriteChart = async (req, res) => {
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
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  if (favouriteChart) {
    [err] = await to(
      FavouriteCharts.destroy({
        where: { userId: req.user.id, pairId: sanitizedId },
        include: [User, Pair],
      }),
    );

    if (err) {
      resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
      return;
    }

    resSuccess(
      res,
      200,
      successes.FAVOURITE_CHART,
      successes.FAVOURITE_CHART_REMOVED,
    );
  } else {
    resError(
      res,
      500,
      titles.USER_INFO_ERROR,
      errors.FAVOURITE_CHART_NOT_EXIST,
    );
  }
};

export default removeFavouriteChart;
