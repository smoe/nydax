import to from 'await-to-js';
import { errors, titles } from '../../constants/messages';
import { validateId } from '../../validation';
import sanitize from '../../sanitization';
import { resError } from '../../utils';
import { PriceMinute } from '../../models';

const maxAge = 60;

const getMinuteHistory = async (req, res) => {
  const { pairId } = req.query;

  // Input validation
  if (!pairId) {
    resError(res, 500, titles.PRICE_INFO_ERROR, errors.PAIR_ID_IS_NOT_PROVIDED);
    return;
  }

  const tokenValidationError = validateId(pairId);
  if (tokenValidationError.length > 0) {
    resError(res, 500, titles.PRICE_INFO_ERROR, tokenValidationError);
    return;
  }

  // input sanitization
  const sanitizedPairId = Number(sanitize(pairId));

  const [err, prices] = await to(
    PriceMinute.findAll({
      where: { pairId: sanitizedPairId },
      limit: 5000,
      order: [['createdAt', 'DESC']],
    }),
  );
  if (err) {
    resError(res, 500, titles.PRICE_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.setHeader('Surrogate-Control', `max-age=${maxAge}`);
  res.status(200).json(prices);
};

export default getMinuteHistory;
