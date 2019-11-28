import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import BuyTokenModal, { WithoutRedux } from './BuyTokenModal';
import ChoosePaymentMethod from './ChoosePaymentMethod';
import PaypalPaymentForm from './PaypalPaymentForm';

const tokens = [{ id: 1, symbol: 'INVO' }, { id: 2, symbol: 'TRZ' }];

storiesOf('BuyTokenModal', module)
  .add('without redux', () => (
    <WithoutRedux
      tokens={tokens}
      show={boolean('show', true)}
      showToggle={() => {}}
    />
  ))
  .add('with redux', () => <BuyTokenModal />)
  .add('ChoosePaymentMethod', () => (
    <ChoosePaymentMethod selectPaymentMethod={type => type} />
  ))
  .add('PaypalPaymentForm', () => <PaypalPaymentForm />);
