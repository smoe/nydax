import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab } from 'react-bootstrap';
import Tabs from '../Tabs';
import OrderBook from './OrderBook';
import TradeHistory from './TradeHistory';
import Panel from '../Panel';

const OrderBookAndTradeHistory = ({ theme, height }) => (
  <Panel theme={theme} style={{ height }}>
    <Tabs align="center" theme={theme}>
      <Tab eventKey={0} title="OrderBook">
        <OrderBook />
      </Tab>
      <Tab eventKey={1} title="Trades">
        <TradeHistory showPairLabel height={height} />
      </Tab>
    </Tabs>
  </Panel>
);

OrderBookAndTradeHistory.propTypes = {
  theme: PropTypes.string,
  height: PropTypes.string,
};

OrderBookAndTradeHistory.defaultProps = {
  theme: 'dark',
  height: 'inherit',
};

const mapState = state => ({
  theme: state.theme,
});

export default connect(
  mapState,
  undefined,
)(OrderBookAndTradeHistory);
