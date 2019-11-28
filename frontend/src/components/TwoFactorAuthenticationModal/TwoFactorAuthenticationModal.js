import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Modal as BSModal,
  FormGroup,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { faCopy, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { toastr } from 'react-redux-toastr';
import {
  validate2FAToken,
  disableGoogleAuthenticator,
} from '../../actions/authentication';
import C from '../../constants/actions';
// import qrIcon from './qr.png';
import VerifySmsIcon from './verifyPhoneNumber.svg';
import s from './TwoFactorAuthenticationModal.css';
import Modal from '../Modal';

/* eslint-disable css-modules/no-undef-class */

class TwoFactorAuthenticationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEnterToken: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.enableAuthenticator = this.enableAuthenticator.bind(this);
    this.validateToken = this.validateToken.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  enableAuthenticator() {
    this.setState({ showEnterToken: true });
  }

  validateToken() {
    if (!this.state.token) {
      toastr.error('Validation Error!', 'You are not entered token!');
      return;
    }
    this.props.validateToken(this.state.token);
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => {
          this.setState({ showEnterToken: false });
          this.props.showToggle();
        }}
      >
        <BSModal.Header closeButton />
        <BSModal.Body style={{ paddingBottom: 30 }}>
          {!this.props.isTwoFactorAuthenticationEnable ? (
            <div>
              {this.state.showEnterToken ? (
                <div>
                  <p className={s.headerTitle}>
                    Enter the 2-step verification token
                  </p>
                  <div className={s.formContainer}>
                    <br />
                    <p className={s.description}>
                      Enter the 2-step verification code provided by your
                      authentication app
                    </p>
                    <br />
                    <div className={s.formInline}>
                      <img alt="enter token icon" src={VerifySmsIcon} />
                      &nbsp;
                      <FormGroup
                        className={s.customInput}
                        style={{ marginTop: 10, width: '90%' }}
                        controlId="TokenInput"
                      >
                        <FormControl
                          type="text"
                          onChange={this.handleInputChange}
                          name="token"
                          placeholder="Enter token"
                        />
                      </FormGroup>
                    </div>
                    <br />
                    <Button
                      style={{ width: '80%' }}
                      onClick={this.validateToken}
                      className={s.customBtn}
                      block
                    >
                      Enable
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className={s.headerTitle}>Setup Authenticator</p>
                  <br />
                  <div className={s.formContainer}>
                    <div className={cx(s.formInline, s.left)}>
                      <div className={s.circleNum}>1</div>
                      <p
                        className={cx(s.description, s.left)}
                        style={{ margin: 0, width: '80%' }}
                      >
                        Install{' '}
                        <a
                          href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US"
                          // eslint-disable-next-line react/jsx-no-target-blank
                          target="_blank"
                        >
                          Google authenticator
                        </a>{' '}
                        app on yor mobile device if you don’t already have one.
                      </p>
                    </div>
                    <br />
                    <div className={cx(s.formInline, s.left)}>
                      <div className={s.circleNum}>2</div>
                      <p
                        className={cx(s.description, s.left)}
                        style={{ margin: 0, width: '80%' }}
                      >
                        Scan QR code with authenticator (or tap it in mobile
                        browser)
                      </p>
                    </div>
                    <br />
                    <div className={cx(s.formInline, s.left)}>
                      <div className={s.circleNum}>3</div>
                      <p
                        className={cx(s.description, s.left)}
                        style={{ margin: 0, width: '80%' }}
                      >
                        Please write down or print a copy of the secret code and
                        put it in a safe place.
                      </p>
                    </div>
                    <div
                      className={cx(s.formInline, s.left)}
                      style={{ marginTop: 20 }}
                    >
                      <img
                        alt="qrcode"
                        height={100}
                        width={100}
                        src={this.props.qrCode}
                      />
                      <div
                        className={s.formContainer}
                        style={{ marginLeft: '10%' }}
                      >
                        <FormGroup
                          className={s.customInput}
                          controlId="selectCountry"
                        >
                          <p className={cx(s.description, s.left)}>
                            Authenticator Secret Code
                          </p>
                          <InputGroup>
                            <FormControl
                              value={this.props.authenticatorSecret}
                              type="text"
                              name="secret"
                              readOnly
                            />
                            <InputGroup.Button>
                              <Button
                                onClick={() => {
                                  copy(this.props.authenticatorSecret);
                                  toastr.info('copied!');
                                }}
                                style={{ height: 45 }}
                              >
                                <FontAwesomeIcon icon={faCopy} />
                              </Button>
                            </InputGroup.Button>
                          </InputGroup>
                        </FormGroup>
                        <br />
                      </div>
                    </div>
                    <div className={cx(s.formInline, s.left)}>
                      <p
                        className={cx(s.description, s.left)}
                        style={{ fontSize: 12, marginTop: 20 }}
                      >
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          style={{ fontSize: 16 }}
                        />
                        &nbsp; Once an authenticator app is enabled, all other
                        2FA methods will not be accepted.
                      </p>
                    </div>
                    <Button
                      style={{ width: '80%' }}
                      onClick={this.enableAuthenticator}
                      className={s.customBtn}
                      block
                    >
                      Enter Token
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className={s.headerTitle}>Disable the 2-step verification</p>
              <div className={s.formContainer}>
                <br />
                <p className={s.description}>
                  Enter the 2-step verification code provided by your <br />{' '}
                  authentication app
                </p>
                <br />
                <div className={s.formInline}>
                  <img alt="enter token icon" src={VerifySmsIcon} />
                  &nbsp;
                  <FormGroup
                    className={s.customInput}
                    style={{ marginTop: 10, width: '80%' }}
                    controlId="TokenInput"
                  >
                    <FormControl
                      type="text"
                      onChange={this.handleInputChange}
                      name="disableToken"
                      placeholder="Enter token"
                    />
                  </FormGroup>
                </div>
                <br />
                <Button
                  onClick={() => {
                    this.setState({ showEnterToken: false });
                    this.props.disableAuthenticator(this.state.disableToken);
                  }}
                  style={{ width: '80%' }}
                  className={s.customBtn}
                  block
                >
                  Disable
                </Button>
              </div>
            </div>
          )}
        </BSModal.Body>
      </Modal>
    );
  }
}

TwoFactorAuthenticationModal.propTypes = {
  isTwoFactorAuthenticationEnable: PropTypes.bool,
  qrCode: PropTypes.string, // eslint-disable-line
  authenticatorSecret: PropTypes.string.isRequired,
  disableAuthenticator: PropTypes.func.isRequired,
  validateToken: PropTypes.func.isRequired,
  show: PropTypes.bool,
  showToggle: PropTypes.func,
};

TwoFactorAuthenticationModal.defaultProps = {
  isTwoFactorAuthenticationEnable: false,
  // qrCode: qrIcon,
  show: false,
  showToggle: () => {},
};

const mapState = state => ({
  isTwoFactorAuthenticationEnable: state.userInfo.authStatus.twoFAEnabled,
  qrCode: state.userInfo.authStatus.qrUrl,
  authenticatorSecret: state.userInfo.authStatus.twoFactorAuthSecret,
  show: state.showGoogleAuthenticationModal,
});

const mapDispatch = dispatch => ({
  showToggle() {
    dispatch({ type: C.TOGGLE_SHOW_GOOGLE_AUTHENTICATION_MODAL });
  },
  validateToken(token) {
    dispatch(validate2FAToken(token));
  },
  disableAuthenticator(token) {
    dispatch(disableGoogleAuthenticator(token));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(TwoFactorAuthenticationModal));
export const WithoutRedux = withStyles(s)(TwoFactorAuthenticationModal);
