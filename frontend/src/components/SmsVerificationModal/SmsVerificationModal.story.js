import React from 'react';
import { storiesOf } from '@storybook/react';
import SmsVerificationModal, { WithoutRedux } from './SmsVerificationModal';

const countries = [
  {
    name: 'Iran',
    phoneCode: '0098',
  },
  {
    name: 'Australia',
    phoneCode: '061',
  },
];

storiesOf('SmsVerificationModal', module)
  .add('without redux', () => (
    <WithoutRedux
      show
      smsEnabled={false}
      countries={countries}
      enableSendSms={(phoneNumber, countryCode) => countryCode + phoneNumber}
      verifySmsToken={(phoneNumber, token) => phoneNumber + token}
    />
  ))
  .add('with redux', () => <SmsVerificationModal />);
