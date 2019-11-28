import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import VideoPlayer from './VideoPlayer';

const sampleProps = {
  theme: 'dark',
  url: 'https://www.youtube.com/watch?v=Ci3PoUjtBOE',
  height: '500px',
};

storiesOf('Startup info', module).add('Video Player', () => (
  <VideoPlayer
    theme={text('theme', sampleProps.theme)}
    url={text('url', sampleProps.url)}
    height={text('height', sampleProps.height)}
  />
));
