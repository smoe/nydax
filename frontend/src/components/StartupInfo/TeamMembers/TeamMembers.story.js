import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import teamMemberPic from '../../../../public/reza.jpg';
import TeamMembers from './TeamMembers';

const sampleProps = {
  theme: 'dark',
  description: `Maluuba has 8 current team members, including Co-Founder & CEO Sam Pasupalak.`,
  teamMembers: [
    {
      picture: teamMemberPic,
      name: 'Sam\u00a0Pasupalak',
      position: 'Founder\u00a0&\u00a0CEO',
    },
    { picture: teamMemberPic, name: 'Gerry\u00a0Beard', position: 'CFO' },
    { picture: teamMemberPic, name: 'Gerry\u00a0Beard', position: 'CFO' },
  ],
};

storiesOf('Startup info', module).add('TeamMembers', () => (
  <TeamMembers
    theme={text('theme', sampleProps.theme)}
    description={text('url', sampleProps.description)}
    teamMembers={sampleProps.teamMembers}
  />
));
