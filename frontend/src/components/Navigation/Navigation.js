import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InviteFriends from '../InviteFriends';
import themify from '../../themify';
import s from './Navigation.css';
import Link from '../Link/Link';
import routes from '../../constants/routes';
import C from '../../constants/actions';
/* eslint-disable css-modules/no-undef-class */

class Navigation extends React.Component {
  // handleRoute = newRoute => {
  //   this.props.onRouteChange(newRoute);
  // };

  render() {
    return (
      <div className={themify(s, s.headerNavigation, this.props.theme)}>
        <nav>
          <ul>
            <li
              role="presentation"
              className={
                this.props.currentRoute === routes.DASHBOARD
                  ? s.active
                  : undefined
              }
            >
              <Link to={routes.DASHBOARD}>
                <svg
                  className={s.menuIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>{' '}
                &nbsp; Dashboard
              </Link>
            </li>
            <li
              role="presentation"
              className={
                this.props.currentRoute === routes.TRADING_PLATFORM
                  ? s.active
                  : undefined
              }
            >
              <Link to={routes.TRADING_PLATFORM}>
                <svg
                  className={s.menuIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 15 15"
                >
                  <g fill="none" fillRule="evenodd" stroke="currentColor">
                    <path d="M13.036 9.385H1.975A.975.975 0 0 1 1 8.41V1.975C1 1.436 1.437 1 1.975 1h11.06c.54 0 .975.436.975.975V8.41a.975.975 0 0 1-.974.975z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.638 14.251l4.867-4.866v4.866M12.42 14.251L7.505 9.385M1 5.819h1.638l1.928-1.494 2.217 2.536 1.445-1.669 1.35 1.669 4.432-4.223"
                    />
                  </g>
                </svg>{' '}
                &nbsp; Trading Platform
              </Link>
            </li>
            <li
              role="presentation"
              className={
                this.props.currentRoute === routes.DEPOSIT
                  ? s.active
                  : undefined
              }
            >
              <Link to={routes.DEPOSIT}>
                <svg
                  className={s.menuIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 16"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4.345 8.942H1.54A.544.544 0 0 1 1 8.395V1.547C1 1.245 1.242 1 1.54 1h14.886c.299 0 .54.245.54.547v6.848a.544.544 0 0 1-.54.547h-2.774" />
                    <path d="M4.344 5.983H3V3.929h12v2.054h-1" />
                    <path d="M13.66 3.93v10.444a.544.544 0 0 1-.54.548H4.876a.544.544 0 0 1-.54-.548V3.93M8.979 12.329l.02-6.027" />
                    <path d="M6.379 9l2.617-2.698L11.636 9" />
                  </g>
                </svg>{' '}
                &nbsp; Deposit
              </Link>
            </li>
            <li
              role="presentation"
              className={
                this.props.currentRoute === routes.WITHDRAW
                  ? s.active
                  : undefined
              }
            >
              <Link to={routes.WITHDRAW}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.933 7.781h-2.46c-.261 0-.473-.24-.473-.536V1.536C1 1.24 1.212 1 1.473 1h13.054c.261 0 .473.24.473.536v5.71c0 .295-.212.535-.473.535h-2.433M8 2.651V7" />
                    <path d="M10.316 4.641L8 7 5.664 4.641M4.335 9.13h7.37c.44 0 .295.165.295.37v5.137c0 .205.144.37-.294.37h-7.37c-.44 0-.336-.165-.336-.37V9.5c0-.205-.104-.37.335-.37z" />
                  </g>
                </svg>{' '}
                &nbsp; Withdraw
              </Link>
            </li>
            <li
              role="presentation"
              className={
                this.props.currentRoute === routes.SETTINGS
                  ? s.active
                  : undefined
              }
            >
              <Link to={routes.SETTINGS}>
                <svg
                  className={s.menuIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>{' '}
                &nbsp; Settings
              </Link>
            </li>
            {this.props.isLoggedIn && this.props.verificationStatusId === 4 && (<li // eslint-disable-line
                onClick={() => this.props.showInviteFriendModal()}
              role="button" // eslint-disable-line
                className={s.inviteFriends}
              >
                <a href="javascript:void(0);" //eslint-disable-line
                >
                  <svg
                    className={s.menuIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                  &nbsp; Invite Friends{' '}
                </a>
              </li>
            )}
            {this.props.isLoggedIn && this.props.verificationStatusId === 1 && (<li // eslint-disable-line
                onClick={() => this.props.showGetMoreInvoModal()}
              role="button" // eslint-disable-line
                className={s.inviteFriends}
              >
                <a href="javascript:void(0);" //eslint-disable-line
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-gift"
                  >
                    <polyline points="20 12 20 22 4 22 4 12" />
                    <rect x="2" y="7" width="20" height="5" />
                    <line x1="12" y1="22" x2="12" y2="7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>
                  &nbsp; Get Free Invo{' '}
                </a>
              </li>
            )}
            {this.props.isLoggedIn && (<li // eslint-disable-line
                onClick={() => this.props.showBuyTokenModal()}
              role="button" // eslint-disable-line
                className={s.inviteFriends}
              >
                <a href="javascript:void(0);" //eslint-disable-line
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-shopping-cart"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  &nbsp; Buy token
                </a>
              </li>
            )}
          </ul>
        </nav>
        <InviteFriends />
      </div>
    );
  }
}

Navigation.propTypes = {
  theme: PropTypes.string,
  currentRoute: PropTypes.string,
  showInviteFriendModal: PropTypes.func.isRequired,
  showGetMoreInvoModal: PropTypes.func.isRequired,
  showBuyTokenModal: PropTypes.func.isRequired,
  verificationStatusId: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

Navigation.defaultProps = {
  theme: 'dark',
  currentRoute: '/',
};

const mapState = state => ({
  currentRoute: state.currentRoute,
  theme: state.theme,
  isLoggedIn: state.isLoggedIn,
  verificationStatusId: state.userInfo.profile.verificationStatusId,
});

const mapDispatch = dispatch => ({
  showInviteFriendModal() {
    dispatch({ type: C.TOGGLE_SHOW_INVITE_FRIENDS_MODAL });
  },
  showGetMoreInvoModal() {
    dispatch({ type: C.TOGGLE_SHOW_GET_MORE_INVO_MODAL });
  },
  showBuyTokenModal() {
    dispatch({ type: C.TOGGLE_BUY_TOKEN_MODAL });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Navigation));
