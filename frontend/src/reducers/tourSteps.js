/* eslint-disable react/no-unknown-property */
import React from 'react';

const steps = {
  dashboard: [
    {
      target: '[data-tut="trade"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;<p style={{ margin: 0 }}> You can buy or sell tokens here.</p>
        </div>
      ),
      placement: 'left-start',
      disableBeacon: true,
    },
    {
      target: '[data-tut="tradingView"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'right',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;<p style={{ margin: 0 }}> Price history of selected token.</p>
        </div>
      ),
      placement: 'right-start',
      disableBeacon: true,
    },
    {
      target: '[data-tut="pairList"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;
          <p style={{ margin: 0 }}>
            {' '}
            List of tokens with more details. You can select them to do buy or
            sell.
          </p>
        </div>
      ),
      offset: -70,
      placement: 'bottom-start',
      disableBeacon: true,
    },
  ],
  tradingPlatform: [
    {
      target: '[data-tut="userInfo"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;
          <p style={{ margin: 0 }}>
            {' '}
            Here, you can see status of your orders and history of trades and
            status of wallets.
          </p>
        </div>
      ),
      placement: 'right-end',
      disableBeacon: true,
    },
    {
      target: '[data-tut="orderBook"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;<p style={{ margin: 0 }}> Open orders of market.</p>
        </div>
      ),
      placement: 'left-start',
      disableBeacon: true,
    },
    {
      target: '[data-tut="pairList"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;
          <p style={{ margin: 0 }}>
            {' '}
            List of tokens for buy or sell. you can select them and do buy or
            sell.
          </p>
        </div>
      ),
      placement: 'right-start',
      disableBeacon: true,
    },
    {
      target: '[data-tut="tradingView"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;<p style={{ margin: 0 }}> Stock charts.</p>
        </div>
      ),
      placement: 'left-end',
      disableBeacon: true,
    },
    {
      target: '[data-tut="trade"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;<p style={{ margin: 0 }}> You can place order here.</p>
        </div>
      ),
      placement: 'left-start',
      disableBeacon: true,
    },
  ],
  deposit: [
    {
      target: '[data-tut="walletList"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;<p style={{ margin: 0 }}> List of Wallets.</p>
        </div>
      ),
      placement: 'right-start',
      disableBeacon: true,
    },
    {
      target: '[data-tut="walletInfo"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;<p style={{ margin: 0 }}> Selected wallet information.</p>
        </div>
      ),
      placement: 'left-start',
      disableBeacon: true,
    },
    {
      target: '[data-tut="depositHistory"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;
          <p style={{ margin: 0 }}> History of your deposits on all wallets.</p>
        </div>
      ),
      offset: -70,
      placement: 'bottom-end',
      disableBeacon: true,
    },
  ],
  withdraw: [
    {
      target: '[data-tut="walletList"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;<p style={{ margin: 0 }}> List of wallets.</p>
        </div>
      ),
      placement: 'right-start',
      disableBeacon: true,
    },
    {
      target: '[data-tut="walletInfo"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;<p style={{ margin: 0 }}> Selected wallet information.</p>
        </div>
      ),
      placement: 'left-start',
      disableBeacon: true,
    },
    {
      target: '[data-tut="withdrawHistory"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;<p style={{ margin: 0 }}> Withdraw history information.</p>
        </div>
      ),
      offset: -50,
      placement: 'bottom-end',
      disableBeacon: true,
    },
  ],
  settings: [
    {
      target: '[data-tut="changeProfilePic"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;
          <p style={{ margin: 0 }}> Here, you can change profile picture.</p>
        </div>
      ),
      placement: 'left-start',
      disableBeacon: true,
    },
    {
      target: '[data-tut="changePassword"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;
          <p style={{ margin: 0 }}>
            {' '}
            You can reset your password by this component.
          </p>
        </div>
      ),
      placement: 'right-start',
      disableBeacon: true,
    },
    {
      target: '[data-tut="changeTimeZone"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;
          <p style={{ margin: 0 }}>
            {' '}
            You can change default timezone of whole project here.
          </p>
        </div>
      ),
      placement: 'top-start',
      disableBeacon: true,
    },
    {
      target: '[data-tut="changeCurrency"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />& nbsp;{' '}
          <p style={{ margin: 0 }}>
            You can select your default currency to convert prices.
          </p>
        </div>
      ),
      placement: 'top-end',
      disableBeacon: true,
    },
    {
      target: '[data-tut="verifyYourIdentity"]',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <span class="fas fa fa-info-circle fa-2x" />
          &nbsp;
          <p style={{ margin: 0 }}>
            For working completely with our platform we need to verify your
            identity you can do this here.
          </p>
        </div>
      ),
      placement: 'top-start',
      disableBeacon: true,
    },
  ],
};
export default function tourSteps() {
  return steps;
}
