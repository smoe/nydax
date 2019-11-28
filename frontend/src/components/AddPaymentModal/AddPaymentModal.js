import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal as BSModal } from 'react-bootstrap';
import Modal from '../Modal';
import PaypalPaymentForm from './PaypalPaymentForm/PaypalPaymentForm';
import ChoosePaymentMethod from './ChoosePaymentMethod/ChoosePaymentMethod';
import C from '../../constants/actions';

class AddPaymentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccountType: '',
      isSelectedAccountType: false,
    };
    this.onSelectAccountType = this.onSelectAccountType.bind(this);
    this.saveSelected = this.saveSelected.bind(this);
  }

  onSelectAccountType(type) {
    this.setState({ selectedAccountType: type, isSelectedAccountType: true });
  }

  saveSelected() {
    this.setState({ selectedAccountType: '' });
  }

  render() {
    const paymentForm = this.state.selectedAccountType === 'paypal' && (
      <PaypalPaymentForm />
    );

    return (
      <Modal show={this.props.show} onHide={() => this.props.showToggle()}>
        <BSModal.Header closeButton />
        <BSModal.Body className="p-3">
          {this.state.isSelectedAccountType ? (
            paymentForm
          ) : (
            <ChoosePaymentMethod
              selectPaymentMethod={this.onSelectAccountType}
            />
          )}
        </BSModal.Body>
      </Modal>
    );
  }
}

AddPaymentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  showToggle: PropTypes.func.isRequired,
};

const mapState = state => ({
  show: state.showAddPaymentModal,
});

const mapDispatch = dispatch => ({
  showToggle() {
    dispatch({ type: C.TOGGLE_BUY_TOKEN_MODAL });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(AddPaymentModal);
export const WithoutRedux = AddPaymentModal;
