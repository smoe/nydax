import to from 'await-to-js';
import { UserAuthStatus, User } from '../../models';
import { errors, titles } from '../../constants/messages';
import { resError } from '../../utils';

const getAuthStatus = async (req, res) => {
  const [err, userAuthStatus] = await to(
    UserAuthStatus.findOne({
      attributes: ['smsEnabled', 'twoFactorAuthEnabled', 'phoneNumber'],
      where: {
        userId: req.user.id,
      },
      include: [{ model: User, attributes: [] }],
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json(userAuthStatus);
};

export default getAuthStatus;
