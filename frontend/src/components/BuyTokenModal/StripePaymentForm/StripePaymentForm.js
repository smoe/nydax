import React, { Component } from 'react';
import to from 'await-to-js';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  // Row,
  // Col,
  ControlLabel,
  // FormControl,
  // FormGroup,
  Button,
} from 'react-bootstrap';
import cx from 'classnames';
import { toastr } from 'react-redux-toastr';
import config from '../../../config';
import s from './StripePaymentForm.css';
import C from '../../../constants/actions';
import c from '../constant';
/* eslint-disable css-modules/no-undef-class */

class StripePaymentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment: {
        currencyAmount: '',
      },
      submitting: false,
    };

    // this.state = {
    //   cardNumber: '',
    //   expiresMonth: '',
    //   expiresYear: '',
    //   cvcNumber: '',
    // };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `${config.api.serverUrl}/v1/payment?reqKey=${
        this.props.paymentToken
      }`,
      headers: {
        Authorization: this.props.authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    })
      .then(res => {
        if (res.status === 200) {
          // TODO: show information of transaction to user
          this.setState({ payment: res.data });
        }
      })
      .catch(error => {
        if (error.response && error.response.data.error) {
          toastr.error(
            error.response.data.error.title,
            error.response.data.error.description,
          );
        }
      });

    if (Stripe) { // eslint-disable-line
      this.stripe = Stripe('pk_live_k7vSwmJljQsragVTG4iemS2p'); // eslint-disable-line
      const elements = this.stripe.elements();

      // Create an instance of the card Element.
      this.card = elements.create('card', {
        hidePostalCode: true,
        style: {
          base: {
            color: '#303238',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            '::placeholder': {
              color: '#ccc',
            },
          },
          invalid: {
            color: '#e5424d',
            ':focus': {
              color: '#303238',
            },
          },
        },
      });
    }

    // Add an instance of the card Element into the `card-element` <div>.
    this.card.mount('#card-element');
  }

  async handleSubmit() {
    this.setState({ submitting: true });
    const [err, response] = await to(this.stripe.createToken(this.card));
    if (err) {
      toastr.error('error', err);
      this.setState({ submitting: false });
      return;
    }
    if (response.error) {
      toastr.error('error', response.error.message);
      this.setState({ submitting: false });
      return;
    }
    axios({
      method: 'post',
      url: `${config.api.serverUrl}/v1/payment/submit`,
      data: {
        stripeToken: response.token.id,
        reqKey: this.props.paymentToken,
      },
      headers: {
        Authorization: this.props.authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    })
      .then(res => {
        if (res.status === 200) {
          // TODO: show information of transaction to user
          toastr.success(
            'Congratulations',
            `${this.props.tokenAmount} ${
              this.props.tokenSymbol
            } were successfully purchased.`,
          );
          this.props.showToggle();
          this.setState({ submitting: false });
          this.props.onSubmitFinish();
          // this.props.setStage(c.RECEIPT);
        }
      })
      .catch(error => {
        if (error.response && error.response.data.error) {
          toastr.error(
            error.response.data.error.title,
            error.response.data.error.description,
          );
        }
        this.setState({ submitting: false });
      });
  }

  render() {
    if (this.card) {
      this.card.update({
        disabled: this.state.submitting,
      });
    }
    return (
      <div className={s.addPaymentForm}>
        <p className={s.headerTitle}>Payment card info</p>
        <br />
        <div className={s.formContainer} style={{ alignItems: 'inherit' }}>
          <ControlLabel>Card Number</ControlLabel>
          <div id="card-element" />
          <br />
        </div>
        <Button
          disabled={this.state.submitting}
          onClick={this.handleSubmit}
          bsStyle="success"
          className={cx(s.customBtn, s.mt15, s.width100)}
        >
          {' '}
          {this.state.submitting ? (
            <span>Processing ...</span>
          ) : (
            <span>
              Pay {this.state.payment && this.state.payment.currencyAmount}{' '}
              {this.state.payment && this.state.payment.currencyAbbr}
            </span>
          )}
        </Button>
        <br />
        <br />
        <p
          role="presentation"
          onClick={() => this.props.setStage(c.SELECT_PAYMENT_METHOD)}
          className={s.back}
          style={{ cursor: 'pointer' }}
        >
          <i className="fa fa-arrow-left" /> Back
        </p>
      </div>
    );
  }
}

StripePaymentForm.propTypes = {
  setStage: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  tokenAmount: PropTypes.number.isRequired,
  authToken: PropTypes.string.isRequired,
  paymentToken: PropTypes.string.isRequired,
  showToggle: PropTypes.func.isRequired,
  onSubmitFinish: PropTypes.func.isRequired,
};

const mapState = state => ({
  authToken: state.userInfo.authToken,
});

const mapDispatch = dispatch => ({
  showToggle() {
    dispatch({ type: C.TOGGLE_BUY_TOKEN_MODAL });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(StripePaymentForm));
