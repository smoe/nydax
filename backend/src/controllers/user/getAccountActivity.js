import to from 'await-to-js';
import { UserAccountActivity } from '../../models';
import { errors, titles } from '../../constants/messages';
import { resError } from '../../utils';

const getAccountActivity = async (req, res) => {
  const [err, accountActivities] = await to(
    UserAccountActivity.findAll({
      where: {
        userId: req.user.id,
      },
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json(accountActivities);
};

export default getAccountActivity;
