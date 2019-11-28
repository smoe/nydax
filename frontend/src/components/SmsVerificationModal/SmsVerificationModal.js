import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toastr } from 'react-redux-toastr';
import {
  Modal as BSModal,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { sendSMS, verifySmsToken } from '../../actions/authentication';
import C from '../../constants/actions';
import VerifySmsIcon from './verifyPhoneNumber.svg';
import s from './SmsVerificationModal.css';
import Modal from '../Modal';
import { validatePhoneNumber } from '../../validation';
import FieldError from '../FieldError/FieldError';

/* eslint-disable css-modules/no-undef-class */
let timerInterval = null;
class SmsVerificationModal extends React.Component {
  constructor(props) {
    super(props);
    this.startCountDownTimer = this.startCountDownTimer.bind(this);
    this.handleSendSms = this.handleSendSms.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      isSmsSent: false,
      selectedCountryCode: props.countries[0].phoneCode,
      phoneNumber: null,
      token: null,
      showResendSMS: false,
      timer: 60,
      showFieldError: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.smsEnabled !== nextProps.smsEnabled) this.reset();
  }

  startCountDownTimer = () => {
    timerInterval = setInterval(() => {
      if (this.state.timer === 1) {
        clearInterval(timerInterval);
        this.setState({ showResendSMS: true, timer: 60 });
        return;
      }
      this.setState({ timer: this.state.timer - 1 });
    }, 1000);
  };

  verifyToken = () => {
    if (!this.state.token) {
      toastr.error('Validation Error!', 'token is empty!');
      return;
    }
    this.props.verifySmsToken(this.state.token);
  };

  handleSendSms = () => {
    if (this.props.smsEnabled) {
      this.setState({ isSmsSent: true, showResendSMS: false }, () =>
        this.startCountDownTimer(),
      );
      this.props.disableSendSms(this.props.phoneNumber);
      return;
    }
    if (!this.state.phoneNumber) {
      toastr.error(
        'Validation Error!',
        'you are not entered your phone number.',
      );
      return;
    }

    if (
      validatePhoneNumber(
        this.state.phoneNumber,
        this.state.selectedCountryCode,
      )
    ) {
      this.setState({ showFieldError: true });
      return;
    }

    this.setState({ showFieldError: false });

    this.setState({ isSmsSent: true, showResendSMS: false }, () =>
      this.startCountDownTimer(),
    );

    this.props.enableSendSms(
      this.state.phoneNumber,
      this.state.selectedCountryCode,
    );
  };

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  reset() {
    clearInterval(timerInterval);
    this.setState({ timer: 60 });
    this.setState({
      isSmsSent: false,
      selectedCountryCode: this.props.countries[0].phoneCode,
      phoneNumber: null,
      token: null,
    });
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={() => {
            this.reset();
            this.props.showToggle();
          }}
        >
          <BSModal.Header closeButton />
          <BSModal.Body style={{ paddingBottom: 30 }}>
            {this.state.isSmsSent || this.props.smsEnabled ? (
              <div>
                <p className={s.headerTitle}>{`${
                  this.props.smsEnabled ? 'Disable' : 'Enable'
                } SMS authentication`}</p>

                {this.state.isSmsSent ? (
                  <div className={s.formContainer}>
                    <br />
                    <p className={s.description} style={{ width: '80%' }}>
                      Please enter the six digit code we just sent to your
                      mobile
                      <br />
                      {!this.props.smsEnabled && this.state.phoneNumber
                        ? ` ${
                            this.state.selectedCountryCode
                          } xxxxxxxx ${this.state.phoneNumber.substr(
                            this.state.phoneNumber.length - 2,
                          )}.`
                        : `xxxxxxxx ${this.props.phoneNumber.substr(
                            this.props.phoneNumber.length - 2,
                          )}.`}
                    </p>
                    <br />
                    <div className={s.formInline}>
                      <img alt="sms verification icon" src={VerifySmsIcon} />
                      &nbsp;
                      <FormGroup
                        className={s.customInput}
                        style={{ marginTop: 10, width: '90%' }}
                        controlId="selectCountry"
                      >
                        <FormControl
                          onChange={this.handleInputChange}
                          type="text"
                          name="token"
                          placeholder="Enter token"
                        />
                      </FormGroup>
                    </div>
                    <br />
                    {this.state.showResendSMS ? (
                      <p>
                        Didn’t receive the SMS?
                        <span
                          role="presentation"
                          onClick={this.handleSendSms}
                          style={{
                            color: '#7577ff',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                          }}
                        >
                          Re-send SMS
                        </span>
                      </p>
                    ) : (
                      <p>{`Token sent ${this.state.timer}`}</p>
                    )}
                    <br />
                    {!this.props.smsEnabled && (
                      <p
                        role="presentation"
                        onClick={() =>
                          this.setState(
                            { isSmsSent: false, phoneNumber: null, timer: 60 },
                            () => clearInterval(timerInterval),
                          )
                        }
                        style={{
                          color: '#7577ff',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                      >
                        Use another phone number
                      </p>
                    )}
                    <br />
                    <Button
                      style={{ width: '80%' }}
                      onClick={this.verifyToken}
                      className={s.customBtn}
                      block
                    >
                      {this.props.smsEnabled ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                ) : (
                  this.props.smsEnabled && (
                    <div className={s.formContainer}>
                      <p className={s.description} style={{ width: '80%' }}>
                        if you want to disable SMS authentication please click
                        on send button to send a token to your phone number.
                      </p>
                      <br />
                      <Button
                        style={{ width: '80%' }}
                        onClick={this.handleSendSms}
                        className={s.customBtn}
                        block
                      >
                        Send
                      </Button>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div>
                <p className={s.headerTitle}>Enter phone number</p>
                <div className={s.formContainer}>
                  <FormGroup
                    className={s.customInput}
                    style={{ width: '80%' }}
                    controlId="selectCountry"
                  >
                    <ControlLabel>Country</ControlLabel>
                    <FormControl
                      onChange={event =>
                        this.setState({
                          selectedCountryCode: event.target.value,
                        })
                      }
                      value={this.state.selectedCountryCode}
                      componentClass="select"
                      placeholder="Select Country"
                    >
                      {this.props.countries &&
                        this.props.countries.map(item => (
                          <option key={item.phoneCode} value={item.phoneCode}>
                            {item.name}
                          </option>
                        ))}
                    </FormControl>
                    <br />
                    <ControlLabel>Your Phone Number</ControlLabel>
                    <InputGroup>
                      <InputGroup.Button>
                        <Button style={{ height: 45 }}>
                          {this.state.selectedCountryCode}
                        </Button>
                      </InputGroup.Button>
                      <FormControl
                        onChange={this.handleInputChange}
                        type="text"
                        name="phoneNumber"
                        placeholder="Enter Phone Number"
                      />
                    </InputGroup>
                    <FieldError
                      color="red"
                      error={validatePhoneNumber(
                        `${this.state.phoneNumber}` || '',
                        this.state.selectedCountryCode,
                      )}
                      show={this.state.showFieldError}
                    />
                  </FormGroup>
                  <p className={s.description} style={{ width: '80%' }}>
                    This will secure your account by texting a short
                    confirmation code to your phone when logging in.
                  </p>
                  <Button
                    style={{ width: '80%' }}
                    onClick={this.handleSendSms}
                    className={s.customBtn}
                    block
                  >
                    Send SMS
                  </Button>
                </div>
              </div>
            )}
          </BSModal.Body>
        </Modal>
      </div>
    );
  }
}

SmsVerificationModal.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  enableSendSms: PropTypes.func.isRequired,
  disableSendSms: PropTypes.func.isRequired,
  verifySmsToken: PropTypes.func.isRequired,
  show: PropTypes.bool,
  showToggle: PropTypes.func,
  // onDisable: PropTypes.func.isRequired,
  smsEnabled: PropTypes.bool.isRequired,
  phoneNumber: PropTypes.string,
};

SmsVerificationModal.defaultProps = {
  show: false,
  showToggle: () => {},
  phoneNumber: '',
};

const mapState = state => ({
  countries: state.countries,
  show: state.showSMSAuthenticationModal,
  smsEnabled: state.userInfo.authStatus.smsEnabled,
  phoneNumber: state.userInfo.authStatus.phoneNumber,
});

const mapDispatch = dispatch => ({
  showToggle() {
    dispatch({ type: C.TOGGLE_SHOW_SMS_AUTHENTICATION_MODAL });
  },
  enableSendSms(phoneNumber, countryCode) {
    dispatch(sendSMS(countryCode + phoneNumber));
  },
  disableSendSms(phoneNumber) {
    dispatch(sendSMS(phoneNumber));
  },
  verifySmsToken(token) {
    dispatch(verifySmsToken(token));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(SmsVerificationModal));

export const WithoutRedux = withStyles(s)(SmsVerificationModal);
