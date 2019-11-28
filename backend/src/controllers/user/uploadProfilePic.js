import to from 'await-to-js';
import { resError } from '../../utils';
import { User, UserProfile } from '../../models';
import { errors, titles } from '../../constants/messages';
import { gatewayHost } from '../../config';

/* eslint-disable prefer-const */

const uploadProfilePic = async (req, res) => {
  let err;
  let userProfile;

  [err, userProfile] = await to(
    UserProfile.findOne({
      where: {
        userId: req.user.id,
      },
      include: [User],
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.PROFILE_PIC_UPLOAD);
    return;
  }

  const profilePicPath = `${gatewayHost}/images/users/${req.file.filename}`;
  userProfile.picture = profilePicPath; // eslint-disable-line

  [err] = await to(userProfile.save());
  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.PROFILE_PIC_UPLOAD);
    return;
  }

  res.status(200).json(profilePicPath);
};

export default uploadProfilePic;
