import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal as BSModal } from 'react-bootstrap';
import Modal from '../Modal';
import PaypalPaymentForm from './PaypalPaymentForm';
import StripePaymentForm from './StripePaymentForm';
import ChoosePaymentMethod from './ChoosePaymentMethod';
import OrderForm from './OrderForm';
import C from '../../constants/actions';
import c from './constant';

class BuyTokenModal extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      selectedPaymentMethod: '',
      stage: c.SELECT_ORDER,
      token: props.tokens.filter(item => item.categoryId === 2)[0].symbol,
      amount: '',
      paymentToken: '',
    };
    this.state = this.initialState;
    this.setStage = this.setStage.bind(this);
    this.saveSelected = this.saveSelected.bind(this);
    this.setToken = this.setToken.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.setPaymentToken = this.setPaymentToken.bind(this);
    this.selectPaymentMethod = this.selectPaymentMethod.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialTokenId === null) {
      this.setState({
        token: nextProps.tokens.filter(item => item.categoryId === 2)[0].symbol,
      });
    } else if (this.props.initialTokenId !== nextProps.initialTokenId) {
      this.setState({
        token: nextProps.tokens.find(
          item => item.id === nextProps.initialTokenId,
        ).symbol,
      });
    }
  }

  setStage(stage) {
    this.setState({ stage });
  }
  setToken(tokenSymbol) {
    this.setState({ token: tokenSymbol });
  }
  setAmount(amount) {
    this.setState({ amount });
  }
  setPaymentToken(paymentToken) {
    this.setState({ paymentToken });
  }
  selectPaymentMethod(method) {
    this.setState({ selectedPaymentMethod: method });
  }

  saveSelected() {
    this.setState({ selectedPaymentMethod: '' });
  }

  render() {
    let currentPage;
    let paymentForm;

    switch (this.state.selectedPaymentMethod) {
      case 'stripe':
        paymentForm = (
          <StripePaymentForm
            setStage={this.setStage}
            paymentToken={this.state.paymentToken}
            onSubmitFinish={() => this.setState(this.initialState)}
            tokenSymbol={this.state.token}
            tokenAmount={this.state.amount}
          />
        );
        break;

      case 'paypal':
        paymentForm = <PaypalPaymentForm setStage={this.setStage} />;
        break;

      default:
        break;
    }

    switch (this.state.stage) {
      case c.SELECT_ORDER:
        currentPage = (
          <OrderForm
            setStage={this.setStage}
            setToken={this.setToken}
            setAmount={this.setAmount}
            token={this.state.token}
            amount={this.state.amount}
            setPaymentToken={this.setPaymentToken}
            paymentToken={this.state.paymentToken}
          />
        );
        break;

      case c.SELECT_PAYMENT_METHOD:
        currentPage = (
          <ChoosePaymentMethod
            selectPaymentMethod={this.selectPaymentMethod}
            setStage={this.setStage}
          />
        );
        break;

      case c.PAYMENT_FORM:
        currentPage = paymentForm;
        break;

      default:
        break;
    }

    return (
      <Modal
        show={this.props.show}
        onHide={() => {
          this.setState(this.initialState);
          this.props.removeInitialToken();
          this.props.showToggle();
        }}
      >
        <BSModal.Header closeButton />
        <BSModal.Body className="p-3">{currentPage}</BSModal.Body>
      </Modal>
    );
  }
}

BuyTokenModal.propTypes = {
  show: PropTypes.bool.isRequired,
  showToggle: PropTypes.func.isRequired,
  removeInitialToken: PropTypes.func.isRequired,
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialTokenId: PropTypes.number.isRequired,
};

const mapState = state => ({
  show: state.showBuyTokenModal,
  tokens: state.tokens,
  initialTokenId: state.initialTokenIdForBuy,
});

const mapDispatch = dispatch => ({
  showToggle() {
    dispatch({ type: C.TOGGLE_BUY_TOKEN_MODAL });
  },
  removeInitialToken() {
    dispatch({ type: C.SET_INITIAL_TOKEN_FOR_BUY, payload: null });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(BuyTokenModal);
export const WithoutRedux = BuyTokenModal;
