import to from 'await-to-js';
import { UserProfile, User, UserVerificationStatus } from '../../models';
import { errors, titles } from '../../constants/messages';
import { resError } from '../../utils';

const getProfile = async (req, res) => {
  const [err, userProfile] = await to(
    UserProfile.findOne({
      attributes: [
        'timezoneId',
        'baseCurrencyId',
        'countryId',
        'picture',
        'referralToken',
        'firstName',
        'lastName',
        'legalFirstName',
        'legalLastName',
        'legalMiddleName',
        'driverLicenseFrontPic',
        'driverLicenseBackPic',
        'identityCardFrontPic',
        'identityCardBackPic',
        'passportPic',
        'facePic',
        'kycToken',
        'verificationStatusId',
      ],
      where: {
        userId: req.user.id,
      },
      include: [
        { model: User, attributes: ['email'] },
        { model: UserVerificationStatus, attributes: ['id'] },
      ],
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  if (userProfile) {
    const newUserProfile = {};
    newUserProfile.email = userProfile.User.email;
    newUserProfile.timezoneId = userProfile.timezoneId;
    newUserProfile.countryId = userProfile.countryId;
    newUserProfile.baseCurrencyId = userProfile.baseCurrencyId;
    newUserProfile.profilePicUrl = userProfile.picture;
    newUserProfile.referralToken = userProfile.referralToken;
    newUserProfile.firstName = userProfile.firstName;
    newUserProfile.lastName = userProfile.lastName;
    newUserProfile.legalFirstName = userProfile.legalFirstName;
    newUserProfile.legalLastName = userProfile.legalLastName;
    newUserProfile.legalMiddleName = userProfile.legalMiddleName;
    newUserProfile.driverLicenseFrontPic = userProfile.driverLicenseFrontPic;
    newUserProfile.driverLicenseBackPic = userProfile.driverLicenseBackPic;
    newUserProfile.identityCardFrontPic = userProfile.identityCardFrontPic;
    newUserProfile.identityCardBackPic = userProfile.identityCardBackPic;
    newUserProfile.passportPic = userProfile.passportPic;
    newUserProfile.facePic = userProfile.facePic;
    newUserProfile.kycToken = userProfile.kycToken;
    newUserProfile.verificationStatusId = userProfile.UserVerificationStatus.id;

    res.status(200).json(newUserProfile);
    return;
  }
  resError(res, 500, titles.USER_INFO_ERROR, errors.USER_PROFILE_NOT_FOUND);
};

export default getProfile;
