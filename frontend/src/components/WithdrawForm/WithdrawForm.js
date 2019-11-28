import React from 'react';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import WAValidator from 'wallet-address-validator';
import { withdrawSubmit } from '../../actions/transaction';
import { validateWithdrawAmount } from '../../validation';
import themify from '../../themify';
import s from './WithdrawForm.css';
import C from '../../constants/actions';
/* eslint-disable css-modules/no-undef-class */

class WithdrawForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      address: null,
      selectedTokenId: props.selectedTokenId,
    };
    this.registerWithdrawal = this.registerWithdrawal.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedTokenId !== prevState.selectedTokenId) {
      return {
        selectedTokenId: nextProps.selectedTokenId,
        amount: null,
        address: '',
      };
    }
    return null;
  }

  registerWithdrawal = () => {
    const token = this.props.tokens.find(
      item => item.id === this.state.selectedTokenId,
    );

    if (!this.state.amount) {
      toastr.error('Failed!', 'Please input valid amount');
      return;
    }

    if (!this.state.address) {
      toastr.error('Failed!', 'Please fill the withdraw address');
      return;
    }

    if (
      !(
        WAValidator.validate(this.state.address, 'ETH', 'both') ||
        WAValidator.validate(this.state.address, 'BTC', 'both')
      )
    ) {
      toastr.error('Failed!', 'Please input valid withdraw address');
      return;
    }

    const validationError = validateWithdrawAmount(
      Number(this.state.amount),
      Number(token.minimumWithdrawalAmount),
      Number(token.tokenCap),
      Number(token.decimalPrecision),
    );

    if (validationError.length > 0) {
      toastr.error('Failed!', validationError);
      return;
    }

    swal({
      title: 'Are you sure?',
      text: `You are going to withdraw ${
        this.state.amount
      } amount of your account to this address: ${this.state.address.substring(
        0,
        20,
      )}...`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(submit => {
      if (submit) {
        this.props.toggleWithdrawing();
        this.props.onSubmit({
          typeId: 1,
          amount: Number(this.state.amount),
          destination: this.state.address,
          tokenId: this.state.selectedTokenId,
        });
      }
    });
  };

  render() {
    const token = this.props.tokens.find(
      item => item.id === this.state.selectedTokenId,
    );
    const calculateFee = () =>
      this.state.amount ? Number(token.withdrawalFee) : 0;
    return (
      <div
        className={themify(s, s.root, this.props.theme)}
        style={{ padding: 15 }}
      >
        <p className={s.tokenName}>Withdraw {token.name}</p>
        <div className={s.withdrawInputContainer}>
          {/* <img
            alt="logo"
            className={s.tokenIcon}
            src={token.logoUrl}
            height={50}
            width={50}
          /> */}
          <div style={{ width: '90%' }}>
            <p className={s.inputLabel}>
              {token.symbol} wallet withdraw address
            </p>
            <div className={s.value}>
              <FormGroup controlId="withdrawAddress" className={s.customInput}>
                <FormControl
                  onChange={e => this.setState({ address: e.target.value })}
                  type="text"
                  value={this.state.address}
                  name="address"
                  placeholder="Paste your withdrawal address here…"
                />
              </FormGroup>
            </div>
          </div>
        </div>
        <div className={s.withdrawInputContainer} style={{ marginTop: 15 }}>
          <div style={{ width: '90%' }}>
            <p className={s.inputLabel}>Amount</p>
            <div className={s.value}>
              <FormGroup controlId="withdrawAddress" className={s.customInput}>
                <FormControl
                  onChange={e =>
                    this.setState({
                      amount:
                        e.target.value >= 0 && e.target.value < 1
                          ? e.target.value
                          : Math.abs(e.target.value),
                    })
                  }
                  value={this.state.amount || ''}
                  type="number"
                  name="amount"
                  step={
                    10 **
                    -(`${token.minimumWithdrawalAmount}`.split('.').length > 1
                      ? `${token.minimumWithdrawalAmount}`.split('.')[1].length
                      : 0)
                  }
                  min={0}
                  placeholder="0.00000"
                />
              </FormGroup>
            </div>
          </div>
        </div>
        <div className={s.dashedDivider} style={{ marginTop: 15 }} />
        <div className={s.feeContainer}>
          <p className={s.feeLabel}>Fee</p>
          <p className={s.feeValue}>
            {calculateFee()} {token.name}
          </p>
        </div>
        <div className={s.dashedDivider} />
        <Button
          onClick={this.registerWithdrawal}
          disabled={this.props.withdrawing}
          className={s.customBtn}
        >
          Submit
        </Button>
      </div>
    );
  }
}

WithdrawForm.propTypes = {
  theme: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  // wallets: PropTypes.arrayOf(PropTypes.object).isRequired,
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTokenId: PropTypes.number.isRequired,
  withdrawing: PropTypes.bool.isRequired,
  toggleWithdrawing: PropTypes.func.isRequired,
};

WithdrawForm.defaultProps = {
  theme: 'dark',
};

const mapState = state => ({
  tokens: state.tokens,
  wallets: state.userInfo.wallets,
  selectedTokenId: state.selectedTokenId,
  theme: state.theme,
  withdrawing: state.withdrawing,
});

const mapDispatch = dispatch => ({
  onSubmit(transaction) {
    dispatch(withdrawSubmit(transaction));
  },
  toggleWithdrawing() {
    dispatch({ type: C.TOGGLE_WITHDRAWING });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(WithdrawForm));
