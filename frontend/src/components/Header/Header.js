import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isMobile } from 'react-device-detect';
import {
  // faBell,
  // faCircle,
  faArrowDown,
  faArrowUp,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { Dropdown, MenuItem, ButtonGroup, Button } from 'react-bootstrap';
import cx from 'classnames';
import routes from '../../constants/routes';
// import history from '../../history';
import { revokeAuthToken } from '../../actions/user';
import themify from '../../themify';
import logoDark from '../../../public/logo/dark.png';
import s from './Header.css';
import defaultProfile from './user.png';
import Navigation from '../Navigation';
import { numberFormat, relu } from '../../utils';
// import moonIcon from './moon.svg';
// import sunIcon from './sun.svg';
import C from '../../constants/actions';
import Drawer from '../Drawer';
import predefinedLayouts from './predefinedLayouts';
/* eslint-disable css-modules/no-undef-class */

const btcTokenId = 2;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: false,
      showNavigation: props.showNav,
    };

    this.changeLayout = this.changeLayout.bind(this);
  }

  changeLayout = layoutIndex => {
    this.props.changeLayout(predefinedLayouts[layoutIndex]);
  };

  render() {
    const selectedPair = this.props.pairs.find(
      item => item.id === this.props.selectedPairId,
    );

    const baseCurrency = this.props.currencies.find(
      item => item.id === this.props.baseCurrencyId,
    );

    const btcUsdPrice = this.props.tokens.find(item => item.symbol === 'BTC')
      .usdPrice;

    const accountValues = isReserved =>
      this.props.wallets.map(wallet => {
        const lastPrice = this.props.pairs.find(
          pair =>
            pair.baseTokenId === wallet.tokenId &&
            pair.quoteTokenId === btcTokenId,
        )
          ? this.props.pairs.find(
              pair =>
                pair.baseTokenId === wallet.tokenId &&
                pair.quoteTokenId === btcTokenId,
            ).lastPrice
          : '1';

        return isReserved === false
          ? relu(wallet.balance) *
              parseFloat(String(lastPrice).replace(/,/g, '')) *
              Number(btcUsdPrice) *
              Number(baseCurrency.usdRatio)
          : relu(wallet.reservedBalance) *
              parseFloat(String(lastPrice).replace(/,/g, '')) *
              Number(btcUsdPrice) *
              Number(baseCurrency.usdRatio);
      });

    const overAllAccountValue = accountValues(false).reduce((a, b) => a + b, 0);
    const overAllReservedValue = accountValues(true).reduce((a, b) => a + b, 0);

    return (
      <React.Fragment>
        <Drawer
          show={this.state.showDrawer}
          onHide={() => {
            this.setState({ showDrawer: false });
          }}
        />
        <header className={s.appHeader}>
          <div className={themify(s, s.headerTop, this.props.theme)}>
            <div className={s.brand}>
              <div
                role="presentation"
                onClick={() => {
                  this.setState({ showDrawer: true });
                }}
              >
                <FontAwesomeIcon icon={faBars} className={s.drawerIcon} />
              </div>
              <div>
                <a href={routes.DASHBOARD}>
                  <img className={s.logo} src={logoDark} alt="Logo" />
                </a>
              </div>
              {this.props.showAdvancedHeader && (
                <div className={s.verticalDivider} />
              )}
              {this.props.isLoggedIn && (
                <div className={s.headerInfo}>
                  <span className={s.title}>Balance</span>
                  <span className={s.value}>
                    {`${numberFormat(overAllAccountValue, 4)} ${
                      baseCurrency.abbreviation
                    }`}
                  </span>
                </div>
              )}
              {this.props.isLoggedIn && (
                <div className={s.headerInfo}>
                  <span className={s.title}>Reserved balance</span>
                  <span className={s.value}>
                    {`${numberFormat(overAllReservedValue, 4)} ${
                      baseCurrency.abbreviation
                    }`}
                  </span>
                </div>
              )}
              {this.props.showAdvancedHeader && (
                <div className={s.verticalDivider} />
              )}
              {this.props.showAdvancedHeader && (
                // <div>
                <div
                  className={cx(s.headerInfo, s.changeLayout)}
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <span className={s.title}>Change layout</span>
                  <span className={s.value}>
                    <ButtonGroup bsSize="xs">
                      <Button onClick={() => this.changeLayout(0)}>1</Button>
                      <Button onClick={() => this.changeLayout(1)}>2</Button>
                      <Button onClick={() => this.changeLayout(2)}>3</Button>
                      <Button onClick={() => this.changeLayout(3)}>4</Button>
                      <Button
                        bsSize="xs"
                        onClick={() => this.props.toggleGridLock()}
                      >
                        {this.props.gridIsLocked ? (
                          <i className="fa fa-lock" />
                        ) : (
                          <i className="fa fa-lock-open" />
                        )}
                      </Button>
                    </ButtonGroup>
                  </span>
                </div>
              )}
              {this.props.showAdvancedHeader && (
                <div className={s.verticalDivider} />
              )}
              {this.props.showAdvancedHeader && (
                <div className={cx(s.verticalDivider, s.changeLayout)} />
              )}
            </div>
            <div className={s.advancedheaderInfo}>
              {this.props.showAdvancedHeader && (
                <React.Fragment>
                  <div className={s.headerInfo}>
                    <span className={s.title}>24 Hour volume</span>
                    <span className={s.value}>
                      {`${numberFormat(
                        selectedPair.vol24,
                        selectedPair.priceDecimals,
                      )} ${selectedPair.name.split('/')[1]}`}
                    </span>
                  </div>
                  <div className={s.headerInfo}>
                    <span className={s.title}>24 Hour change</span>
                    <span
                      className={cx(
                        s.value,
                        selectedPair.change24Price < 0 ? s.red : s.green,
                      )}
                    >
                      {`${selectedPair.change24Percentage}%`}
                    </span>
                  </div>
                  <div className={s.headerInfo}>
                    <span className={s.title}>Last price</span>
                    <span className={s.value}>
                      {numberFormat(
                        selectedPair.lastPrice,
                        selectedPair.priceDecimals,
                      )}{' '}
                      {selectedPair.name.split('/')[1]}
                    </span>
                  </div>
                  <div className={s.verticalDivider} />
                  <div className={s.headerInfo}>
                    <span className={s.title}>Market</span>
                    <span className={s.value}>{selectedPair.name}</span>
                  </div>
                  <div className={s.verticalDivider} />
                </React.Fragment>
              )}
              <div className={s.dropdowns}>
                {/* {!this.props.showAdvancedHeader && this.props.isLoggedIn && (
                  <div className={s.notificationsDropdown}>
                    <FontAwesomeIcon
                      icon={faBell}
                      size="1x"
                      className={s.bellIcon}
                    />
                    <FontAwesomeIcon
                      icon={faCircle}
                      size="1x"
                      className={s.notifBadge}
                    />
                  </div>
                )} */}
                {/* <div // eslint-disable-line
                  className={s.themeIconContainer}
                  onClick={() => this.props.setTheme()}
                >
                  {this.props.theme === 'light' ? (
                    <span>
                      <img src={moonIcon} height={15} width={15} alt="moon" />
                    </span>
                  ) : (
                    <span>
                      <img src={sunIcon} height={15} width={15} alt="sun" />
                    </span>
                  )}
                </div> */}
                <Dropdown
                  id="dropdownCustom"
                  pullRight
                  className={s.profileDropdown}
                >
                  <Dropdown.Toggle noCaret>
                    <img
                      className={s.userProfile}
                      src={
                        this.props.userProfile.profilePicUrl || defaultProfile
                      }
                      alt="user profile"
                    />
                  </Dropdown.Toggle>
                  {this.props.isLoggedIn ? (
                    <Dropdown.Menu>
                      <MenuItem eventKey="1" disabled>
                        <i className="fa fa-user" /> &nbsp;
                        {`${this.props.userProfile.firstName} ${
                          this.props.userProfile.lastName
                        }`}
                      </MenuItem>
                      <MenuItem
                        eventKey="2"
                        onClick={() => {
                          window.location.href = routes.SETTINGS;
                        }}
                      >
                        <i className="fa fa-cog" /> &nbsp;Settings
                      </MenuItem>
                      <MenuItem
                        eventKey="3"
                        onClick={() => {
                          window.location.href = routes.SUPPORT;
                        }}
                      >
                        <i className="fa fa-question-circle" /> &nbsp;Support
                      </MenuItem>
                      <MenuItem
                        eventKey="4"
                        onClick={() => {
                          this.props.revokeAuthToken();
                          window.location.href = routes.LOGIN;
                        }}
                      >
                        <i className="fa fa-sign-out-alt" /> &nbsp;Logout
                      </MenuItem>
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu>
                      <MenuItem
                        eventKey="1"
                        onClick={() => {
                          window.location.href = routes.LOGIN;
                        }}
                      >
                        Login
                      </MenuItem>
                      <MenuItem
                        eventKey="2"
                        onClick={() => {
                          window.location.href = routes.REGISTER;
                        }}
                      >
                        Register
                      </MenuItem>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </div>
              {this.props.showAdvancedHeader && (
                <div
                  className={s.verticalDivider}
                  style={{ display: 'initial' }}
                />
              )}
              {this.props.showAdvancedHeader && !isMobile && (
                <div // eslint-disable-line
                  style={{
                    marginRight: 10,
                    marginLeft: 10,
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    this.setState({
                      showNavigation: !this.state.showNavigation,
                    })
                  }
                >
                  <FontAwesomeIcon
                    icon={this.state.showNavigation ? faArrowUp : faArrowDown}
                  />{' '}
                  <span>
                    {this.state.showNavigation
                      ? 'Hide Navigation'
                      : 'Show Navigation'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className={themify(s, s.divider, this.props.theme)} />
        {this.state.showNavigation && <Navigation />}
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  theme: PropTypes.string,
  userProfile: PropTypes.object, // eslint-disable-line
  gridIsLocked: PropTypes.bool.isRequired,
  showAdvancedHeader: PropTypes.bool,
  pairs: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line
  selectedPairId: PropTypes.number, // eslint-disable-line
  revokeAuthToken: PropTypes.func.isRequired,
  toggleGridLock: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  wallets: PropTypes.arrayOf(PropTypes.object).isRequired,
  baseCurrencyId: PropTypes.number.isRequired,
  showNav: PropTypes.bool,
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  // setTheme: PropTypes.func.isRequired,
  changeLayout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  theme: 'dark',
  showAdvancedHeader: true,
  showNav: false,
  isLoggedIn: true,
};

const mapState = state => ({
  userProfile: state.userInfo.profile,
  gridIsLocked: state.tradingPlatformGridIsLocked,
  pairs: state.pairs,
  selectedPairId:
    state.pairs.length >= state.selectedPairId ? state.selectedPairId : 1,
  isLoggedIn: state.isLoggedIn,
  currencies: state.currencies,
  baseCurrencyId: state.userInfo.profile.baseCurrencyId || 1,
  wallets: state.userInfo.wallets,
  tokens: state.tokens,
  theme: state.theme,
});

const mapDispatch = dispatch => ({
  revokeAuthToken() {
    dispatch(revokeAuthToken(false));
  },
  // setTheme() {
  //   dispatch({ type: C.SET_THEME });
  // },
  changeLayout(tradingPlatformLayout) {
    dispatch({
      type: C.CHANGE_TRADING_PLATFORM_LAYOUT,
      tradingPlatformLayout,
    });
  },
  toggleGridLock() {
    dispatch({
      type: C.TOGGLE_TRADING_PLATFORM_IS_LOCKED,
    });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Header));
