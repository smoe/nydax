import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { numberFormat } from '../../../utils';
import themify from '../../../themify';
import s from './OrderBook.css';
/* eslint-disable css-modules/no-undef-class */

function compare(a, b) {
  if (a.price < b.price) return -1;
  if (a.price > b.price) return 1;
  return 0;
}

class OrderBook extends React.Component {
  constructor(props) {
    super(props);
    this.sellOrders = this.sellOrders.bind(this);
    this.buyOrders = this.buyOrders.bind(this);
    this.orders = JSON.parse(JSON.stringify(props.orders));
  }

  componentWillReceiveProps(nextProps) {
    this.orders = JSON.parse(JSON.stringify(nextProps.orders)).map(item => {
      if (!this.props.orders.map(trade => trade.id).includes(item.id)) {
        return { ...item, flash: true };
      }
      return item;
    });
  }

  sellOrders() {
    const { name, priceDecimals, tradeAmountDecimals } = this.props.pairs.find(
      item => item.id === this.props.selectedPairId,
    );
    const rows = [];
    const listSellOrders = this.orders
      .filter(
        item => item.sideId === 2 && item.pairId === this.props.selectedPairId,
      )
      .sort(compare);
    const numberOfEmptyRows = this.props.rowLimit - listSellOrders.length;
    const listTotalNumbers = listSellOrders.map(
      item => +(item.amount - item.filledAmount) * item.price,
    );
    const maxAbundance = Math.max(...listTotalNumbers);
    for (let index = 0; index < listSellOrders.length; index += 1) {
      const item = listSellOrders[index];
      const row = (
        <Row
          className={
            item.flash && item.flash === true
              ? cx(s.tableRow, s.flash)
              : s.tableRow
          }
          key={
            item.flash && item.flash === true
              ? `orderRow${index}${Math.random()}`
              : `orderRow${index}`
          } // eslint-disable-line
        >
          <Col className={s.rowBar}>
            <span
              className={s.bgBarRed}
              style={{
                width: `${((+(item.amount - item.filledAmount) * item.price) /
                  maxAbundance) *
                  100}%`,
              }}
            >
              &nbsp;
            </span>
          </Col>
          <Col
            xs={4}
            style={{ color: '#ff4242' }}
            className={themify(s, s.tableCell, this.props.theme)}
          >
            {numberFormat(item.price, priceDecimals)}
          </Col>
          <Col xs={4} className={themify(s, s.tableCell, this.props.theme)}>
            {numberFormat(item.amount - item.filledAmount, tradeAmountDecimals)}
          </Col>
          <Col xs={4} className={themify(s, s.tableCell, this.props.theme)}>
            {numberFormat(
              +(item.amount - item.filledAmount) * item.price,
              priceDecimals,
            )}
          </Col>
        </Row>
      );
      rows.push(row);
    }
    for (let index = 0; index < numberOfEmptyRows; index += 1) {
      const row = (
        <Row className={s.tableRow} key={`row${index}`}>
          <Col className={s.rowBar}>
            <span className={s.bgBarRed} style={{ width: '0' }} />
          </Col>
          <Col xs={4} className={s.tableCell}>
            &nbsp;
          </Col>
          <Col xs={4} className={s.tableCell}>
            &nbsp;
          </Col>
          <Col xs={4} className={s.tableCell}>
            &nbsp;
          </Col>
        </Row>
      );
      rows.push(row);
    }
    rows.push(
      <Row className={s.headerRow} key="header">
        <Col xs={4} className={s.colTitle}>{`Price(${
          name.split('/')[1]
        })`}</Col>

        <Col xs={4} className={s.colTitle}>
          Vol
        </Col>
        <Col xs={4} className={s.colTitle}>
          Total
        </Col>
      </Row>,
    );
    return (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'flex-end',
        }}
      >
        {rows.reverse().map(item => item)}
      </div>
    );
  }

  buyOrders() {
    const { priceDecimals, tradeAmountDecimals } = this.props.pairs.find(
      item => item.id === this.props.selectedPairId,
    );
    const listTotalNumbers = this.orders
      .filter(
        item => item.sideId === 1 && item.pairId === this.props.selectedPairId,
      )
      .map(item => +(item.amount - item.filledAmount) * item.price);
    const maxAbundance = Math.max(...listTotalNumbers);
    return (
      <div style={{ position: 'relative' }}>
        {this.orders
          .filter(
            item =>
              item.sideId === 1 && item.pairId === this.props.selectedPairId,
          )
          .sort(compare)
          .reverse()
          .map((item, index) => (
            // if (index + 1 > this.props.rowLimit) return null;
            // eslint-disable-next-line react/no-array-index-key
            <Row
              className={
                item.flash && item.flash === true
                  ? cx(s.tableRow, s.flash)
                  : s.tableRow
              }
                key={item.flash && item.flash === true ? `buyOrderRow${index}${Math.random()}` : `buyOrderRow${index}`} // eslint-disable-line
            >
              <Col className={s.rowBar}>
                <span
                  className={s.bgBarGreen}
                  style={{
                    width: `${((+(item.amount - item.filledAmount) *
                      item.price) /
                      maxAbundance) *
                      100}%`,
                  }}
                >
                  &nbsp;
                </span>
              </Col>
              <Col xs={4} style={{ color: '#2cb950' }} className={s.tableCell}>
                {numberFormat(item.price, priceDecimals)}
              </Col>

              <Col xs={4} className={s.tableCell}>
                {numberFormat(
                  item.amount - item.filledAmount,
                  tradeAmountDecimals,
                )}
              </Col>
              <Col xs={4} className={s.tableCell}>
                {numberFormat(
                  +(item.amount - item.filledAmount) * item.price,
                  priceDecimals,
                )}
              </Col>
            </Row>
          ))}
      </div>
    );
  }

  render() {
    const { pairs, selectedPairId } = this.props;
    const { name, lastPrice, change24Percentage } = pairs.find(
      item => item.id === selectedPairId,
    );

    return (
      <div className={themify(s, s.root, this.props.theme)}>
        <div className={s.sellContainer}>{this.sellOrders()}</div>
        <div className={s.currentOrderInfo}>
          <span className={s.price}>{name.split('/')[0]}</span>
          <span className={change24Percentage > 0 ? s.green : s.red}>
            {change24Percentage}%<span style={{ fontSize: 10 }}>(24h)</span>
          </span>
          <span className={s.price}>
            {lastPrice}
            <span style={{ fontSize: 10 }}>
              ({name.split('/')[1]})
              {/* ({localStorage.getItem('CurrencyName') || 'USD'}) */}
            </span>
          </span>
        </div>
        <div className={s.buyContainer}>{this.buyOrders()}</div>
      </div>
    );
  }
}

OrderBook.propTypes = {
  selectedPairId: PropTypes.number.isRequired, // eslint-disable-line
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  pairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  theme: PropTypes.string.isRequired,
  rowLimit: PropTypes.number,
};

OrderBook.defaultProps = {
  rowLimit: 9,
};

const mapState = state => ({
  orders: state.lastOrders,
  pairs: state.pairs,
  selectedPairId:
    state.pairs.length >= state.selectedPairId ? state.selectedPairId : 1,
  theme: state.theme,
});

export default connect(
  mapState,
  undefined,
)(withStyles(s)(OrderBook));
export const WithoutRedux = withStyles(s)(OrderBook);
