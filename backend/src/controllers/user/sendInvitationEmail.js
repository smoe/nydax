import mjml2html from 'mjml';
import to from 'await-to-js';
import config from '../../config';
import sendMail from '../../sendMail';
import { UserProfile } from '../../models';

/* eslint-disable prefer-const */

const options = {};

const htmlOutput = (link, invitedBy) =>
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

        <mj-text font-size="18px" color="#a5bdea" font-family="helvetica">Hello,</mj-text>
        <mj-text font-size="15px" color="#a5bdea" font-family="helvetica">${
          invitedBy.firstName
        } ${invitedBy.lastName} invited you to join ${
      config.platformName
    } community.</mj-text>
        <mj-button background-color="#7577ff" color="white" align="left" font-family="helvetica" href="${link}"> Get Started! </mj-button>
        <mj-spacer height="10px" />
        <mj-divider border-color="#353e5c"></mj-divider>
        <mj-text font-weight="bold" font-size="14px" font-style="italic" color="#a5bdea" font-family="helvetica">${
          config.platformName
        } is the next generation of global digital cryptocurrency and asset exchange. </mj-text>
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

const sendInvitationEmail = async (email, token, invitedBy) => {
  const [err, invitedByUser] = await to(
    UserProfile.findOne({ where: { userId: invitedBy } }),
  );

  if (err || !invitedByUser) {
    console.log('Error in finding user that invitation is from him/her'); // eslint-disable-line
  } else {
    sendMail(
      email,
      `[${config.platformName}] ${invitedByUser.firstName} ${
        invitedByUser.lastName
      } invited you to join ${config.platformName} community`,
      htmlOutput(
        `${config.frontEndServer}/register?ref=${token}`,
        invitedByUser,
      ).html,
    );
  }
};

export default sendInvitationEmail;
