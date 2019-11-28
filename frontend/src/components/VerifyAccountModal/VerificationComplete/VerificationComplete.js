import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import IxpSpinner from '../../IxpSpinner';
import VerificationSuccessPic from './verificationSuccess.svg';
import s from './VerificationComplete.css';

class VerificationComplete extends React.Component {
  render() {
    return (
      <div>
        {!this.props.isUploading ? (
          <Modal.Body style={{ padding: 40, paddingTop: 15 }}>
            <p className={s.headerTitle}>We are process your request now...</p>
            <br />
            <p className={s.description}>
              We’re now processing your documents to verify your identity.
            </p>
            <p className={s.description}>
              You can get an equivalent of 25 dollars of INVO for free by
              submitting your identity.
            </p>
            <div className={s.formContainer}>
              <img src={VerificationSuccessPic} alt="success" />
              <br />
              <Button
                onClick={() => this.props.onFinish()}
                className={s.customBtn}
              >
                Finish
              </Button>
              <br />
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body style={{ padding: 40, paddingTop: 15 }}>
            <p className={s.headerTitle}>Uploading</p>
            <div style={{ textAlign: 'center' }}>
              <IxpSpinner />
            </div>
          </Modal.Body>
        )}
      </div>
    );
  }
}
VerificationComplete.propTypes = {
  isUploading: PropTypes.bool,
  onFinish: PropTypes.func,
};

VerificationComplete.defaultProps = {
  isUploading: false,
  onFinish: () => {},
};

export default withStyles(s)(VerificationComplete);
