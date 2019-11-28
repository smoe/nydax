import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  ControlLabel,
  FormControl,
  FormGroup,
  Button,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';
import cx from 'classnames';
import { validateTokenAmount } from '../../../validation';
import { numberFormat } from '../../../utils';
import config from '../../../config';
import s from './OrderForm.css';
import c from '../constant';
/* eslint-disable css-modules/no-undef-class */

class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedToken: props.token,
      amount: props.amount,
    };

    this.handleNext = this.handleNext.bind(this);
  }

  handleNext() {
    if (!this.state.amount) {
      toastr.error('Error', 'Please input a valid amount.');
      return;
    }
    const currentToken = this.props.tokens.find(
      item => item.symbol === this.state.selectedToken,
    );
    // validate amount
    const error = validateTokenAmount(
      Number(this.state.amount),
      currentToken.maxAllowedAmountForBuy,
    );
    if (error.length === 0) {
      axios({
        method: 'post',
        url: `${config.api.serverUrl}/v1/payment`,
        data: {
          tokenAmount: Number(this.state.amount),
          tokenSymbol: this.state.selectedToken,
        },
        headers: {
          Authorization: this.props.authToken,
          [config.apiKeyHeader]: config.apiKey,
        },
      })
        .then(res => {
          if (res.status === 200) {
            this.props.setPaymentToken(res.data.paymentToken);
            this.props.setStage(c.SELECT_PAYMENT_METHOD);
          }
        })
        .catch(err => {
          if (err.response && err.response.data.error) {
            toastr.error(
              err.response.data.error.title,
              err.response.data.error.description,
            );
          }
        });
    } else {
      toastr.error('Error', error);
    }
  }

  render() {
    const options = this.props.tokens
      .filter(item => item.categoryId === 2) // utility tokens
      .map(item => item.symbol);

    // const btcUsdPrice = this.props.tokens.find(item => item.symbol === 'BTC')
    //   .usdPrice;
    const currentToken = this.props.tokens.find(
      item => item.symbol === this.state.selectedToken,
    );

    return (
      <div className={s.addPaymentForm}>
        <p className={s.headerTitle}>Choose your desired token</p>
        <br />
        <div className={s.formContainer} style={{ alignItems: 'inherit' }}>
          <ControlLabel>Token</ControlLabel>
          <DropdownButton
            title={this.state.selectedToken}
            onSelect={index => {
              this.setState({ selectedToken: options[index] });
              this.props.setToken(options[index]);
            }}
          >
            {options.map((item, i) => (
              <MenuItem key={item} eventKey={i}>
                {item}
              </MenuItem>
            ))}
          </DropdownButton>
          <br />
          <FormGroup className={cx(s.customInput, s.light)} controlId="Amount">
            <ControlLabel>Amount</ControlLabel>
            <FormControl
              onChange={e => {
                this.setState({ amount: e.target.value });
                this.props.setAmount(e.target.value);
              }}
              value={this.state.amount}
              type="number"
              name="amount"
              min={0}
              placeholder="Amount"
            />
          </FormGroup>
          <br />
          <div className={s.totalCost}>
            <span>Total:</span>
            <span>
              ${' '}
              {this.state.amount &&
                Number(this.state.amount) > 0 &&
                numberFormat(
                  this.state.amount * Number(currentToken.usdPrice),
                  2,
                )}
              {!this.state.amount && 0}
            </span>
          </div>
        </div>
        <Button
          bsStyle="primary"
          onClick={() => this.handleNext()}
          className={cx(s.customBtn, s.mt15, s.width100)}
        >
          Next&nbsp;
          <i className="fa fa-arrow-right" />
        </Button>
      </div>
    );
  }
}

OrderForm.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  setStage: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  setPaymentToken: PropTypes.func.isRequired,
  setAmount: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  authToken: PropTypes.string.isRequired,
  // paymentToken: PropTypes.string.isRequired,
  // registerPayment: PropTypes.func.isRequired,
};

const mapState = state => ({
  tokens: state.tokens,
  pairs: state.pairs,
  currencies: state.currencies,
  authToken: state.userInfo.authToken,
});

export default connect(mapState)(withStyles(s)(OrderForm));
export const WithoutRedux = withStyles(s)(OrderForm);
