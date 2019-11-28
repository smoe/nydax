import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Modal as BSModal, Button } from 'react-bootstrap';
import TermsAndConditions from '../../../terms-and-conditions/TermsAndConditions';
import Modal from '../../../../components/Modal';
import s from './TermNConditionsModal.css';

class TermNConditionsModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <BSModal.Header closeButton />
        <BSModal.Body>
          <div className={s.root}>
            <TermsAndConditions inModal />
          </div>
        </BSModal.Body>
        <BSModal.Footer controls>
          <Button onClick={this.props.onHide}>Close</Button>
        </BSModal.Footer>
      </Modal>
    );
  }
}

TermNConditionsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default withStyles(s)(TermNConditionsModal);
