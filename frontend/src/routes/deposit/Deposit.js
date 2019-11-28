import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { ReactTabulator } from 'react-tabulator';
import { toastr } from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
import WalletList from '../../components/WalletList';
import WalletInfo from '../../components/WalletInfo';
import Panel from '../../components/Panel/Panel';
import DepositAddress from '../../components/DepositAddress';
import s from './Deposit.css';
import { statuses } from '../withdraw/Withdraw';

/* eslint-disable css-modules/no-undef-class */

const ResponsiveGridLayout = WidthProvider(Responsive);

const depositHistoryColumns = [
  { title: 'Token', field: 'token', align: 'left' },
  { title: 'Amount', field: 'amount', align: 'left' },
  {
    title: 'Tx Hash',
    field: 'txHash',
    align: 'left',
    formatter: cell => {
      const value = cell.getValue();
      if (value.length === 0) return '-';
      return `  <div>
      <span>${value.substring(0, 15)}...</span>
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
  { title: 'Status', field: 'status', align: 'left' },
  {
    title: 'Date',
    field: 'date',
    align: 'left',
    headerFilter: true,
    headerFilterPlaceholder: 'filter...',
  },
];

class Deposit extends React.Component {
  render() {
    const layouts = {
      lg: [
        { i: 'walletList', x: 0, y: 0, w: 6, h: 10 },
        { i: 'walletInfo', x: 6, y: 0, w: 6, h: 10 },
        { i: 'depositHistory', x: 0, y: 10, w: 12, h: 10 },
      ],
      md: [
        { i: 'walletList', x: 0, y: 0, w: 6, h: 10 },
        { i: 'walletInfo', x: 6, y: 0, w: 6, h: 10 },
        { i: 'depositHistory', x: 0, y: 20, w: 12, h: 8 },
      ],
      sm: [
        { i: 'walletList', x: 0, y: 0, w: 12, h: 10 },
        { i: 'walletInfo', x: 0, y: 10, w: 12, h: 10 },
        { i: 'depositHistory', x: 0, y: 20, w: 12, h: 8 },
      ],
      xs: [
        { i: 'walletList', x: 0, y: 0, w: 12, h: 10 },
        { i: 'walletInfo', x: 0, y: 10, w: 12, h: 10 },
        { i: 'depositHistory', x: 0, y: 20, w: 12, h: 8 },
      ],
    };

    const depositHistory =
      this.props.transactionHistory && this.props.transactionHistory.deposit
        ? this.props.transactionHistory.deposit
        : [];

    return (
      <ResponsiveGridLayout
        layouts={layouts}
        isResizable={false}
        isDraggable={false}
        rowHeight={30}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
      >
        <div key="walletList" data-tut="walletList">
          <WalletList height="calc(100% - 41px)" headerTitle="Deposit" />
        </div>
        <div key="walletInfo" data-tut="walletInfo">
          <WalletInfo
            height="inherit"
            messages={[
              'Tokens will be deposited after network confirmations.',
              'After making a deposit, track the progress on the history page.',
            ]}
          >
            <div className={s.depositAddressContainer}>
              <DepositAddress />
            </div>
          </WalletInfo>
        </div>
        <div key="depositHistory" data-tut="depositHistory">
          <Panel
            theme={this.props.theme}
            style={{ height: 'inherit' }}
            hasHeader
            headerTitle="Deposit history"
          >
            <ReactTabulator
              columns={depositHistoryColumns}
              data={depositHistory
                .map(transaction => {
                  const token = this.props.tokens.find(
                    item => item.id === transaction.destinationWallet.tokenId,
                  );

                  return {
                    token: token.symbol,
                    amount: transaction.amount,
                    // destination: transaction.to,
                    destination: transaction.destinationWallet.address,
                    date: new Date(transaction.createdAt).toString(),
                    status:
                      statuses.find(item => item.id === transaction.statusId)
                        .name +
                      (transaction.statusId === 3
                        ? ` (${transaction.confirmations}/${
                            token.confirmationRequired
                          } confirmations)`
                        : ''),
                    txHash: transaction.isBankPayment ? '' : transaction.txHash,
                  };
                })
                .sort((a, b) => new Date(b.date) - new Date(a.date))}
              options={{
                height: 'calc(100% - 39px)',
                layout: 'fitColumns',
                movableRows: false,
                pagination: 'local',
                paginationSize: 6,
              }}
              className={`tabulatorTheme ${this.props.theme} tabulator`}
            />
          </Panel>
        </div>
      </ResponsiveGridLayout>
    );
  }
}

Deposit.propTypes = {
  theme: PropTypes.string,
  transactionHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Deposit.defaultProps = {
  theme: 'dark',
};

const mapState = state => ({
  transactionHistory: state.userInfo.transactionHistory,
  tokens: state.tokens,
  wallets: state.userInfo.wallets,
  theme: state.theme,
});

export default connect(mapState)(withStyles(s)(Deposit));
