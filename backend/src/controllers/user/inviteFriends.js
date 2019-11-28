import to from 'await-to-js';
import sendInvitationEmail from '../user/sendInvitationEmail';
import { User, UserProfile } from '../../models';
import { errors, successes, titles } from '../../constants/messages';
import { resError, resSuccess } from '../../utils';
import { validateArrayOfEmails } from '../../validation';

const inviteFriends = async (req, res) => {
  let emails;
  try {
    emails = JSON.parse(req.body.emails);
    // Input validation
    const validationError = validateArrayOfEmails(emails);
    if (validationError.length > 0) {
      resError(res, 500, titles.USER_INFO_ERROR, validationError);
      return;
    }
  } catch (error) {
    emails = [];
  }

  const [err, referredUser] = await to(
    User.findOne({
      where: { id: req.user.id },
      include: [
        {
          model: UserProfile,
        },
      ],
    }),
  );

  if (err) {
    resError(res, 500, titles.INVITATION, errors.INVITATION_ERROR);
    return;
  }

  for (let i = 0; i < emails.length; i += 1) {
    const [errRegisteredUser, registeredUser] = await to( // eslint-disable-line
      User.findOne({
        where: { email: emails[i] },
      }),
    );

    if (
      !errRegisteredUser &&
      registeredUser !== null &&
      registeredUser !== undefined
    )
      sendInvitationEmail(
        emails[i],
        referredUser.UserProfile.referralToken,
        req.user.id,
      );
  }

  // TODO: manage multiple invitations by different people

  resSuccess(res, 200, titles.INVITATION, successes.INVITATION_DONE);
};

export default inviteFriends;
