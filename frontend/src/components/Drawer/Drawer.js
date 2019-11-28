/* eslint-disable css-modules/no-undef-class */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import cx from 'classnames';
import s from './Drawer.css';
import Link from '../Link';
import routes from '../../constants/routes';
import themify from '../../themify';

class Drawer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          className={
            this.props.show ? cx(s.sidebarOverlay, s.active) : s.sidebarOverlay
          }
        />
        <nav
          className={
            this.props.show
              ? cx(themify(s, s.sidebarDrawer, this.props.theme), s.active)
              : themify(s, s.sidebarDrawer, this.props.theme)
          }
        >
          <div
            role="presentation"
            onClick={this.props.onHide}
            className={s.dismiss}
          >
            <i className="fa fa-arrow-left" />
          </div>
          <br />
          <br />
          {/* 
          <div className="sidebarHeader">
            <h3>Sidebar</h3>
          </div> */}

          <ul className={s.menu}>
            <li
              className={
                this.props.currentRoute === routes.DASHBOARD
                  ? cx(s.menuItem, s.active)
                  : s.menuItem
              }
            >
              <Link to={routes.DASHBOARD}>
                <svg
                  className={s.menuIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
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
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>
            <li
              className={
                this.props.currentRoute === routes.TRADING_PLATFORM
                  ? cx(s.menuItem, s.active)
                  : s.menuItem
              }
            >
              <Link to={routes.TRADING_PLATFORM}>
                <svg
                  style={{ marginLeft: 13 }}
                  className={s.menuIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
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
                <span>Trading Platform</span>
              </Link>
            </li>
            <li
              className={
                this.props.currentRoute === routes.DEPOSIT
                  ? cx(s.menuItem, s.active)
                  : s.menuItem
              }
            >
              <Link to={routes.DEPOSIT}>
                <svg
                  style={{ marginLeft: 15 }}
                  className={s.menuIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
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
                <span>Deposit</span>
              </Link>
            </li>
            <li
              className={
                this.props.currentRoute === routes.WITHDRAW
                  ? cx(s.menuItem, s.active)
                  : s.menuItem
              }
            >
              <Link to={routes.WITHDRAW}>
                <svg
                  style={{ marginLeft: 15 }}
                  className={s.menuIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
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
                <span>Withdraw</span>
              </Link>
            </li>
            <li
              className={
                this.props.currentRoute === routes.SETTINGS
                  ? cx(s.menuItem, s.active)
                  : s.menuItem
              }
            >
              <Link to={routes.SETTINGS}>
                <svg
                  style={{ marginLeft: 13 }}
                  className={s.menuIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
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
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

Drawer.propTypes = {
  show: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  onHide: PropTypes.func,
  currentRoute: PropTypes.string,
  theme: PropTypes.string,
};

Drawer.defaultProps = {
  show: false,
  onHide: () => false,
  currentRoute: '/',
  theme: 'dark',
};

const mapState = state => ({
  currentRoute: state.currentRoute,
  theme: state.theme,
});

export default connect(
  mapState,
  undefined,
)(withStyles(s)(Drawer));
