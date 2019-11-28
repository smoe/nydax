import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Button,
} from 'react-bootstrap';
import cx from 'classnames';
import s from './PaypalPaymentForm.css';
import c from '../constant';
/* eslint-disable css-modules/no-undef-class */

class PaypalPaymentForm extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange = () => {};

  render() {
    return (
      <div className={s.addPaymentForm}>
        <p className={s.headerTitle}>Add new bank account</p>
        <br />
        <div className={s.formContainer} style={{ alignItems: 'inherit' }}>
          <FormGroup
            className={cx(s.customInput, s.light)}
            controlId="cardNumber"
          >
            <ControlLabel>Card Number</ControlLabel>
            <FormControl
              onChange={this.handleOnChange}
              type="text"
              name="CardNumber"
              placeholder="Card Number"
            />
          </FormGroup>
          <div className={cx(s.formInline, s.width50)}>
            <FormGroup
              className={cx(s.customInput, s.light, s.width50)}
              controlId="firstname"
            >
              <ControlLabel>Expires</ControlLabel>
              <FormControl
                onChange={this.handleOnChange}
                type="text"
                name="FirstName"
                placeholder="Month"
              />
            </FormGroup>
            <FormGroup
              className={cx(s.customInput, s.light, s.width50, s.mt25, s.ml5)}
              controlId="middlename"
            >
              <FormControl
                onChange={this.handleOnChange}
                type="text"
                name="MiddleName"
                placeholder="Year"
              />
            </FormGroup>
          </div>
          <div className={cx(s.formInline, s.left, s.width50)}>
            <FormGroup
              className={cx(s.customInput, s.light, s.width50)}
              controlId="firstname"
            >
              <ControlLabel>CVC Number</ControlLabel>
              <FormControl
                onChange={this.handleOnChange}
                type="text"
                name="FirstName"
                placeholder="CVC Number"
              />
            </FormGroup>
          </div>
          <div className={cx(s.formInline, s.width50)}>
            <FormGroup
              className={cx(s.customInput, s.light, s.width100)}
              controlId="firstname"
            >
              <ControlLabel>Billing Address</ControlLabel>
              <FormControl
                onChange={this.handleOnChange}
                type="text"
                name="FirstName"
                placeholder="Billing Address"
              />
            </FormGroup>
          </div>
        </div>
        <Row>
          <Col xs={6}>
            <Button
              onClick={() => this.props.setStage(c.SELECT_PAYMENT_METHOD)}
              bsStyle="primary"
              className={cx(s.customBtn, s.mt15, s.width100)}
            >
              <i className="fa fa-arrow-left" /> Back
            </Button>
          </Col>
          <Col xs={6}>
            <Button
              bsStyle="success"
              className={cx(s.customBtn, s.mt15, s.width100)}
            >
              Finish
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

PaypalPaymentForm.propTypes = {
  setStage: PropTypes.string.isRequired,
};

export default withStyles(s)(PaypalPaymentForm);
