import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Row, Col } from 'react-bootstrap';
import { numberFormat } from '../../../utils';
import themify from '../../../themify';
import s from './TradeHistory.css';
/* eslint-disable css-modules/no-undef-class */

class TradeHistory extends React.Component {
  constructor(props) {
    super(props);
    this.trades = JSON.parse(JSON.stringify(props.trades));
  }

  componentWillReceiveProps(nextProps) {
    this.trades = JSON.parse(JSON.stringify(nextProps.trades)).map(item => {
      if (!this.props.trades.map(trade => trade.id).includes(item.id)) {
        return { ...item, flash: true };
      }
      return item;
    });
  }

  render() {
    const baseCurrency = this.props.currencies.find(
      item => item.id === this.props.baseCurrencyId,
    );

    const btcUsdPrice = this.props.tokens.find(item => item.symbol === 'BTC')
      .usdPrice;

    const { pairs, selectedPairId } = this.props;
    const { name } = pairs.find(item => item.id === selectedPairId);
    const listTotalNumbers =
      this.trades && this.trades.map(item => +item.amount * item.price);
    const maxAbundance = Math.max(...listTotalNumbers);
    return (
      <div className={themify(s, s.root, this.props.theme)}>
        <Scrollbars
          ref={ref => {
            this.sellOrdersScrollBar = ref;
          }}
          className={s.tradeHistoryContainer}
          style={{ height: this.props.height, width: '100%' }}
        >
          <Row className={s.headerRow}>
            {!this.props.showPairLabel && (
              <Col xs={3} className={s.colTitle}>
                Pair
              </Col>
            )}
            <Col xs={this.props.showPairLabel ? 4 : 3} className={s.colTitle}>
              {`Total Value(${baseCurrency.symbolNative})`}
            </Col>
            <Col xs={this.props.showPairLabel ? 4 : 3} className={s.colTitle}>
              Vol
            </Col>
            <Col xs={this.props.showPairLabel ? 4 : 3} className={s.colTitle}>
              Time
            </Col>
          </Row>
          {this.trades &&
            this.trades.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Row
                className={
                  item.flash && item.flash === true
                    ? cx(s.tableRow, s.flash)
                    : s.tableRow
                }
                key={item.flash && item.flash === true ? `tradehistoryRow${index}${Math.random()}` : `tradehistoryRow${index}`} // eslint-disable-line
              >
                <Col className={s.rowBar}>
                  <span
                    className={s.bgBarGreen}
                    style={{
                      width: `${((+item.amount * item.price) / maxAbundance) *
                        100}%`,
                    }}
                  >
                    &nbsp;
                  </span>
                </Col>
                {!this.props.showPairLabel && (
                  <Col xs={3} className={s.tableCell}>
                    {name}
                  </Col>
                )}
                <Col
                  xs={this.props.showPairLabel ? 4 : 3}
                  className={s.tableCell}
                >
                  {baseCurrency.symbolNative}
                  {numberFormat(
                    Number(item.price) *
                      Number(item.amount) *
                      Number(btcUsdPrice) *
                      Number(baseCurrency.usdRatio),
                    baseCurrency.decimalPrecision,
                  )}
                </Col>
                <Col
                  xs={this.props.showPairLabel ? 4 : 3}
                  className={s.tableCell}
                >
                  {Number(item.amount)}
                </Col>
                <Col
                  xs={this.props.showPairLabel ? 4 : 3}
                  className={s.tableCell}
                >
                  {item.time}
                </Col>
              </Row>
            ))}
        </Scrollbars>
      </div>
    );
  }
}

TradeHistory.propTypes = {
  selectedPairId: PropTypes.number.isRequired, // eslint-disable-line
  trades: PropTypes.arrayOf(PropTypes.object).isRequired,
  pairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  theme: PropTypes.string.isRequired,
  height: PropTypes.string,
  showPairLabel: PropTypes.bool,
  baseCurrencyId: PropTypes.number.isRequired,
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TradeHistory.defaultProps = {
  height: 'inherit',
  showPairLabel: false,
};

const mapState = state => ({
  orders: state.lastOrders,
  pairs: state.pairs,
  currencies: state.currencies,
  trades: state.lastTrades,
  tokens: state.tokens,
  selectedPairId:
    state.pairs.length >= state.selectedPairId ? state.selectedPairId : 1,
  theme: state.theme,
  baseCurrencyId: state.userInfo.profile.baseCurrencyId || 1,
});

export default connect(
  mapState,
  undefined,
)(withStyles(s)(TradeHistory));
export const WithoutRedux = withStyles(s)(TradeHistory);
