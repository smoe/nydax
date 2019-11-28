import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { FormGroup, FormControl, Col, Row, Button } from 'react-bootstrap';
import { errors, titles } from '../../../constants/messages';
import FieldError from '../../../components/FieldError/FieldError';
import { validatePassword, validatePasswordConfirm } from '../../../validation';
import logoDark from '../../../../public/logo/dark.png';
import logoLight from '../../../../public/logo/light.png';
import config from '../../../config';
import routes from '../../../constants/routes';
import s from './ResetPassword.css';
import themify from '../../../themify';
import Panel from '../../../components/Panel';
/* eslint-disable css-modules/no-undef-class */

class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      confirmPassword: '',
      showWarnings: false,
      submitting: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getLogo() {
    if (this.props.theme === 'light') return logoLight;
    return logoDark;
  }

  handleSubmit() {
    this.setState({ showWarnings: true });
    const formHasError = !(
      validatePassword(this.state.password, false).length === 0 &&
      validatePasswordConfirm(this.state.password, this.state.confirmPassword)
        .length === 0
    );
    if (formHasError) {
      return;
    }

    this.setState({ submitting: true });
    axios
      .post(
        `${config.api.serverUrl}/v1/auth/resetPassword`,
        {
          password: this.state.password,
          token: this.props.token,
        },
        {
          headers: {
            Authorization: this.props.authToken,
            [config.apiKeyHeader]: config.apiKey,
          },
        },
      )
      .then(() => {
        this.setState({ submitting: false });
        window.location.href = `${config.host}${routes.LOGIN}?passwordReset=1`;
        // history.push(`${routes.LOGIN}?resetPassword=1`);
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

  render() {
    return (
      <div>
        <div className={themify(s, s.resetPasswordMain, this.props.theme)}>
          <div className={s.resetPasswordHeader}>
            <img src={this.getLogo()} alt="Innovation exchange platform" />
          </div>
          <div className={s.changePasswordContainer}>
            <Panel style={{ textAlign: 'center' }} theme={this.props.theme}>
              <div className={s.resetPasswordTitle}>Enter new password</div>
              <form className={s.resetPasswordForm}>
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
                        error={validatePassword(this.state.password, false)}
                        show={this.state.showWarnings}
                      />
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
                    <Button
                      className={s.resetPasswordBtn}
                      block
                      onClick={this.handleSubmit}
                      disabled={this.state.submitting}
                    >
                      {this.state.submitting
                        ? 'Submitting ...'
                        : 'Change Password'}
                    </Button>
                  </Col>
                </Row>
              </form>
            </Panel>
          </div>
          <div />
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  theme: PropTypes.string,
  authToken: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

ResetPassword.defaultProps = {
  theme: 'dark',
};

const mapState = state => ({
  theme: state.theme,
  authToken: state.userInfo.authToken,
});

export default connect(mapState)(withStyles(s)(ResetPassword));
