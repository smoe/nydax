import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { WidthoutRedux } from './VerifyAccountModal';
import WizardLevels from './WizardLevels';
import VerificationComplete from './VerificationComplete';
import UploadVerificationFiles from './UploadVerificationFiles';
import PersonalInfoForm from './PersonalInfoForm';
import ChooseVerificationType from './ChooseVerificationType';

const countries = [
  {
    id: 1,
    name: 'Iran',
  },
  {
    id: 2,
    name: 'Germany',
  },
];

storiesOf('VerifyAccountModal', module)
  .add('demo', () => (
    <WidthoutRedux show onSubmit={data => data} countries={countries} />
  ))
  .add('WizardLevels', () => (
    <WizardLevels
      level={select(
        'level',
        ['PersonalInfo', 'chooseVerifyIdentityType', 'uploadFiles', 'complete'],
        '',
      )}
    />
  ))
  .add('VerificationComplete', () => <VerificationComplete isLoading={false} />)
  .add('UploadVerificationFiles', () => (
    <UploadVerificationFiles
      verificationType={select(
        'verificationType',
        ['passport', 'driversLicense', 'identityCard'],
        'passport',
      )}
      handleWizardLevel={(level, data) => level + data}
    />
  ))
  .add('PersonalInfoForm', () => (
    <PersonalInfoForm
      listCountries={countries}
      handleWizardLevel={(level, data) => level + data}
    />
  ))
  .add('ChooseVerificationType', () => <ChooseVerificationType />);
