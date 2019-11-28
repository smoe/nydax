import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Body from '../Body';
import SettingPanel from './SettingPanel';
import profilePic from '../../routes/settings/profile.png';

storiesOf('SettingPanel', module).add('demo', () => (
  <Body>
    <SettingPanel
      image={text('image', profilePic)}
      title={text('title', 'title')}
      description={text('description', 'description')}
      buttonText={text('buttonText', 'Upload')}
    />
  </Body>
));
