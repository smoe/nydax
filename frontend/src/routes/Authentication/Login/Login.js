import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import {
  FormGroup,
  FormControl,
  Col,
  Row,
  Button,
  InputGroup,
  Checkbox,
} from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import FieldError from '../../../components/FieldError/FieldError';
import { validateEmail, validatePassword } from '../../../validation';
import routes from '../../../constants/routes';
import s from './Login.css';
import TFAIcon from './MFA.svg';
import themify from '../../../themify';
import config from '../../../config';
import logoDark from '../../../../public/logo/dark.png';
import logoLight from '../../../../public/logo/light.png';
import { successes, titles, errors } from '../../../constants/messages';
import C from '../../../constants/actions';
import Panel from '../../../components/Panel';
/* eslint-disable css-modules/no-undef-class */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      SMSToken: '',
      showWarnings: false,
      antiPhishingChecked: false,
      submitting: false,
      basicLoginPassed: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAuthenticatorToken = this.handleAuthenticatorToken.bind(this);
    this.handleSmsValidation = this.handleSmsValidation.bind(this);
    this.handleMultiFactorAuth = this.handleMultiFactorAuth.bind(this);
    this.login = this.login.bind(this);
    this.reCaptchaRef = React.createRef();
  }

  componentDidMount() {
    // if (this.props.isLoggedIn) window.location.href = routes.DASHBOARD;
    if (this.props.emailConfirmed === 1)
      setTimeout(() => {
        toastr.success(
          titles.EMAIL_CONFIRMATION,
          successes.EMAIL_CONFIRMATION_DESCRIPTION,
        );
      }, 500);
    else if (this.props.emailConfirmed === 0)
      setTimeout(() => {
        toastr.error(titles.EMAIL_CONFIRMATION, errors.EMAIL_NOT_CONFIRMED);
      }, 500);
    else if (this.props.passwordReset)
      setTimeout(() => {
        toastr.success(
          titles.RESET_PASSWORD,
          successes.RESET_PASSWORD_DESCRIPTION,
        );
      }, 500);
  }

  getLogo() {
    if (this.props.theme === 'light') return logoLight;
    return logoDark;
  }

  login({ email, password, smsToken, twoFAToken, captchaValue, returnTo }) {
    this.setState({ submitting: true });
    axios
      .post(
        `${config.api.serverUrl}/v1/auth/login`,
        {
          email,
          password,
          smsToken,
          twoFAToken,
          captchaValue,
        },
        {
          headers: {
            Authorization: this.props.authToken,
            [config.apiKeyHeader]: config.apiKey,
          },
        },
      )
      .then(res => {
        if (res.data.token) {
          this.props.setAuthToken(res.data.token);
          localStorage.setItem('authToken', res.data.token);
          // history.push(routes.DASHBOARD);
          if (returnTo) {
            window.location.href = returnTo;
          } else {
            window.location.href = routes.DASHBOARD;
          }
        } else if (res.data.smsEnabled) {
          this.setState({ submitting: false, basicLoginPassed: true });
          this.props.setSmsAuth(res.data.smsEnabled);
        } else if (res.data.twoFactorAuthEnabled) {
          this.setState({ submitting: false, basicLoginPassed: true });
          this.props.set2FaAuth(res.data.twoFactorAuthEnabled);
        }
      })
      .catch(err => {
        this.setState({ submitting: false });
        if (err.message === 'Network Error') {
          toastr.error(titles.CONNECTION_ERROR, errors.SERVER_CONNECTION_LOST);
        } else if (err.response && err.response.data.error) {
          toastr.error(
            err.response.data.error.title,
            err.response.data.error.description,
          );
        }
      });
  }

  handleSubmit(captchaValue) {
    // if (captchaValue) {
    this.setState({ showWarnings: true });
    const formHasError = !(
      validateEmail(this.state.email).length === 0 &&
      validatePassword(this.state.password, true).length === 0
    );
    if (formHasError) {
      return;
    }

    this.login({
      email: this.state.email,
      password: this.state.password,
      captchaValue,
      returnTo: this.props.returnTo,
    });
    // reset recaptcha value
    this.reCaptchaRef.current.reset();
    // }
  }

  handleAuthenticatorToken() {
    if (!this.state.token) {
      toastr.error('ValidationError!', 'Please enter a valid token.');
      this.setState({ submitting: false });
      return;
    }
    this.login({
      email: this.state.email,
      password: this.state.password,
      twoFAToken: this.state.token,
      returnTo: this.props.returnTo,
    });
  }

  handleSmsValidation() {
    if (!this.state.SMSToken) {
      toastr.error('Login Error', 'Please enter a valid token.');
      this.setState({ submitting: false });
      return;
    }
    this.login({
      email: this.state.email,
      password: this.state.password,
      smsToken: this.state.SMSToken,
      returnTo: this.props.returnTo,
    });
  }

  handleMultiFactorAuth() {
    if (this.props.isSmsVerificationEnable && this.state.basicLoginPassed) {
      return (
        <div className={s.towFA}>
          <div className={s.loginTitle}>2-Step Verification</div>
          <br />
          <span className={s.description}>
            Enter the verification code sent to your phone.
          </span>
          <br />
          <div className={s.enterToken}>
            <img alt="sms verification" src={TFAIcon} />
            &nbsp;
            <FormGroup
              controlId="SMSToken"
              className={s.customInput}
              style={{ width: '60%', margin: 'auto', marginTop: 15 }}
            >
              <FormControl
                value={this.state.SMSToken}
                onChange={e => this.setState({ SMSToken: e.target.value })}
                type="text"
                name="SMSToken"
                placeholder="enter token"
              />
            </FormGroup>
          </div>
          <br />
          <Button
            disabled={this.state.submitting}
            onClick={() => {
              this.handleSmsValidation();
            }}
            className={s.customBtn}
          >
            {this.state.submitting ? (
              <span>Verifying ...</span>
            ) : (
              <span>Verify</span>
            )}
          </Button>
          <br />
          <br />
        </div>
      );
    } else if (this.props.isTwoFAEnable && this.state.basicLoginPassed) {
      return (
        <div className={s.twoFA}>
          <div className={s.loginTitle}>Google Authentication</div>
          <br />
          <span className={s.description}>
            Enter the generated token for IXP from the Google Authenticator.
          </span>
          <br />
          <div className={s.enterToken}>
            <img alt="google authenticator" src={TFAIcon} />
            &nbsp;
            <FormGroup
              controlId="SMSToken"
              className={s.customInput}
              style={{ width: '60%', marginTop: 15 }}
            >
              <FormControl
                value={this.state.token}
                onChange={e => {
                  this.setState({ token: e.target.value }, () => {
                    if (this.state.token.length === 6)
                      this.handleAuthenticatorToken();
                  });
                }}
                type="text"
                name="token"
                placeholder="enter token"
              />
            </FormGroup>
          </div>
          <br />
          <Button
            disabled={this.state.submitting}
            onClick={() => {
              this.handleAuthenticatorToken();
            }}
            className={s.customBtn}
          >
            {this.state.submitting ? (
              <span>Verifying ...</span>
            ) : (
              <span>Verify</span>
            )}
          </Button>
          <br />
          <br />
        </div>
      );
    }
    return (
      <div>
        <div className={s.loginTitle}>Login to your account</div>
        <form className={s.regForm}>
          <Row>
            <Col xs={12}>
              <FormGroup
                controlId="email"
                className={s.customInput}
                validationState={this.state.emailValidation || 'error'}
              >
                <InputGroup>
                  <InputGroup.Addon className={s.inputIcon}>
                    <i className="fa fa-envelope" />
                  </InputGroup.Addon>
                  <FormControl
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </InputGroup>
                <FieldError
                  error={validateEmail(this.state.email)}
                  show={this.state.showWarnings}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup
                controlId="password"
                className={s.customInput}
                validationState={this.state.passwordValidation || 'error'}
              >
                <InputGroup>
                  <InputGroup.Addon className={s.inputIcon}>
                    <i className="fa fa-lock" />
                  </InputGroup.Addon>
                  <FormControl
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </InputGroup>
                <FieldError
                  error={validatePassword(this.state.password, true)}
                  show={this.state.showWarnings}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Checkbox
                checked={this.state.antiPhishingChecked}
                onChange={e =>
                  this.setState({
                    antiPhishingChecked: e.target.checked,
                  })
                }
                className={s.antiPhishingCheck}
              >
                <div className={s.antiPhisingMessage}>
                  Please check that you are visiting <b>{config.host}</b>
                </div>
              </Checkbox>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ReCAPTCHA
                size="invisible"
                ref={this.reCaptchaRef}
                sitekey={config.recaptcha.siteKey}
                onChange={captchaValue => this.handleSubmit(captchaValue)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                className={s.loginBtn}
                block
                type="button"
                onClick={() => {
                  this.reCaptchaRef.current.execute();
                }}
                disabled={
                  !this.state.antiPhishingChecked || this.state.submitting
                }
              >
                {' '}
                {this.state.submitting ? (
                  <span>Logging in ...</span>
                ) : (
                  <span>Login</span>
                )}
                {/* <FontAwesomeIcon icon={faSignInAlt} /> */}
              </Button>

              <span
                className={s.forgetPassword}
                role="presentation"
                onClick={() => {
                  window.location.href = routes.FORGET_PASSWORD;
                }}
              >
                {' '}
                Forgot your password?
              </span>
            </Col>
          </Row>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className={themify(s, s.loginMain, this.props.theme)}>
          <div className={s.loginHeader}>
            <img src={this.getLogo()} alt="logo" />
          </div>
          <div className={s.loginContainer}>
            <Panel theme={this.props.theme} style={{ textAlign: 'center' }}>
              {this.handleMultiFactorAuth()}
            </Panel>
            <div className={s.loginFooter}>
              <span>New to {config.platformName}?</span>
              <span
                role="presentation"
                className={s.signUp}
                onClick={() => {
                  window.location.href = routes.REGISTER;
                }}
              >
                Sign up
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  theme: PropTypes.string,
  authToken: PropTypes.string.isRequired,
  setAuthToken: PropTypes.func.isRequired,
  setSmsAuth: PropTypes.func.isRequired,
  set2FaAuth: PropTypes.func.isRequired,
  isSmsVerificationEnable: PropTypes.bool,
  isTwoFAEnable: PropTypes.bool,
  emailConfirmed: PropTypes.number,
  passwordReset: PropTypes.bool,
  returnTo: PropTypes.string,
  // isLoggedIn: PropTypes.bool.isRequired,
};

Login.defaultProps = {
  theme: 'dark',
  isSmsVerificationEnable: false,
  isTwoFAEnable: false,
  emailConfirmed: 2,
  passwordReset: false,
  returnTo: undefined,
};

const mapState = state => ({
  authToken: state.userInfo.authToken,
  isLoggedIn: state.isLoggedIn,
  isSmsVerificationEnable: state.userInfo.authStatus.smsEnabled,
  isTwoFAEnable: state.userInfo.authStatus.twoFAEnabled,
  theme: state.theme,
});

const mapDispatch = dispatch => ({
  setAuthToken(token) {
    dispatch({
      type: C.SET_AUTH_TOKEN,
      payload: token,
    });
  },
  setSmsAuth(smsEnabled) {
    dispatch({
      type: C.SET_SMS_AUTH,
      payload: smsEnabled,
    });
  },
  set2FaAuth(twoFaEnabled) {
    dispatch({
      type: C.SET_2FA_AUTH,
      payload: twoFaEnabled,
    });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Login));
