import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  FormGroup,
  FormControl,
  Col,
  Row,
  InputGroup,
  Button,
} from 'react-bootstrap';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { errors, titles } from '../../../constants/messages';
import FieldError from '../../../components/FieldError/FieldError';
import { validateEmail } from '../../../validation';
import logoDark from '../../../../public/logo/dark.png';
import logoLight from '../../../../public/logo/light.png';
import s from './ForgetPassword.css';
import config from '../../../config';
import themify from '../../../themify';
import C from '../../../constants/actions';
import Panel from '../../../components/Panel';

/* eslint-disable css-modules/no-undef-class */

class ForgetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
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
    if (validateEmail(this.state.email).length !== 0) {
      return;
    }

    this.setState({ submitting: true });
    axios
      .post(
        `${config.api.serverUrl}/v1/auth/resetPasswordEmail`,
        {
          email: this.state.email,
        },
        {
          headers: {
            Authorization: this.props.authToken,
            [config.apiKeyHeader]: config.apiKey,
          },
        },
      )
      .then(res => {
        toastr.success(res.data.message.title, res.data.message.description);
        this.setState({ submitting: false });
        this.props.toggleShowChangePasswordModal();
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
        <div className={themify(s, s.forgetPasswordMain, this.props.theme)}>
          <div className={s.forgetPasswordHeader}>
            <img src={this.getLogo()} alt="logo" />
          </div>
          <div className={s.forgetPasswordContainer}>
            <Panel theme={this.props.theme} style={{ textAlign: 'center' }}>
              <div className={s.forgetPasswordTitle}>Enter your Email</div>
              <p style={{ color: '#8997c0', marginTop: 10 }}>
                We will send a reset password link to your Email
              </p>
              <form className={s.forgetPasswordForm}>
                <Row>
                  <Col xs={12}>
                    <FormGroup
                      controlId="email"
                      className={s.customInput}
                      validationState={this.state.emailValidation || null}
                    >
                      <InputGroup>
                        <InputGroup.Addon className={s.inputIcon}>
                          <i className="fa fa-envelope" />
                        </InputGroup.Addon>
                        <FormControl
                          value={this.state.email}
                          onChange={e =>
                            this.setState({ email: e.target.value })
                          }
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
                    <Button
                      className={s.forgetPasswordBtn}
                      disabled={this.state.submitting}
                      block
                      onClick={() => this.handleSubmit()}
                    >
                      {this.state.submitting ? 'Submitting ...' : 'Submit'}
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

ForgetPassword.propTypes = {
  theme: PropTypes.string,
  authToken: PropTypes.string.isRequired,
  toggleShowChangePasswordModal: PropTypes.func.isRequired,
};

ForgetPassword.defaultProps = {
  theme: 'dark',
};

const mapDispatch = dispatch => ({
  toggleShowChangePasswordModal() {
    dispatch({ type: C.TOGGLE_SHOW_CHANGE_PASSWORD_MODAL });
  },
});

const mapState = state => ({
  theme: state.theme,
  authToken: state.userInfo.authToken,
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ForgetPassword));
