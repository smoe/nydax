import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import config from '../../config';
import { numberFormat } from '../../utils';
import C from '../../constants/actions';
import s from './WalletList.css';
import themify from '../../themify';
import tick from './tick.svg';
import Panel from '../Panel';
/* eslint-disable css-modules/no-undef-class */

class WalletList extends React.Component {
  constructor(props) {
    super(props);

    this.onSelectWallet = this.onSelectWallet.bind(this);
  }

  onSelectWallet(tokenId) {
    this.props.onSelect(tokenId);
  }

  render() {
    const getBalance = tokenId => {
      const wallet = this.props.wallets.find(item => item.tokenId === tokenId);
      return wallet ? wallet.balance : 0;
    };
    return (
      <Panel
        theme={this.props.theme}
        hasHeader
        headerTitle={this.props.headerTitle}
        style={{ height: 'inherit' }}
      >
        <div
          style={{
            height: this.props.height,
          }}
        >
          <table className={themify(s, s.listOfTokens, this.props.theme)}>
            <thead>
              <tr>
                <th style={{ paddingLeft: 50 }}>Token</th>
                <th
                  colSpan={2}
                  style={{ paddingRight: 80, textAlign: 'right' }}
                >
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.tokens &&
                this.props.tokens
                  .filter(item => item.enabled)
                  .map(item => (
                    <tr
                      key={item.id}
                      onClick={() => this.onSelectWallet(item.id)}
                      className={
                        item.id === this.props.selectedTokenId ? s.selected : ''
                      }
                    >
                      <td>
                        <div className={s.tokenNameAndLogo}>
                          <img
                            height={34}
                            width={34}
                            src={`${config.api.serverUrl}/${item.logoUrl}`}
                            alt="token logo"
                          />
                          <span>{item.symbol}</span>
                        </div>
                      </td>
                      <td style={{ paddingRight: 50, textAlign: 'right' }}>
                        <span style={{ position: 'relative' }}>
                          <p className={s.walletBalance}>
                            {numberFormat(getBalance(item.id), 8)}
                          </p>
                          {item.id === this.props.selectedTokenId ? (
                            <img
                              src={tick}
                              className={s.tickIcon}
                              alt="is selected"
                            />
                          ) : null}
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </Panel>
    );
  }
}

WalletList.propTypes = {
  theme: PropTypes.string,
  height: PropTypes.any,// eslint-disable-line
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  wallets: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTokenId: PropTypes.number.isRequired,
  onSelect: PropTypes.func,
  headerTitle: PropTypes.string.isRequired,
};

WalletList.defaultProps = {
  theme: 'dark',
  height: 'auto',
  onSelect: item => item,
};

const mapState = state => ({
  tokens: state.tokens,
  wallets: state.userInfo.wallets,
  selectedTokenId: state.selectedTokenId,
  theme: state.theme,
});

const mapDispatch = dispatch => ({
  onSelect(tokenId) {
    dispatch({ type: C.SET_SELECTED_TOKEN_ID, payload: tokenId });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(WalletList));
