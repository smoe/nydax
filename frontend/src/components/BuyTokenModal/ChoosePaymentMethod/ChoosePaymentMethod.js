import React, { Component } from 'react';
// import cx from 'classnames';
import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChoosePaymentMethod.css';
import stripeIcon from './stripe.svg';
// import paypalIcon from './paypal.svg';
import c from '../constant';
/* eslint-disable css-modules/no-undef-class */

class ChoosePaymentMethod extends Component {
  render() {
    return (
      <div className={s.choosePaymentType}>
        <p className={s.headerTitle}>Choose your payment service</p>
        <p className={s.des}>More options will be added soon</p>
        <div className={s.iconRow}>
          <div
            role="button"
            tabIndex="0"
            onKeyPress={() => {
              this.props.selectPaymentMethod('stripe');
              this.props.setStage(c.PAYMENT_FORM);
            }}
            onClick={() => {
              this.props.selectPaymentMethod('stripe');
              this.props.setStage(c.PAYMENT_FORM);
            }}
            className={s.item}
          >
            <img src={stripeIcon} alt="Payment icon" />
            <span>Stripe</span>
          </div>
          {/* <div
            role="button"
            tabIndex="-1"
            onKeyPress={() => this.props.selectPaymentMethod('paypal')}
            onClick={() => this.props.selectPaymentMethod('paypal')}
            className={s.item}
          >
            <img src={paypalIcon} alt="Payment icon" />
            <span>PayPal</span>
          </div> */}
        </div>
        {/* <div className={s.iconRow}>
          <div
            role="button"
            tabIndex="-2"
            onKeyPress={() => this.props.selectPaymentMethod('paypal')}
            onClick={() => this.props.selectPaymentMethod('paypal')}
            className={s.item}
          >
            <img src={paypalIcon} alt="Payment icon" />
            <span>PayPal</span>
          </div>
          <div
            role="button"
            tabIndex="-3"
            onKeyPress={() => this.props.selectPaymentMethod('paypal')}
            onClick={() => this.props.selectPaymentMethod('paypal')}
            className={s.item}
          >
            <img src={paypalIcon} alt="Payment icon" />
            <span>PayPal</span>
          </div>
        </div> */}
        {/* <Button
          bsStyle="primary"
          className={cx(s.customBtn, s.mt15, s.width100)}
        >
          <i className="fa fa-arrow-left" /> Back
        </Button> */}
        <br />
        <p
          role="presentation"
          onClick={() => this.props.setStage(c.SELECT_ORDER)}
          className={s.back}
          style={{ cursor: 'pointer' }}
        >
          <i className="fa fa-arrow-left" /> Back
        </p>
      </div>
    );
  }
}

ChoosePaymentMethod.propTypes = {
  selectPaymentMethod: PropTypes.func.isRequired,
  setStage: PropTypes.func.isRequired,
};
export default withStyles(s)(ChoosePaymentMethod);
