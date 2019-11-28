import to from 'await-to-js';
import { Wallet, Reward } from '../../models';
import { errors, titles } from '../../constants/messages';
import { resError } from '../../utils';

function add(accumulator, a) {
  return accumulator + a;
}

const getWallets = async (req, res) => {
  const [err, wallets] = await to(
    Wallet.findAll({
      where: {
        userId: req.user.id,
      },
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  const [errRewards, rewards] = await to(
    Reward.findAll({
      where: {
        userId: req.user.id,
      },
    }),
  );

  if (errRewards) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json(
    wallets.map(item => {
      const lockedReward = rewards
        .filter(
          reward =>
            reward.tokenId === item.tokenId &&
            new Date(reward.end_date).getTime() > new Date().getTime(),
        )
        .map(_item => Number(_item.amount))
        .reduce(add, 0);

      return lockedReward ? { ...item.dataValues, lockedReward } : item;
    }),
  );
};

export default getWallets;
