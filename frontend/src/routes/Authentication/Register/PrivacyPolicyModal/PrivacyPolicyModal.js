import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BSModal, Button } from 'react-bootstrap';
import PrivacyPolicy from '../../../privacy-policy/PrivacyPolicy';
import Modal from '../../../../components/Modal';

class PrivacyPolicyModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <BSModal.Header closeButton />
        <BSModal.Body>
          <PrivacyPolicy inModal />
        </BSModal.Body>
        <BSModal.Footer controls>
          <Button onClick={this.props.onHide}>Close</Button>
        </BSModal.Footer>
      </Modal>
    );
  }
}

PrivacyPolicyModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default PrivacyPolicyModal;
