import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Modal as BSModal } from 'react-bootstrap';
import { revokeAuthToken } from '../../actions/user';
import Button from '../Button';
import Modal from '../Modal';
import { resetPasswordEmailSend } from '../../actions/authentication';
import C from '../../constants/actions';
import s from './ChangePasswordModal.css';
/* eslint-disable css-modules/no-undef-class */

class ChangePasswordModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.props.showToggle()}>
        <BSModal.Header closeButton />
        <BSModal.Body className={s.body}>
          <p className={s.headerTitle}>Change password</p>
          <p className={s.description}>
            Click on button below to receive a reset password link in your
            email.
          </p>
          <Button
            width="80%"
            onClick={() => {
              this.props.revokeAuthToken();
              this.props.onSendEmail(this.props.email);
            }}
          >
            Send reset password link
          </Button>
        </BSModal.Body>
      </Modal>
    );
  }
}

ChangePasswordModal.propTypes = {
  show: PropTypes.bool.isRequired,
  showToggle: PropTypes.func.isRequired,
  onSendEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  revokeAuthToken: PropTypes.func.isRequired,
};

const mapState = state => ({
  show: state.showChangePasswordModal,
  email: state.userInfo.profile.email,
});

const mapDispatch = dispatch => ({
  revokeAuthToken() {
    dispatch(revokeAuthToken(false));
  },
  showToggle() {
    dispatch({ type: C.TOGGLE_SHOW_CHANGE_PASSWORD_MODAL });
  },
  onSendEmail(email) {
    dispatch(resetPasswordEmailSend(email));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ChangePasswordModal));
export const WithoutRedux = withStyles(s)(ChangePasswordModal);
