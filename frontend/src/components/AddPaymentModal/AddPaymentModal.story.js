import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import AddPaymentModal, { WithoutRedux } from './AddPaymentModal';
import ChoosePaymentMethod from './ChoosePaymentMethod';
import PaypalPaymentForm from './PaypalPaymentForm';

storiesOf('AddPaymentModal', module)
  .add('without redux', () => (
    <WithoutRedux show={boolean('show', true)} showToggle={() => {}} />
  ))
  .add('with redux', () => <AddPaymentModal />)
  .add('ChoosePaymentMethod', () => (
    <ChoosePaymentMethod selectPaymentMethod={type => type} />
  ))
  .add('PaypalPaymentForm', () => <PaypalPaymentForm />);
