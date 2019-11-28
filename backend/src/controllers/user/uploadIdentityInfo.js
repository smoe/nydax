import to from 'await-to-js';
import sharp from 'sharp';
import uuidv4 from 'uuid/v4';
import { UserProfile } from '../../models';
import { errors, successes, titles } from '../../constants/messages';
import { host } from '../../config';
import { resError, resSuccess } from '../../utils';

const resizedImageWidth = 300;

const resizeAndRename = file => {
  const id = uuidv4();
  const originalImageUrl = `public/images/users/${id}`;
  const resizedImageUrl = `${host}/images/users/${id}`;
  sharp(file.path)
    .resize(resizedImageWidth)
    .jpeg()
    .toFile(originalImageUrl);

  return resizedImageUrl;
};

const uploadIdentityInfo = async (req, res) => {
  const {
    legalFirstName,
    legalLastName,
    legalMiddleName,
    countryId,
  } = req.body;

  let err;
  let userProfile;

  [err, userProfile] = await to(  // eslint-disable-line
    UserProfile.findOne({
      where: {
        userId: req.user.id,
      },
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  if ([2, 4, 5].includes(userProfile.verificationStatusId)) {
    // submitted, verified, rejected
    resError(
      res,
      500,
      titles.USER_INFO_ERROR,
      errors.USER_VERIFICATION_STATUS_DETERMINED_BEFORE,
    );
    return;
  }

  if (req.files.passportPic) {
    const passportUrl = resizeAndRename(req.files.passportPic[0]);
    userProfile.passportPic = passportUrl; // eslint-disable-line
    userProfile.verificationStatusId = 2;
  }
  if (req.files.identityCardFrontPic) {
    const identityCardFrontPic = resizeAndRename(
      req.files.identityCardFrontPic[0],
    );
    userProfile.identityCardFrontPic = identityCardFrontPic; // eslint-disable-line
  }
  if (req.files.identityCardBackPic) {
    const identityCardBackPic = resizeAndRename(
      req.files.identityCardBackPic[0],
    );
    userProfile.identityCardBackPic = identityCardBackPic; // eslint-disable-line
  }
  if (req.files.identityCardFrontPic && req.files.identityCardBackPic) {
    userProfile.verificationStatusId = 2;
  }
  if (req.files.driverLicenseFrontPic) {
    const driverLicenseFrontPic = resizeAndRename(
      req.files.driverLicenseFrontPic[0],
    );
    userProfile.driverLicenseFrontPic = driverLicenseFrontPic; // eslint-disable-line
  }
  if (req.files.driverLicenseBackPic) {
    const driverLicenseBackPic = resizeAndRename(
      req.files.driverLicenseBackPic[0],
    );
    userProfile.driverLicenseBackPic = driverLicenseBackPic; // eslint-disable-line
  }
  if (req.files.driverLicenseFrontPic && req.files.driverLicenseBackPic) {
    userProfile.verificationStatusId = 2;
  }

  if (req.files.facePic) {
    const facePic = resizeAndRename(req.files.facePic[0]);
    userProfile.facePic = facePic; // eslint-disable-line
    userProfile.verificationStatusId = 2;
  }
  userProfile.legalFirstName = legalFirstName; // eslint-disable-line
  userProfile.legalLastName = legalLastName;// eslint-disable-line
  userProfile.legalMiddleName = legalMiddleName; // eslint-disable-line
  userProfile.countryId = Number(countryId); // eslint-disable-line
  [err] = await to(userProfile.save());

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  resSuccess(
    res,
    200,
    titles.VERIFY_IDENTITY,
    successes.VERIFY_IDENTITY_SUCCESS,
  );
};

export default uploadIdentityInfo;
