import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import AboutUs from './AboutUs';

const sampleProps = {
  theme: 'dark',
  description: `Our vision is a world where intelligent machines work hand-in-hand with people to advance the collective intelligence of the human species and bring about positive social and economic impacts.
  We’re an early leader in using deep learning and deep reinforcement learning to solve language-understanding problems and in training machines to model decision-making capabilities of the human brain.
  Maluuba is backed by an accomplished team of leading investors and some of the most respected researchers in the fields of artificial intelligence and deep learning. We partner with the world’s largest organizations in communications, customer experience, technology, automotive and professional services.`,
  location: 'Waterloo, Ontario, Canada',
  founders: 'G Wu, Joshua Pantony, Kaheer Suleman, Sam Pasupalak',
  dateFounded: 'Aug 18, 2011',
  website: 'www.maluuba.com',
  facebook: 'http://www.facebook.com',
  linkedin: 'http://www.linkedin.com',
  twitter: 'http://www.twitter.com',
  contactEmail: 'Contact@maluuba.com',
  phoneNumber: '(461)849-566',
};

storiesOf('Startup info', module).add('About us', () => (
  <AboutUs
    theme={text('theme', sampleProps.theme)}
    description={text('url', sampleProps.description)}
    location={text('url', sampleProps.location)}
    founders={text('url', sampleProps.founders)}
    dateFounded={text('url', sampleProps.dateFounded)}
    website={text('url', sampleProps.website)}
    facebook={text('url', sampleProps.facebook)}
    linkedin={text('url', sampleProps.linkedin)}
    twitter={text('url', sampleProps.twitter)}
    contactEmail={text('url', sampleProps.contactEmail)}
    phoneNumber={text('url', sampleProps.phoneNumber)}
  />
));
