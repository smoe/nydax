import to from 'await-to-js';
import mjml2html from 'mjml';
import { errors } from '../constants/messages';
import sequelize from '../sequelize';
import {
  UserProfile,
  UserVerificationFeedback,
  User,
  Reward,
  Token,
} from '../models';
import config from '../config';
import sendMail from '../sendMail';

const options = {};

const revisedHtmlOutput = (link, user, feedback) =>
  mjml2html(
    `
    <mjml>
  <mj-body background-color="#1c2237">
    <mj-spacer height="50px" />
    <mj-section background-color="#252d47">
      <mj-column>

        <mj-image width="100" src="${
          config.frontEndServer
        }/logo/dark.png"></mj-image>
        <mj-spacer height="20px" />
        
        <mj-text font-size="20px" color="#a5bdea" font-family="helvetica">Please complete your account information</mj-text>
 
        <mj-divider border-color="#353e5c"></mj-divider>

        <mj-text font-size="15px" color="#a5bdea" font-family="helvetica">
          Hey ${
            user.UserProfile.firstName
          }, your account is one step away from being verified. Please fully fix and complete the following information:
        </mj-text>

        <mj-text font-size="15px" color="#a5bdea" font-family="helvetica">
          ${feedback}
        </mj-text>        
        
        <mj-text font-size="15px" color="#a5bdea" font-family="helvetica">
          Click the button below to enter the platform and complete your info.
        </mj-text>        
        <mj-button background-color="#7577ff" color="white" align="left" font-family="helvetica" href="${link}"> NYDAX Platform </mj-button>

        <mj-spacer height="50px" />
        <mj-text line-height="5px" font-size="14px" color="gray" font-family="helvetica">${
          config.platformName
        } team
        </mj-text>
        <mj-text line-height="5px" font-size="14px" color="gray" font-family="helvetica">Automated message. please do not reply.
        </mj-text>
        
      </mj-column>
    </mj-section>
    <mj-spacer height="50px" />
  </mj-body>
</mjml>

    `,
    options,
  );

const verifiedHtmlOutput = (link, user) =>
  mjml2html(
    `
    <mjml>
  <mj-body background-color="#1c2237">
    <mj-spacer height="50px" />
    <mj-section background-color="#252d47">
      <mj-column>

        <mj-image width="100" src="${
          config.frontEndServer
        }/logo/dark.png"></mj-image>
        <mj-spacer height="20px" />
        
        <mj-text font-size="20px" color="#a5bdea" font-family="helvetica">Congratulations! Your account has been verified!</mj-text>
 
        <mj-divider border-color="#353e5c"></mj-divider>

        <mj-text font-size="18px" color="#a5bdea" font-family="helvetica">
          Welcome to ${config.platformName}!</mj-text>

        <mj-text font-size="15px" color="#a5bdea" font-family="helvetica">
          Hey ${
            user.UserProfile.firstName
          }, your account has been successfully verified. Thank you for filling your information in ${
      config.platformName
    }! That will help us give our best services to you.
        </mj-text>
        
        <mj-text font-size="15px" color="#a5bdea" font-family="helvetica">
          Click the button below to enter the platform and start trading!
        </mj-text>        
        <mj-button background-color="#7577ff" color="white" align="left" font-family="helvetica" href="${link}"> NYDAX Platform </mj-button>

        <mj-spacer height="50px" />
        <mj-text line-height="5px" font-size="14px" color="gray" font-family="helvetica">${
          config.platformName
        } team
        </mj-text>
        <mj-text line-height="5px" font-size="14px" color="gray" font-family="helvetica">Automated message. please do not reply.
        </mj-text>
        
      </mj-column>
    </mj-section>
    <mj-spacer height="50px" />
  </mj-body>
</mjml>

    `,
    options,
  );

const rejectedHtmlOutput = (link, user) =>
  mjml2html(
    `
    <mjml>
  <mj-body background-color="#1c2237">
    <mj-spacer height="50px" />
    <mj-section background-color="#252d47">
      <mj-column>

        <mj-image width="100" src="${
          config.frontEndServer
        }/logo/dark.png"></mj-image>
        <mj-spacer height="20px" />
        
        <mj-text font-size="20px" color="#a5bdea" font-family="helvetica">Your account has been rejected.</mj-text>
 
        <mj-divider border-color="#353e5c"></mj-divider>

        <mj-text font-size="15px" color="#a5bdea" font-family="helvetica">
          Hey ${
            user.UserProfile.firstName
          }, unfortunately your account has been rejected because the information you provided was not able to meet our verification criteria.
        </mj-text>
        
        <mj-spacer height="50px" />
        <mj-text line-height="5px" font-size="14px" color="gray" font-family="helvetica">${
          config.platformName
        } team
        </mj-text>
        <mj-text line-height="5px" font-size="14px" color="gray" font-family="helvetica">Automated message. please do not reply.
        </mj-text>
        
      </mj-column>
    </mj-section>
    <mj-spacer height="50px" />
  </mj-body>
</mjml>

    `,
    options,
  );

const sendShouldModifyEmail = async (userProfile, feedback = null) => {
  const user = userProfile.User;

  sendMail(
    user.email,
    `[${config.platformName}] Please revise your submitted account information`,
    revisedHtmlOutput(config.frontEndServer, user, feedback).html,
  );
};

const sendVerfiedEmail = async userProfile => {
  const user = userProfile.User;

  sendMail(
    user.email,
    `[${config.platformName}] Your account has been verified`,
    verifiedHtmlOutput(config.frontEndServer, user).html,
  );
};

const sendRejectedEmail = async userProfile => {
  const user = userProfile.User;

  sendMail(
    user.email,
    `[${config.platformName}] Your account has been rejected`,
    rejectedHtmlOutput(config.frontEndServer, user).html,
  );
};

/*
 * For all users whose KYC status has been changed (verificationStatusModified == true):
 *   Send email based on status (and set verificationStatusModified == false)
 */
const checkAndSendAll = async () => {
  const [err, userProfiles] = await to(
    UserProfile.findAll({
      where: { verificationStatusModified: 1 },
    }),
  );

  if (err) {
    console.log('DB Error: could not load user profiles') // eslint-disable-line
    return;
  }

  userProfiles.forEach(async item => {
    const userProfile = item;

    const [userErr, user] = await to(
      User.findOne({
        where: { id: userProfile.userId },
      }),
    );
    userProfile.User = user;
    user.UserProfile = userProfile;

    if (userErr || user == null) {
      return;
    }

    let errFeedback;
    let feedback;
    let feedbackMessage = null;

    switch (userProfile.verificationStatusId) {
      case 3: // Waiting for Modification
        // Get the latest (i.e. greatest id) UserVerificationFeedback
        [errFeedback, feedback] = await to(
          UserVerificationFeedback.findOne({
            where: { userProfileId: userProfile.id },
            limit: 1,
            order: [['id', 'DESC']],
          }),
        );

        if (errFeedback) {
          return;
        }

        if (feedback) {
          feedbackMessage = feedback.message;
        }
        sendShouldModifyEmail(userProfile, feedbackMessage);
        break;

      /* eslint-disable no-case-declarations */
      case 4: // Verified
        const [invoTokenErr, invoToken] = await to(
          Token.findOne({
            where: {
              id: 3, // invo
            },
          }),
        );

        if (invoTokenErr) {
          console.log(errors.DATABASE_ERROR); // eslint-disable-line
          return;
        }
        const [errReward] = await to(
          Reward.create({
            userId: user.id,
            tokenId: 3,
            amount: Math.floor(
              Number(config.usdEquivalentOfReward) / Number(invoToken.usdPrice),
            ),
            start_date: sequelize.literal('CURRENT_TIMESTAMP'),
            end_date: config.rewardLockEndDate,
          }),
        );

        if (errReward) {
          console.log(errors.DATABASE_ERROR); // eslint-disable-line
          return;
        }

        if (config.giveReferralReward) {
          const [errReferredUser, referredUser] = await to(
            User.findOne({
              where: {
                id: user.referredBy,
              },
            }),
          );

          if (errReferredUser) {
            console.log(errors.DATABASE_ERROR); // eslint-disable-line
          }

          if (referredUser) {
            referredUser.invitationRewardCount = Number(referredUser.invitationRewardCount) + 1; // eslint-disable-line
            await to(referredUser.save());
            if (
              referredUser.invitationRewardCount <=
              config.maxNumberOfReferralReward
            ) {
              await to(
                Reward.create({
                  userId: referredUser.id,
                  tokenId: 3,
                  amount: Math.floor(
                    Number(config.usdEquivalentOfRewardForRefferedUser) /
                      Number(invoToken.usdPrice),
                  ),
                  start_date: sequelize.literal('CURRENT_TIMESTAMP'),
                  end_date: config.rewardLockEndDate,
                }),
              );
            }
          }
        }

        sendVerfiedEmail(userProfile);
        break;
      /* eslint-enable no-case-declaration */

      case 5: // Rejected
        sendRejectedEmail(userProfile);
        break;
      default:
        break;
    }

    if ([3, 4, 5].includes(userProfile.verificationStatusId)) {
      userProfile.verificationStatusModified = 0;
      await to(userProfile.save());
    }
  });
};

export default checkAndSendAll;
