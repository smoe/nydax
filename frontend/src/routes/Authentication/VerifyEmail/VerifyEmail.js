import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resendConfirmationEmail } from '../../../actions/authentication';
import s from './VerifyEmail.css';
import themify from '../../../themify';
import logoDark from '../../../../public/logo/dark.png';
import logoLight from '../../../../public/logo/light.png';
import emailVerifyIcon from './verify-your-email.svg';
import Panel from '../../../components/Panel';
/* eslint-disable css-modules/no-undef-class */

class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.resendEmailVerificationLink = this.resendEmailVerificationLink.bind(
      this,
    );
  }

  getLogo() {
    if (this.props.theme === 'light') return logoLight;
    return logoDark;
  }

  resendEmailVerificationLink(email) {
    this.props.resendEmail(email);
  }

  render() {
    return (
      <div className={themify(s, s.verifyEmailMain, this.props.theme)}>
        <div className={s.verifyEmailHeader}>
          <img src={this.getLogo()} alt="innovation exchange platform" />
        </div>
        <div className={s.verifyEmailContainer}>
          <Panel
            theme={this.props.theme}
            style={{ textAlign: 'center', width: 'auto' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div className={s.verifyEmailTitle}>Verify your email</div>
              <img
                className={s.verifyEmailImage}
                alt="email verification"
                src={emailVerifyIcon}
                width={230}
                height={260}
                style={{ marginTop: 30, marginBottom: 10 }}
              />
              <p
                style={{
                  color: '#8997c0',
                  marginTop: 10,
                  marginRight: 20,
                  marginLeft: 20,
                }}
              >
                We sent a verification email to{' '}
                <span style={{ color: '#98a1c0', fontSize: 16 }}>
                  {this.props.email}
                </span>
                , click the link inside to get started!{' '}
              </p>
              <div className={s.divider} />
              <div className={s.panelFooter}>
                <p
                  role="presentation"
                  onClick={() =>
                    this.resendEmailVerificationLink(this.props.email)
                  }
                  style={{
                    color: '#7577ff',
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Email didn’t arrive? Resend
                </p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    );
  }
}

VerifyEmail.propTypes = {
  theme: PropTypes.string,
  email: PropTypes.string,
  resendEmail: PropTypes.func.isRequired,
};

VerifyEmail.defaultProps = {
  theme: 'dark',
  email: 'test@example.net',
};

const mapState = state => ({
  theme: state.theme,
});

const mapDispatch = () => ({
  resendEmail(email) {
    resendConfirmationEmail(email);
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(VerifyEmail));
