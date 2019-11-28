import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tab } from 'react-bootstrap';
import cx from 'classnames';
import swal from 'sweetalert';
import { toastr } from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
import { ReactTabulator } from 'react-tabulator';
import { numberFormat, relu } from '../../utils';

// import 'react-tabulator/lib/styles.css'; // default theme
// import 'react-tabulator/css/bootstrap/tabulator_bootstrap.min.css';
import { removeOrder } from '../../actions/order';
import Tabs from '../Tabs';
import themify from '../../themify';
import s from './UserInfo.css';
import config from '../../config';
// import List from '../List/List';

// import ListHash from '../List/ListHash';
/* eslint-disable css-modules/no-undef-class */

const btcTokenId = 2;

const orderStatus = [
  {
    id: 1,
    name: 'Filled',
  },
  {
    id: 2,
    name: 'Pending',
  },
  {
    id: 3,
    name: 'Cancelled',
  },
  {
    id: 4,
    name: 'Rejected',
  },
  {
    id: 5,
    name: 'Suspended',
  },
  {
    id: 6,
    name: 'Expired',
  },
];

const tradeHistoryColumns = currencySymbol => [
  // eslint-disable-line
  { title: 'Pair', field: 'pair', align: 'left', minWidth: 100 },
  { title: 'Type', field: 'type', align: 'left', minWidth: 80 },
  { title: 'Side', field: 'side', align: 'left', minWidth: 80 },
  {
    title: 'Price',
    field: 'price',
    align: 'right',
    minWidth: 100,
    // formatter: cell => {
    //   const value = cell.getValue();
    //   return `<span>${currencySymbol} ${value}</span>`;
    // },
  },
  {
    title: 'Amount',
    field: 'amount',
    align: 'right',
    minWidth: 100,
  },
  {
    title: 'Total',
    field: 'total',
    align: 'right',
    minWidth: 100,
    formatter: cell => {
      const value = cell.getValue();
      return `<span>${numberFormat(Number(value), 12)}</span>`;
    },
  },
  // {
  //   title: 'Fee',
  //   field: 'fee',
  //   align: 'left',
  //   minWidth: 100,
  //   formatter: cell => {
  //     const value = cell.getValue();
  //     return `<span>${numberFormat(Number(value))}</span>`;
  //   },
  // },
  { title: 'Timestamp', field: 'timestamp', align: 'left', minWidth: 120 },
];

const walletsColumns = currencySymbol => [
  {
    title: 'Name',
    field: 'name',
    align: 'left',
    formatter: cell => {
      const value = cell.getRow().getData();
      return `<span>
        <img
          width="20"
          height="20"
          src=${`${config.api.serverUrl}/${value.logoUrl}`}
          alt="logo"
        /> ${value.name}
      </span>`;
    },
  },
  { title: 'Balance', field: 'balance', align: 'left' },
  { title: 'Reserved Balance', field: 'reservedBalance', align: 'left' },
  { title: 'Locked Reward', field: 'lockedReward', align: 'left' },
  {
    title: 'Value',
    field: 'value',
    align: 'left',
    formatter: cell => {
      const value = cell.getValue();
      return `<span>${currencySymbol} ${value}</span>`;
    },
  },
  // {
  //   title: 'P&L',
  //   field: 'profitNLoss',
  //   align: 'left',
  //   formatter: cell => {
  //     const value = cell.getValue();
  //     return `<span>${value}%</span>`;
  //   },
  // },
  {
    title: 'Address',
    field: 'address',
    align: 'left',
    formatter: cell => {
      const value = cell.getValue();
      return `  <div>
      <span style="font-family: monospace; font-size: 11px;">${value.substring(
        0,
        15,
      )}...</span>
      &nbsp;
      <button
        style="
          height: auto;
          background: transparent;
          border: 0;
        "
      >
        <span class="fa fa-copy" style="color:#a5bdea;" />
      </button>
    </div>`;
    },
    cellClick: (e, cell) => {
      copy(cell.getValue());
      toastr.info('copied!');
    },
  },
];

class UserInfo extends Component {
  render() {
    const orderColumns = currencySymbol => [
      // eslint-disable-line
      { title: 'Pair', field: 'pair', align: 'left', minWidth: 100 },
      { title: 'Type', field: 'type', align: 'left', minWidth: 80 },
      { title: 'Side', field: 'side', align: 'left', minWidth: 80 },
      {
        title: 'Price',
        field: 'price',
        align: 'right',
        minWidth: 100,
        // formatter: cell => {
        //   const value = cell.getValue();
        //   return `<span>${currencySymbol} ${value}</span>`;
        // },
      },
      { title: 'Filled', field: 'filled', align: 'right', minWidth: 80 },
      { title: 'Amount', field: 'amount', align: 'right', minWidth: 100 },
      { title: 'Total', field: 'total', align: 'right', minWidth: 100 },
      { title: 'Status', field: 'status', align: 'left', minWidth: 100 },
      { title: 'Timestamp', field: 'timestamp', align: 'left', minWidth: 120 },
      {
        title: 'Cancel',
        align: 'left',
        minWidth: 100,
        formatter: () =>
          `<span class="far fa-times-circle" style="color:#a5bdea;" />`,
        cellClick: (e, cell) => {
          swal({
            title: 'Are you sure?',
            text: 'Once you cancel order, you order will be canceled!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          }).then(willDelete => {
            if (willDelete) {
              this.props.cancelOpenOrder(cell.getRow().getData().id);
            }
          });
        },
      },
    ];

    const baseCurrency = this.props.currencies.find(
      item => item.id === this.props.baseCurrencyId,
    );

    const btcUsdPrice = this.props.tokens.find(item => item.symbol === 'BTC')
      .usdPrice;

    // A function for calculate profit & loss
    const calculateProfitNLossPercentage = (
      transactionHistory,
      currentTokenValue,
      orderHistory,
    ) => {
      const withdrawHistory =
        transactionHistory && transactionHistory.withdraw
          ? transactionHistory.withdraw
          : [];
      const depositHistory =
        transactionHistory && transactionHistory.deposit
          ? transactionHistory.deposit
          : [];
      const withdrawAccumulatedValue = withdrawHistory.map(
        item => Number(item.usdPriceAtTransactionTime) * Number(item.amount),
      );
      const depositAccumulatedValue = depositHistory.map(
        item => Number(item.usdPriceAtTransactionTime) * Number(item.amount),
      );
      // TODO: we should change this after adding new non-usd-quote pairs
      const buyTradesAccumulatedValue = orderHistory
        .filter(item => item.sideId === 1)
        .map(item => Number(item.price) * Number(item.filledAmount));
      const sellTradesAccumulatedValue = orderHistory
        .filter(item => item.sideId === 2)
        .map(item => Number(item.price) * Number(item.filledAmount));

      return depositAccumulatedValue.reduce((a, b) => a + b, 0) === 0
        ? 0
        : ((withdrawAccumulatedValue.reduce((a, b) => a + b, 0) +
            sellTradesAccumulatedValue.reduce((a, b) => a + b, 0) +
            currentTokenValue) /
            (depositAccumulatedValue.reduce((a, b) => a + b, 0) +
              buyTradesAccumulatedValue.reduce((a, b) => a + b, 0)) -
            1) *
            100;
    };

    const wallets = this.props.wallets.map(wallet => {
      const lastPrice = this.props.pairs.find(
        pair =>
          pair.baseTokenId === wallet.tokenId &&
          pair.quoteTokenId === btcTokenId,
      )
        ? this.props.pairs.find(
            pair =>
              pair.baseTokenId === wallet.tokenId &&
              pair.quoteTokenId === btcTokenId,
          ).lastPrice
        : '1';

      return {
        logoUrl: this.props.tokens.find(token => token.id === wallet.tokenId)
          .logoUrl,
        name: this.props.tokens.find(token => token.id === wallet.tokenId)
          .symbol,
        balance: numberFormat(relu(Number(wallet.balance)), 8),
        reservedBalance: numberFormat(relu(Number(wallet.reservedBalance)), 8),
        value: (
          (relu(Number(wallet.balance)) +
            relu(Number(wallet.reservedBalance))) *
          Number(lastPrice) *
          Number(btcUsdPrice) *
          Number(baseCurrency.usdRatio)
        ).toFixed(2),
        profitNLoss: calculateProfitNLossPercentage(
          this.props.transactionHistory,
          relu(Number(wallet.balance)) * Number(lastPrice),
          this.props.openOrders.filter(item => item.statusId === 1),
        ).toFixed(2),
        address: wallet.address,
        lockedReward: wallet.lockedReward
          ? Number(numberFormat(wallet.lockedReward, 8))
          : 0,
      };
    });

    return (
      <div
        className={cx(themify(s, s.customPanel, this.props.theme))}
        style={{ height: this.props.height }}
      >
        <Tabs align="left" theme={this.props.theme}>
          <Tab eventKey={0} title="Open Orders">
            <ReactTabulator
              columns={orderColumns(baseCurrency.symbolNative).filter(
                (_, i) =>
                  i !== orderColumns(baseCurrency.symbolNative).length - 2,
              )}
              key={this.props.baseCurrencyId}
              data={this.props.openOrders
                .filter(order => order.statusId === 2)
                .map(order => ({
                  ...order,
                  price:
                    order.typeId === 1
                      ? 0
                      : Number(order.price).toFixed(
                          this.props.pairs.find(
                            pair => pair.id === order.pairId,
                          ).priceDecimals * 1.5,
                        ),
                  pair: this.props.pairs.find(pair => pair.id === order.pairId)
                    .name,
                  side: order.sideId === 1 ? 'Buy' : 'Sell',
                  type: order.typeId === 1 ? 'Market' : 'Limit',
                  amount: Number(order.amount).toFixed(
                    this.props.pairs.find(pair => pair.id === order.pairId)
                      .tradeAmountDecimals,
                  ),
                  filled: Number(order.filledAmount).toFixed(
                    this.props.pairs.find(pair => pair.id === order.pairId)
                      .tradeAmountDecimals,
                  ),
                  total: (order.price * order.amount).toFixed(
                    this.props.pairs.find(pair => pair.id === order.pairId)
                      .priceDecimals * 1.5,
                  ),
                  status:
                    order.statusId &&
                    orderStatus.find(item => item.id === order.statusId) &&
                    orderStatus.find(item => item.id === order.statusId).name,
                  // ...(!order.status && { status: 'pending' }),
                  // ...(!order.filled && { filled: 0 }),
                }))
                .slice()
                .reverse()}
              options={{
                height: 'inherit',
                layout: 'fitDataFill',
                movableRows: false,
                pagination: 'local',
                paginationSize: 15,
              }}
              className={`tabulatorTheme ${this.props.theme} tabulator`}
            />
          </Tab>
          <Tab eventKey={1} title="Orders History">
            <ReactTabulator
              columns={orderColumns(baseCurrency.symbolNative).filter(
                (_, i) =>
                  i !== orderColumns(baseCurrency.symbolNative).length - 1,
              )}
              key={this.props.baseCurrencyId}
              data={this.props.orderHistory
                .map(order => {
                  let totalCost = 0;
                  let avgPrice;
                  // console.log('hi: ', order, '->', totalCost);
                  if (order.sideId === 1 && order.buyTrades.length !== 0) {
                    order.buyTrades.forEach(trade => {
                      totalCost +=
                        parseFloat(trade.price) * parseFloat(trade.amount);
                    });

                    avgPrice = totalCost / order.amount;
                  } else if (
                    order.sideId === 2 &&
                    order.sellTrades.length !== 0
                  ) {
                    order.sellTrades.forEach(trade => {
                      totalCost +=
                        parseFloat(trade.price) * parseFloat(trade.amount);
                    });
                    avgPrice = totalCost / order.amount;
                  } else if (order.price !== 0) {
                    avgPrice = order.price;
                  } else {
                    avgPrice = '-';
                  }
                  return {
                    ...order,
                    price: Number(avgPrice).toFixed(
                      this.props.pairs.find(pair => pair.id === order.pairId)
                        .priceDecimals,
                    ),
                    pair: this.props.pairs.find(
                      pair => pair.id === order.pairId,
                    ).name,
                    side: order.sideId === 1 ? 'Buy' : 'Sell',
                    type: order.typeId === 1 ? 'Market' : 'Limit',
                    amount: Number(order.amount).toFixed(
                      this.props.pairs.find(pair => pair.id === order.pairId)
                        .tradeAmountDecimals,
                    ),
                    filled: Number(order.filledAmount).toFixed(
                      this.props.pairs.find(pair => pair.id === order.pairId)
                        .tradeAmountDecimals,
                    ),
                    total:
                      order.price !== 0
                        ? (avgPrice * order.amount).toFixed(
                            this.props.pairs.find(
                              pair => pair.id === order.pairId,
                            ).priceDecimals * 1.5,
                          )
                        : '-',
                    status:
                      order.statusId &&
                      orderStatus.find(item => item.id === order.statusId) &&
                      orderStatus.find(item => item.id === order.statusId).name,
                    timestamp: order.createdAt,
                    // ...(!order.status && { status: 'pending' }),
                    // ...(!order.filled && { filled: 0 }),
                  };
                })
                .slice()
                .reverse()}
              options={{
                height: 'inherit',
                layout: 'fitDataFill',
                movableRows: false,
                pagination: 'local',
                paginationSize: 15,
              }}
              className={`tabulatorTheme ${this.props.theme} tabulator`}
            />
          </Tab>
          <Tab eventKey={2} title="Trades History">
            <ReactTabulator
              columns={tradeHistoryColumns(baseCurrency.symbolNative)}
              data={this.props.tradeHistory.slice().reverse()}
              key={this.props.baseCurrencyId}
              options={{
                height: 'inherit',
                layout: 'fitDataFill',
                movableRows: false,
                pagination: 'local',
                paginationSize: 15,
              }}
              className={`tabulatorTheme ${this.props.theme} tabulator`}
            />
          </Tab>
          <Tab eventKey={3} title="Wallets">
            {/* <List
              listType="wallets"
              height={220}
              theme={this.props.theme}
              list={wallets}
              columns={['name', 'balance', 'value', 'p&l', 'address']}
              columnNames={['Token', 'Balance', 'Value', 'P&L', 'address']}
              columnPostfixes={['', '', '']}
              colors={[{}, {}, {}]}
              rowHeight="40px"
            /> */}
            <ReactTabulator
              columns={walletsColumns(baseCurrency.symbolNative)}
              data={wallets}
              key={this.props.baseCurrencyId}
              options={{
                height: 'inherit',
                layout: 'fitDataFill',
                movableRows: false,
                pagination: 'local',
                paginationSize: 15,
              }}
              className={`tabulatorTheme ${this.props.theme} tabulator`}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

UserInfo.propTypes = {
  theme: PropTypes.string,
  openOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  orderHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  transactionHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  tradeHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  wallets: PropTypes.arrayOf(PropTypes.object).isRequired,
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  pairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  baseCurrencyId: PropTypes.number.isRequired,
  height: PropTypes.string,
  cancelOpenOrder: PropTypes.func.isRequired,
};

UserInfo.defaultProps = {
  theme: 'dark',
  height: '30vh',
};

const mapState = state => ({
  openOrders: state.userInfo.openOrders,
  orderHistory: state.userInfo.orderHistory,
  tradeHistory: state.userInfo.tradeHistory,
  transactionHistory: state.userInfo.transactionHistory,
  wallets: state.userInfo.wallets,
  tokens: state.tokens,
  pairs: state.pairs,
  currencies: state.currencies,
  baseCurrencyId: state.userInfo.profile.baseCurrencyId || 1,
  theme: state.theme,
});

const mapDispatch = dispatch => ({
  cancelOpenOrder(orderId) {
    dispatch(removeOrder(orderId));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(UserInfo));
export const WithoutRedux = withStyles(s)(UserInfo);
