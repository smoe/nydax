import to from 'await-to-js';
import { resError } from '../../utils';
import { User, UserProfile } from '../../models';
import { errors, titles } from '../../constants/messages';
import { gatewayHost } from '../../config';

/* eslint-disable prefer-const */

const delteProfilePic = async (req, res) => {
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
  //now we first delete image permanently
  try {
    const fs = require('fs');
    fs.unlinkSync(
      `./public${userProfile.picture.replace('http://localhost:3004', '')}`,
    );
  } catch (error) {
    console.log(error);
  }

  userProfile.picture = null; // eslint-disable-line

  [err] = await to(userProfile.save());
  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.PROFILE_PIC_UPLOAD);
    return;
  }

  res.status(200).json(null);
};

export default delteProfilePic;
