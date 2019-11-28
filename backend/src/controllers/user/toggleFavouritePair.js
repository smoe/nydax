import to from 'await-to-js';
import { FavouritePairs, User, Pair } from '../../models';
import { errors, successes, titles } from '../../constants/messages';
import { validateId } from '../../validation';
import sanitize from '../../sanitization';
import { resError, resSuccess } from '../../utils';
/* eslint-disable prefer-const */

const toggleFavouritePair = async (req, res) => {
  const { id } = req.params;

  // Input validation
  if (!id) {
    resError(res, 500, titles.FAVOURITE_PAIR, errors.ID_IS_NOT_PROVIDED);
    return;
  }

  const tokenValidationError = validateId(id);
  if (tokenValidationError.length > 0) {
    resError(res, 500, titles.FAVOURITE_PAIR, tokenValidationError);
    return;
  }

  // input sanitization
  const sanitizedId = Number(sanitize(id));

  let err;
  let favouritePair;

  [err, favouritePair] = await to(
    FavouritePairs.findOne({
      where: { userId: req.user.id, pairId: sanitizedId },
      include: [User, Pair],
    }),
  );

  if (err) {
    resError(res, 500, titles.FAVOURITE_PAIR, errors.DATABASE_ERROR);
    return;
  }

  // There is a favourite pait with that id so remove it
  if (favouritePair) {
    [err] = await to(favouritePair.destroy());
    if (err) {
      // resError(res, 500, )
    }
    resSuccess(
      res,
      200,
      titles.FAVOURITE_PAIR,
      successes.FAVOURITE_PAIR_REMOVED,
    );
    return;
  }

  [err] = await to(
    FavouritePairs.create(
      { userId: req.user.id, pairId: Number(req.params.id) },
      {
        include: [Pair, User],
      },
    ),
  );

  if (err) {
    resError(res, 500, titles.FAVOURITE_PAIR, errors.DATABASE_ERROR);
    return;
  }

  resSuccess(res, 200, titles.FAVOURITE_PAIR, successes.FAVOURITE_PAIR_ADDED);
};

export default toggleFavouritePair;
