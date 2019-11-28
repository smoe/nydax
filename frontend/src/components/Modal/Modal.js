import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BSModal } from 'react-bootstrap';

const Modal = props => (
  <BSModal className="customModal" {...props}>
    {props.children}
  </BSModal>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
