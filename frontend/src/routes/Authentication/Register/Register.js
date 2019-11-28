import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  FormGroup,
  FormControl,
  Col,
  Row,
  Checkbox,
  Button,
} from 'react-bootstrap';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from '../../../validation';
import { errors, titles } from '../../../constants/messages';
import FieldError from '../../../components/FieldError/FieldError';
import logoDark from '../../../../public/logo/dark.png';
import logoLight from '../../../../public/logo/light.png';
import s from './Register.css';
import routes from '../../../constants/routes';
import themify from '../../../themify';
import config from '../../../config';
import Panel from '../../../components/Panel';
import TermNConditionsModal from './TermNConditionsModal';
import PrivacyPolicyModal from './PrivacyPolicyModal';
/* eslint-disable css-modules/no-undef-class */

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      showWarnings: false,
      Name: '',
      LastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAgreeWithTermAndConditions: false,
      showTermsAndConditions: false,
      showPrivacyPolicy: false,
      submitting: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reCaptchaRef = React.createRef();
  }

  // componentDidMount() {
  //   if (this.props.isLoggedIn) window.location.href = routes.DASHBOARD;
  // }

  getLogo() {
    if (this.props.theme === 'light') return logoLight;
    return logoDark;
  }

  handleSubmit(captchaValue) {
    // if (captchaValue) {
    this.setState({ showWarnings: true });
    const formHasError = !(
      validateFirstName(this.state.Name).length === 0 &&
      validateLastName(this.state.LastName).length === 0 &&
      validateEmail(this.state.email).length === 0 &&
      validatePasswordConfirm(this.state.password, this.state.confirmPassword)
        .length === 0 &&
      validatePassword(this.state.password, false).length === 0
    );
    if (formHasError) {
      return;
    }
    localStorage.setItem('email', this.state.email);
    // reset recaptcha value
    this.reCaptchaRef.current.reset();

    this.setState({ submitting: true });
    axios
      .post(
        `${config.api.serverUrl}/v1/auth/register`,
        {
          firstName: this.state.Name,
          lastName: this.state.LastName,
          email: this.state.email,
          password: this.state.password,
          referralToken: this.props.referralToken,
          captchaValue,
        },
        {
          headers: {
            Authorization: this.props.authToken,
            [config.apiKeyHeader]: config.apiKey,
          },
        },
      )
      .then(() => {
        window.location.href = `${routes.VERIFY_EMAIL}?email=${
          this.state.email
        }`;
        // history.push(`${routes.VERIFY_EMAIL}?email=${email}`);
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
    // }
  }

  render() {
    return (
      <div>
        <div className={themify(s, s.registerMain, this.props.theme)}>
          <div className={s.registerHeader}>
            <img src={this.getLogo()} alt="innovation exchange platform" />
          </div>
          <div className={s.registerContainer}>
            <Panel theme={this.props.theme} style={{ textAlign: 'center' }}>
              <div className={s.registerTitle}>Create your account</div>
              <form className={s.regForm}>
                <Row>
                  <Col md={6} xs={12}>
                    <FormGroup
                      controlId="name"
                      className={s.customInput}
                      validationState={this.state.nameValidation || null}
                    >
                      <FormControl
                        value={this.state.Name}
                        onChange={e => this.setState({ Name: e.target.value })}
                        type="text"
                        name="Name"
                        placeholder="First name"
                      />
                      <FieldError
                        error={validateFirstName(this.state.Name)}
                        show={this.state.showWarnings}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6} xs={12}>
                    <FormGroup
                      controlId="lastname"
                      className={s.customInput}
                      validationState={this.state.lastnameValidation || null}
                    >
                      <FormControl
                        value={this.state.LastName}
                        onChange={e =>
                          this.setState({ LastName: e.target.value })
                        }
                        type="text"
                        name="LastName"
                        placeholder="Last name"
                      />
                      <FieldError
                        error={validateLastName(this.state.LastName)}
                        show={this.state.showWarnings}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <FormGroup
                      controlId="email"
                      className={s.customInput}
                      validationState={this.state.emailValidation || null}
                    >
                      <FormControl
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                        type="email"
                        name="email"
                        placeholder="Email"
                      />
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
                      validationState={this.state.passwordValidation || null}
                    >
                      <FormControl
                        value={this.state.password}
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                      <FieldError
                        error="password should contain at least 10 characters with one lowercase, one uppercase and one special character."
                        show={!this.state.showWarnings}
                        color="white"
                        fontWeight="100"
                      />
                      <FieldError
                        error={validatePassword(this.state.password, false)}
                        show={this.state.showWarnings}
                      />
                      {/* <HelpBlock style={{ textAlign: 'left', fontSize: '11px' }}>password should contain 8 characters with at least 1 digit and 1 alpha character.</HelpBlock> */}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <FormGroup
                      controlId="confirmPassword"
                      className={s.customInput}
                      validationState={
                        this.state.confirmPasswordValidation || null
                      }
                    >
                      <FormControl
                        value={this.state.confirmPassword}
                        onChange={e =>
                          this.setState({ confirmPassword: e.target.value })
                        }
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                      />
                      <FieldError
                        error={validatePasswordConfirm(
                          this.state.password,
                          this.state.confirmPassword,
                        )}
                        show={this.state.showWarnings}
                      />
                    </FormGroup>
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
                    <Checkbox
                      checked={this.state.isAgreeWithTermAndConditions}
                      onChange={e =>
                        this.setState({
                          isAgreeWithTermAndConditions: e.target.checked,
                        })
                      }
                      name="isAgreeWithTermAndConditions"
                      className={s.rememberMe}
                    >
                      {'I agree to '}
                      <span
                        style={{ color: 'blueviolet' }}
                        role="presentation"
                        onClick={() => {
                          this.setState({ showPrivacyPolicy: true });
                        }}
                      >
                        Privacy Policy
                      </span>
                      <span> and </span>
                      <span
                        style={{ color: 'blueviolet' }}
                        role="presentation"
                        onClick={() => {
                          this.setState({ showTermsAndConditions: true });
                        }}
                      >
                        Terms & Conditions
                      </span>
                      <span> of {config.platformName}</span>
                    </Checkbox>
                    <Button
                      bsStyle="primary"
                      disabled={
                        this.state.isAgreeWithTermAndConditions === false ||
                        this.state.submitting
                      }
                      block
                      className={s.registerBtn}
                      onClick={() => this.reCaptchaRef.current.execute()}
                    >
                      {this.state.submitting
                        ? 'Submitting ...'
                        : 'Create account'}
                    </Button>
                  </Col>
                </Row>
              </form>
            </Panel>
            <div className={s.registerFooter}>
              <span>Already have an account?</span>
              <span
                role="presentation"
                className={s.login}
                onClick={() => {
                  window.location.href = routes.LOGIN;
                }}
              >
                Login
              </span>
            </div>
          </div>
        </div>
        <TermNConditionsModal
          show={this.state.showTermsAndConditions}
          onHide={() => this.setState({ showTermsAndConditions: false })}
        />
        <PrivacyPolicyModal
          show={this.state.showPrivacyPolicy}
          onHide={() => this.setState({ showPrivacyPolicy: false })}
        />
      </div>
    );
  }
}

Register.propTypes = {
  theme: PropTypes.string,
  authToken: PropTypes.string.isRequired,
  referralToken: PropTypes.string,
  // isLoggedIn: PropTypes.bool.isRequired,
};
Register.defaultProps = {
  theme: 'dark',
  referralToken: '',
};

const mapState = state => ({
  theme: state.theme,
  authToken: state.userInfo.authToken,
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapState)(withStyles(s)(Register));
