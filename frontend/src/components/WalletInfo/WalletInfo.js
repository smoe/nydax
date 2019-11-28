import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import themify from '../../themify';
import s from './WalletInfo.css';
import Panel from '../Panel';
import config from '../../config';
import { numberFormat } from '../../utils';
/* eslint-disable css-modules/no-undef-class */

class WalletInfo extends React.Component {
  render() {
    const wallet = this.props.wallets.find(
      item => item.tokenId === this.props.selectedTokenId,
    );
    const token = this.props.tokens.find(
      item => item.id === this.props.selectedTokenId,
    );
    return (
      <Panel
        theme={this.props.theme}
        style={{ height: 'inherit' }}
        hasHeader
        headerTitle="Information"
      >
        <div
          className={themify(s, s.root, this.props.theme)}
          style={{ height: this.props.height }}
        >
          {!wallet ? (
            <div className={s.tokenNotSelected}>
              <p>Pick a Wallet you would like to show info</p>
            </div>
          ) : (
            <div>
              <div className={s.tokenInformation}>
                <img
                  alt="logo url"
                  className={s.tokenIcon}
                  src={`${config.api.serverUrl}/${token.logoUrl}`}
                  height={50}
                  width={50}
                />
                <div>
                  <p className={s.title}>Balance</p>
                  <p className={s.value}>
                    {numberFormat(wallet.balance, 4)} {token.symbol}
                  </p>
                </div>
              </div>
              <div className={s.divider} />
              <ul style={{ color: '#8997c0', padding: 20 }}>
                {this.props.messages.map(message => (
                  <li key={message} style={{ marginLeft: 20 }}>
                    {message}
                  </li>
                ))}
              </ul>
              <div className={s.divider} />
              {this.props.children}
            </div>
          )}
        </div>
      </Panel>
    );
  }
}

WalletInfo.propTypes = {
  theme: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  wallets: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTokenId: PropTypes.number.isRequired,
  height: PropTypes.string,
  children: PropTypes.node.isRequired,
};

WalletInfo.defaultProps = {
  theme: 'dark',
  height: 'auto',
};

const mapState = state => ({
  wallets: state.userInfo.wallets,
  tokens: state.tokens,
  selectedTokenId: state.selectedTokenId,
  theme: state.theme,
});

export default connect(mapState)(withStyles(s)(WalletInfo));
