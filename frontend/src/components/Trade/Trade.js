import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Tab,
  Row,
  Col,
  FormGroup,
  FormControl,
  InputGroup,
  Checkbox,
} from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import themify from '../../themify';
import Panel from '../Panel/Panel';
import Tabs from '../Tabs';
import s from './Trade.css';
import { validateTradeAmount, validateTradePrice } from '../../validation';
// import history from '../../history';
import routes from '../../constants/routes';
import { sendNewOrder } from '../../actions/order';
import { errors } from '../../constants/messages';
import { numberFormat } from '../../utils';
import PercentButton from './PercentButton';
import WalletIcon from './WalletIcon';

/* eslint-disable css-modules/no-undef-class */

const percents = [25, 50, 75, 100];
const calculateTradeFee = (token, volume) => {
  // eslint-disable-line
  // FIXME: make it work correctly

  // let index = token.tradeFeeThresholds.findIndex(item => item > volume);
  // index = index === -1 ? token.tradeFeeThresholds.length : index;
  // return token.tradeFees[index];
  return { taker: 0, maker: 0 };
};

const maxBTCPerTrade = 2;

class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.pair = props.pairs.find(pair => pair.id === props.selectedPairId);

    this.state = {
      buyPrice: this.pair.lastPrice,
      buyAmount: null,
      buyAtMarket: false,
      sellPrice: this.pair.lastPrice,
      sellAmount: null,
      sellAtMarket: false,
    };

    this.baseToken = props.tokens.find(
      item => item.symbol === this.pair.name.split('/')[0],
    );
    this.quoteToken = props.tokens.find(
      item => item.symbol === this.pair.name.split('/')[1],
    );

    this.handleSubmitBuy = this.handleSubmitBuy.bind(this);
    this.handleSubmitSell = this.handleSubmitSell.bind(this);
    this.sellPart = this.sellPart.bind(this);
    this.buyPart = this.buyPart.bind(this);
    this.getWalletBalance = this.getWalletBalance.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const lastPair = this.props.pairs.find(
      pair => pair.id === this.props.selectedPairId,
    );
    this.pair = nextProps.pairs.find(
      pair => pair.id === nextProps.selectedPairId,
    );
    this.baseToken = nextProps.tokens.find(
      item => item.symbol === this.pair.name.split('/')[0],
    );
    this.quoteToken = nextProps.tokens.find(
      item => item.symbol === this.pair.name.split('/')[1],
    );

    // new pair is selected
    if (lastPair && lastPair.name !== this.pair.name) {
      this.setState({
        buyPrice: this.pair.lastPrice,
        sellPrice: this.pair.lastPrice,
        buyAmount: null,
        sellAmount: null,
      });
    }
  }

  getWalletBalance = symbol => {
    const token = this.props.tokens.find(item => item.symbol === symbol);
    let wallet;
    if (token) {
      wallet = this.props.wallets.find(item => item.tokenId === token.id);
    }
    if (wallet) {
      return wallet.balance;
    }
    return 0;
  };

  getTokenDecimals = symbol => {
    const token = this.props.tokens.find(item => item.symbol === symbol);
    return token.decimalPrecision;
  };

  sellPart = () => {
    const baseTokenBalance =
      this.props.isLoggedIn && this.pair
        ? this.getWalletBalance(this.pair.name.split('/')[0])
        : 0;
    const baseTokenDecimals = this.getTokenDecimals(
      this.pair.name.split('/')[0],
    );
    const quoteTokenDecimals = this.getTokenDecimals(
      this.pair.name.split('/')[1],
    );
    return (
      <div className={themify(s, s.sellContainer, this.props.theme)}>
        <div className={s.innerSpace}>
          <span className={s.walletInfo}>
            <p>Sell {this.pair && this.pair.name.split('/')[0]}</p>
            <span>
              <WalletIcon theme={this.props.theme} />
              &nbsp;&nbsp;
              {`${numberFormat(baseTokenBalance, baseTokenDecimals)} ${this
                .pair && this.pair.name.split('/')[0]}`}
            </span>
          </span>
          <FormGroup className={s.tradeInput}>
            <FormControl
              className={s.amountInput}
              onChange={e =>
                this.setState({
                  sellAmount:
                    e.target.value >= 0 && e.target.value < 1
                      ? e.target.value
                      : Math.abs(e.target.value),
                })
              }
              name="sellAmount"
              value={this.state.sellAmount || ''}
              type="number"
              placeholder="Amount"
              min={0}
              // max={baseTokenBalance}
              // min={this.quoteToken.minimumTradeAmount}
            />
            <FormControl.Feedback>
              <select className={s.currencySelect}>
                <option value={this.pair}>
                  {this.pair && this.pair.name.split('/')[0]}
                </option>
              </select>
            </FormControl.Feedback>
          </FormGroup>
          <span className={s.atMarketTick}>
            <p>{!this.state.sellAtMarket && 'At Price'}</p>
            <Checkbox
              onChange={() =>
                this.setState({
                  sellAtMarket: !this.state.sellAtMarket,
                  sellPrice: this.pair.lastPrice,
                })
              }
              name="sellAtMarket"
              className={s.isMarket}
            >
              At Market
            </Checkbox>
          </span>
          {!this.state.sellAtMarket && (
            <React.Fragment>
              <FormGroup className={s.tradeInput}>
                <InputGroup>
                  <InputGroup.Addon className={s.beforInput}>
                    {this.pair && this.pair.name.split('/')[1]}
                  </InputGroup.Addon>
                  <FormControl
                    className={s.priceInput}
                    disabled={this.state.sellAtMarket}
                    onChange={e =>
                      this.setState({
                        sellPrice:
                          e.target.value >= 0 && e.target.value < 1
                            ? e.target.value
                            : Math.abs(e.target.value),
                      })
                    }
                    value={
                      this.state.sellAtMarket === true
                        ? ''
                        : this.state.sellPrice
                    }
                    name="sellPrice"
                    type="number"
                    min={0}
                    placeholder={
                      this.state.sellAtMarket ? 'Market Price' : 'Price'
                    }
                  />
                </InputGroup>
              </FormGroup>
              <div style={{ display: 'flex' }}>
                {percents.map(item => (
                  <PercentButton
                    key={item}
                    theme={this.props.theme}
                    width="25%"
                    amount={baseTokenBalance}
                    percent={item}
                    onClick={amount => {
                      if (
                        amount - 0.5 * 10 ** -this.pair.tradeAmountDecimals >
                        0
                      ) {
                        this.setState({
                          sellAmount: (
                            amount -
                            0.5 * 10 ** -this.pair.tradeAmountDecimals
                          ).toFixed(this.pair.tradeAmountDecimals),
                        });
                      }
                    }}
                  />
                ))}
              </div>
              <div className={s.transactionFee}>
                <span>Trx Fee:</span>
                <span>
                  {`maker: (${this.pair.makerFee * 100}%) / taker: (${this.pair
                    .takerFee * 100}%)`}
                </span>
              </div>
            </React.Fragment>
          )}
        </div>

        <div className={s.innerSpace} style={{ paddingTop: 0 }}>
          <div className={s.totalCost}>
            <span>
              {this.state.sellAtMarket === true ? 'Total (estimated)' : 'Total'}
              :
            </span>
            <span>
              {this.state.sellPrice &&
                numberFormat(
                  this.state.sellPrice * this.state.sellAmount,
                  quoteTokenDecimals,
                )}
              ({this.pair && this.pair.name.split('/')[1]})
            </span>
          </div>
          <div className={s.sellBtn}>
            <button
              className={this.props.isLoggedIn ? s.sell : s.login}
              onClick={
                this.props.isLoggedIn
                  ? this.handleSubmitSell
                  : () => {
                      // history.push(routes.LOGIN);
                      window.location.href = `${routes.LOGIN}?return_to=${
                        routes.TRADING_PLATFORM
                      }`;
                    }
              }
            >
              {this.props.isLoggedIn ? 'Sell' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  buyPart = () => {
    const quoteTokenBalance =
      this.props.isLoggedIn && this.pair
        ? this.getWalletBalance(this.pair.name.split('/')[1])
        : 0;
    const quoteTokenDecimals = this.getTokenDecimals(
      this.pair.name.split('/')[1],
    );

    return (
      <div className={themify(s, s.buyContainer, this.props.theme)}>
        <div className={s.innerSpace}>
          <span className={s.walletInfo}>
            <p>Buy {this.pair && this.pair.name.split('/')[0]}</p>
            <span>
              <WalletIcon theme={this.props.theme} />
              &nbsp;&nbsp;
              {`${numberFormat(quoteTokenBalance, quoteTokenDecimals)} ${this
                .pair && this.pair.name.split('/')[1]}`}
            </span>
          </span>
          <FormGroup className={s.tradeInput}>
            <FormControl
              className={s.amountInput}
              onChange={e =>
                this.setState({
                  buyAmount:
                    e.target.value >= 0 && e.target.value < 1
                      ? e.target.value
                      : Math.abs(e.target.value),
                })
              }
              name="buyAmount"
              value={this.state.buyAmount || ''}
              type="number"
              placeholder="Amount"
              min={0}
            />
            <FormControl.Feedback>
              <select className={s.currencySelect}>
                <option value={this.pair}>
                  {this.pair && this.pair.name.split('/')[0]}
                </option>
              </select>
            </FormControl.Feedback>
          </FormGroup>
          <span className={s.atMarketTick}>
            <p>{!this.state.buyAtMarket && 'At Price'}</p>
            <Checkbox
              onChange={() =>
                this.setState({
                  buyAtMarket: !this.state.buyAtMarket,
                  buyPrice: this.pair.lastPrice,
                })
              }
              name="buyAtMarket"
              className={s.isMarket}
            >
              At Market
            </Checkbox>
          </span>
          {!this.state.buyAtMarket && (
            <React.Fragment>
              <FormGroup className={s.tradeInput}>
                <InputGroup>
                  <InputGroup.Addon className={s.beforInput}>
                    {this.pair && this.pair.name.split('/')[1]}
                  </InputGroup.Addon>
                  <FormControl
                    className={s.priceInput}
                    disabled={this.state.buyAtMarket}
                    onChange={e =>
                      this.setState({
                        buyPrice:
                          e.target.value >= 0 && e.target.value < 1
                            ? e.target.value
                            : Math.abs(e.target.value),
                      })
                    }
                    value={
                      this.state.buyAtMarket === true ? '' : this.state.buyPrice
                    }
                    name="buyPrice"
                    min={0}
                    type="number"
                    placeholder={
                      this.state.buyAtMarket ? 'Market Price' : 'Price'
                    }
                  />
                </InputGroup>
              </FormGroup>
              <div style={{ display: 'flex' }}>
                {percents.map(item => (
                  <PercentButton
                    key={item}
                    theme={this.props.theme}
                    width="25%"
                    amount={quoteTokenBalance}
                    percent={item}
                    onClick={amount => {
                      if (
                        amount / (this.state.buyPrice || this.pair.lastPrice) -
                          0.5 * 10 ** -this.pair.tradeAmountDecimals >
                        0
                      ) {
                        this.setState({
                          buyAmount: (
                            amount /
                              (this.state.buyPrice || this.pair.lastPrice) -
                            0.5 * 10 ** -this.pair.tradeAmountDecimals
                          ).toFixed(this.pair.tradeAmountDecimals),
                        });
                      }
                    }}
                  />
                ))}
              </div>
              <div className={s.transactionFee}>
                <span>Trx Fee:</span>
                <span>{`maker: (${this.pair.makerFee * 100}%) / taker: (${this
                  .pair.takerFee * 100}%)`}</span>
              </div>
            </React.Fragment>
          )}
        </div>

        <div className={s.innerSpace} style={{ paddingTop: 0 }}>
          <div className={s.totalCost}>
            <span>
              {this.state.buyAtMarket === true ? 'Total (estimated)' : 'Total'}:
            </span>
            <span>
              {this.state.buyPrice &&
                numberFormat(
                  this.state.buyPrice * this.state.buyAmount,
                  quoteTokenDecimals,
                )}{' '}
              ({this.pair && this.pair.name.split('/')[1]})
            </span>
          </div>

          <div className={s.buyBtn}>
            <button
              className={this.props.isLoggedIn ? s.buy : s.login}
              onClick={
                this.props.isLoggedIn
                  ? this.handleSubmitBuy
                  : () => {
                      // history.push(routes.LOGIN);
                      window.location.href = `${routes.LOGIN}?return_to=${
                        routes.TRADING_PLATFORM
                      }`;
                    }
              }
            >
              {this.props.isLoggedIn ? 'Buy' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  handleSubmitSell(event) {
    const sellPrice = this.state.sellPrice || this.pair.lastPrice;

    if (!this.state.sellAmount) {
      toastr.error(
        errors.ORDER_FAILED_ERROR_TITLE,
        errors.ORDER_FAILED_AMOUNT_VALIDATION,
      );
      return;
    }

    if (!sellPrice) {
      toastr.error(
        errors.ORDER_FAILED_ERROR_TITLE,
        errors.ORDER_FAILED_PRICE_VALIDATION,
      );
      return;
    }

    if (
      !this.state.sellAtMarket &&
      this.state.sellAmount * sellPrice < this.quoteToken.minimumTradeAmount
    ) {
      toastr.error(
        errors.ORDER_FAILED_ERROR_TITLE,
        errors.ORDER_FAILED_TOTAL_VALIDATION(
          this.quoteToken.minimumTradeAmount,
        ),
      );
      return;
    }

    if (this.state.sellAmount > this.getWalletBalance(this.baseToken.symbol)) {
      toastr.error(
        errors.ORDER_FAILED_ERROR_TITLE,
        errors.BALANCE_IS_NOT_ENOUGH,
      );
      return;
    }

    // TODO: maxBTCPerTrade / this.pair.lastPrice is based on that we have all pairs quoted with BTC
    let validationError = validateTradeAmount(
      Number(this.state.sellAmount),
      Number((maxBTCPerTrade / this.pair.lastPrice).toFixed(6)),
      Number(this.pair.tradeAmountDecimals),
    );

    if (validationError.length > 0) {
      toastr.error(errors.ORDER_FAILED_ERROR_TITLE, validationError);
      return;
    }

    validationError = validateTradePrice(
      Number(sellPrice),
      Number((Number(this.pair.lastPrice) * 0.8).toFixed(6)),
      Number((Number(this.pair.lastPrice) * 1.2).toFixed(6)),
      Number(this.pair.priceDecimals),
    );

    if (validationError.length > 0) {
      toastr.error(errors.ORDER_FAILED_ERROR_TITLE, validationError);
      return;
    }

    this.props.onTrade({
      pairId: this.props.selectedPairId,
      price: Number(sellPrice),
      amount: Number(this.state.sellAmount),
      sideId: 2,
      typeId: this.state.sellAtMarket ? 1 : 2,
    });

    event.preventDefault();
  }

  handleSubmitBuy(event) {
    const buyPrice = this.state.buyPrice || this.pair.lastPrice;

    if (!this.state.buyAmount) {
      toastr.error(
        errors.ORDER_FAILED_ERROR_TITLE,
        errors.ORDER_FAILED_AMOUNT_VALIDATION,
      );
      return;
    }

    if (!buyPrice) {
      toastr.error(
        errors.ORDER_FAILED_ERROR_TITLE,
        errors.ORDER_FAILED_PRICE_VALIDATION,
      );
      return;
    }

    if (this.state.buyAmount * buyPrice < this.quoteToken.minimumTradeAmount) {
      toastr.error(
        errors.ORDER_FAILED_ERROR_TITLE,
        errors.ORDER_FAILED_TOTAL_VALIDATION(
          this.quoteToken.minimumTradeAmount,
        ),
      );
      return;
    }

    if (
      buyPrice * this.state.buyAmount >
      this.getWalletBalance(this.quoteToken.symbol)
    ) {
      toastr.error(
        errors.ORDER_FAILED_ERROR_TITLE,
        errors.BALANCE_IS_NOT_ENOUGH,
      );
      return;
    }

    // TODO: maxBTCPerTrade / this.pair.lastPrice is based on that we have all pairs quoted with BTC
    let validationError = validateTradeAmount(
      Number(this.state.buyAmount),
      Number((maxBTCPerTrade / this.pair.lastPrice).toFixed(6)),
      Number(this.pair.tradeAmountDecimals),
    );

    if (validationError.length > 0) {
      toastr.error(errors.ORDER_FAILED_ERROR_TITLE, validationError);
      return;
    }

    validationError = validateTradePrice(
      Number(buyPrice),
      Number((Number(this.pair.lastPrice) * 0.8).toFixed(6)),
      Number((Number(this.pair.lastPrice) * 1.2).toFixed(6)),
      Number(this.pair.priceDecimals),
    );

    if (validationError.length > 0) {
      toastr.error(errors.ORDER_FAILED_ERROR_TITLE, validationError);
      return;
    }

    this.props.onTrade({
      pairId: this.props.selectedPairId,
      price: Number(buyPrice),
      amount: Number(this.state.buyAmount),
      sideId: 1,
      typeId: this.state.buyAtMarket ? 1 : 2,
    });

    event.preventDefault();
  }

  handleViewTabs = () => {
    if (this.props.showBuyNSellTabs) {
      return (
        <Tabs
          theme={this.props.theme}
          // align="left"
          defaultActiveKey={1}
        >
          <Tab
            eventKey={1}
            title={<span style={{ fontSize: '16px' }}>Buy</span>}
          >
            <Col xs={12}>{this.buyPart()}</Col>
          </Tab>
          <Tab
            eventKey={2}
            title={<span style={{ fontSize: '16px' }}>Sell</span>}
          >
            <Col xs={12}>{this.sellPart()}</Col>
          </Tab>
        </Tabs>
      );
    }
    return (
      <Row>
        <Col sm={6} xs={12} style={{ paddingRight: 0 }}>
          {this.buyPart()}
        </Col>
        <Col sm={6} xs={12} style={{ paddingLeft: 0 }}>
          {this.sellPart()}
        </Col>
      </Row>
    );
  };

  render() {
    return (
      <Panel
        style={{ height: 'inherit', overflow: 'auto' }}
        theme={this.props.theme}
      >
        {this.handleViewTabs()}
      </Panel>
    );
  }
}

Trade.propTypes = {
  theme: PropTypes.string,
  pairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedPairId: PropTypes.number.isRequired, // eslint-disable-line
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTrade: PropTypes.func.isRequired,
  showBuyNSellTabs: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  wallets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Trade.defaultProps = {
  theme: 'dark',
  showBuyNSellTabs: false,
  isLoggedIn: true,
};

const mapState = state => ({
  pairs: state.pairs,
  selectedPairId:
    state.pairs.length >= state.selectedPairId ? state.selectedPairId : 1,
  feeDiscountFactor: state.userInfo.feeDiscountFactor,
  tokens: state.tokens,
  wallets: state.userInfo.wallets,
  isLoggedIn: state.isLoggedIn,
  theme: state.theme,
});

const mapDispatch = dispatch => ({
  onTrade(orderInfo) {
    dispatch(sendNewOrder(orderInfo));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Trade));
export const WithoutRedux = withStyles(s)(Trade);
