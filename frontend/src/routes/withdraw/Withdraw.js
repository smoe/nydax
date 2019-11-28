import React from 'react';
import { connect } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { ReactTabulator } from 'react-tabulator';
import { toastr } from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
import Panel from '../../components/Panel/Panel';
import WalletList from '../../components/WalletList';
import WalletInfo from '../../components/WalletInfo';
import WithdrawForm from '../../components/WithdrawForm';
import s from './Withdraw.css';

export const statuses = [
  {
    id: 1,
    name: 'Waiting',
  },
  {
    id: 2,
    name: 'Cancelled',
  },
  {
    id: 3,
    name: 'Pending',
  },
  {
    id: 4,
    name: 'Rejection',
  },
  {
    id: 5,
    name: 'BlockchainRejection',
  },
  {
    id: 6,
    name: 'Completed',
  },
];

/* eslint-disable css-modules/no-undef-class */
const ResponsiveGridLayout = WidthProvider(Responsive);

const withdrawHistoryColumns = [
  { title: 'Token', field: 'token', align: 'left' },
  { title: 'Amount', field: 'amount', align: 'left' },
  {
    title: 'Destination',
    field: 'destination',
    align: 'left',
    formatter: cell => {
      const value = cell.getValue();
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
  {
    title: 'Tx Hash',
    field: 'txHash',
    align: 'left',
    formatter: cell => {
      const value = cell.getValue();
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

class Withdraw extends React.Component {
  render() {
    const layouts = {
      lg: [
        { i: 'walletList', x: 0, y: 0, w: 6, h: 16 },
        { i: 'walletInfo', x: 6, y: 0, w: 6, h: 16 },
        { i: 'withdrawHistory', x: 0, y: 16, w: 12, h: 10 },
      ],
      md: [
        { i: 'walletList', x: 0, y: 0, w: 6, h: 16 },
        { i: 'walletInfo', x: 6, y: 0, w: 6, h: 16 },
        { i: 'withdrawHistory', x: 0, y: 16, w: 12, h: 8 },
      ],
      sm: [
        { i: 'walletList', x: 0, y: 0, w: 12, h: 16 },
        { i: 'walletInfo', x: 0, y: 10, w: 12, h: 16 },
        { i: 'withdrawHistory', x: 0, y: 32, w: 12, h: 8 },
      ],
      xs: [
        { i: 'walletList', x: 0, y: 0, w: 12, h: 16 },
        { i: 'walletInfo', x: 0, y: 10, w: 12, h: 17 },
        { i: 'withdrawHistory', x: 0, y: 33, w: 12, h: 8 },
      ],
    };

    const withdrawHistory =
      this.props.transactionHistory && this.props.transactionHistory.withdraw
        ? this.props.transactionHistory.withdraw
        : [];
    return (
      <React.Fragment>
        <ResponsiveGridLayout
          layouts={layouts}
          isResizable={false}
          isDraggable={false}
          rowHeight={30}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        >
          <div key="walletList" data-tut="walletList">
            <WalletList height="calc(100% - 41px)" headerTitle="Withdraw" />
          </div>
          <div key="walletInfo" data-tut="walletInfo">
            <WalletInfo
              height="inherit"
              messages={[
                'Do not withdraw directly to a crowdfund or ICO. We will not credit your account with tokens from that sale.',
              ]}
            >
              <div className={s.withdrawFormContainer}>
                <WithdrawForm />
              </div>
            </WalletInfo>
          </div>
          <div key="withdrawHistory" data-tut="withdrawHistory">
            <Panel
              theme={this.props.theme}
              hasHeader
              style={{ height: 'inherit' }}
              headerTitle="Withdraw history"
            >
              <ReactTabulator
                columns={withdrawHistoryColumns}
                data={withdrawHistory
                  .map(transaction => {
                    const token = this.props.tokens.find(
                      item => item.id === transaction.sourceWallet.tokenId,
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
                      txHash: transaction.txHash,
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
      </React.Fragment>
    );
  }
}

Withdraw.propTypes = {
  theme: PropTypes.string,
  transactionHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Withdraw.defaultProps = {
  theme: 'dark',
};

const mapState = state => ({
  transactionHistory: state.userInfo.transactionHistory,
  tokens: state.tokens,
  wallets: state.userInfo.wallets,
  theme: state.theme,
});

export default connect(mapState)(withStyles(s)(Withdraw));
