import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChoosePaymentMethod.css';
import paypalIcon from './paypal.svg';
/* eslint-disable css-modules/no-undef-class */

class ChoosePaymentMethod extends Component {
  constructor(props) {
    super(props);

    this.onSelectAccountType = this.onSelectAccountType.bind(this);
  }

  onSelectAccountType(type) {
    this.props.selectPaymentMethod(type);
  }

  render() {
    return (
      <div className={s.choosePaymentType}>
        <p className={s.headerTitle}>Add new bank account</p>
        <p className={s.des}>Choose Account Type</p>
        <div className={s.iconRow}>
          <div
            role="button"
            tabIndex="0"
            onKeyPress={() => this.onSelectAccountType('paypal')}
            onClick={() => this.onSelectAccountType('paypal')}
            className={s.item}
          >
            <img src={paypalIcon} alt="Payment icon" />
            <span>PayPal</span>
          </div>
          <div
            role="button"
            tabIndex="-1"
            onKeyPress={() => this.onSelectAccountType('paypal')}
            onClick={() => this.onSelectAccountType('paypal')}
            className={s.item}
          >
            <img src={paypalIcon} alt="Payment icon" />
            <span>PayPal</span>
          </div>
        </div>
        <div className={s.iconRow}>
          <div
            role="button"
            tabIndex="-2"
            onKeyPress={() => this.onSelectAccountType('paypal')}
            onClick={() => this.onSelectAccountType('paypal')}
            className={s.item}
          >
            <img src={paypalIcon} alt="Payment icon" />
            <span>PayPal</span>
          </div>
          <div
            role="button"
            tabIndex="-3"
            onKeyPress={() => this.onSelectAccountType('paypal')}
            onClick={() => this.onSelectAccountType('paypal')}
            className={s.item}
          >
            <img src={paypalIcon} alt="Payment icon" />
            <span>PayPal</span>
          </div>
        </div>
      </div>
    );
  }
}

ChoosePaymentMethod.propTypes = {
  selectPaymentMethod: PropTypes.func.isRequired,
};
export default withStyles(s)(ChoosePaymentMethod);
