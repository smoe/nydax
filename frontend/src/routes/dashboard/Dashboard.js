import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import Tabs from '../../components/Tabs';
import PairsList from '../../components/PairsList';
import PairCard from '../../components/PairCard';
import AddPair from '../../components/AddPair';
import TradingView from '../../components/TradingView';
import TradeHistory from '../../components/OrderBookAndTradeHistory/TradeHistory';
// import Trade from '../../components/Trade';
import favouriteChartColors from '../../constants/favouriteChartsColors';
import Panel from '../../components/Panel';
import themify from '../../themify';
import s from './Dashboard.css';

const arraysAreEqual = (array1, array2) =>
  array1.sort().toString() === array2.sort().toString();

/* eslint-disable css-modules/no-undef-class */

const labels = [
  'january',
  'february',
  'march',
  'april',
  'june',
  'july',
  'august',
];

class Dashboard extends React.Component {
  render() {
    // eslint-disable-next-line no-unused-expressions
    const { favouriteCharts } = this.props;
    return (
      <React.Fragment>
        <div className={themify(s, s.customPanel, this.props.theme)}>
          <Row style={{ margin: 0 }}>
            {this.props.isLoggedIn && (
              <div
                className={s.pairCardsContainer}
                style={{
                  paddingTop: this.props.favouriteCharts.length > 0 ? 0 : 10,
                }}
              >
                {favouriteCharts.map(
                  (pairId, i) =>
                    i < 5 && (
                      <div className={s.pairCardContainer}>
                        <PairCard
                          labels={labels}
                          pairId={pairId}
                          backgroundColor={
                            favouriteChartColors[i].backgroundColor
                          }
                          borderColor={favouriteChartColors[i].borderColor}
                          hoverBackgroundColor={
                            favouriteChartColors[i].hoverBackgroundColor
                          }
                          hoverBorderColor={
                            favouriteChartColors[i].hoverBorderColor
                          }
                        />
                      </div>
                    ),
                )}
                {!arraysAreEqual(
                  this.props.pairs.map(pair => pair.id),
                  this.props.favouriteCharts,
                ) &&
                  this.props.favouriteCharts.length <= 4 && (
                    <div
                      className={
                        this.props.favouriteCharts.length > 0
                          ? s.pairCardContainer
                          : s.floatAddPairContainer
                      }
                      style={{
                        width:
                          this.props.favouriteCharts.length > 0
                            ? '20%'
                            : '75px',
                      }}
                    >
                      <AddPair
                        float={this.props.favouriteCharts.length === 0}
                        height={
                          this.props.favouriteCharts.length > 0 ? 160 : 50
                        }
                      />
                    </div>
                  )}
              </div>
            )}
          </Row>
          <Row style={{ margin: 0, marginTop: this.props.isLoggedIn ? 0 : 10 }}>
            <Col className={s.tradingViewContainer} lg={8} xs={12}>
              <Panel theme={this.props.theme}>
                <div data-tut="tradingView">
                  <TradingView
                    key={this.props.theme}
                    height="387px"
                    containerId="simple_chart"
                  />
                </div>
              </Panel>
            </Col>
            <Col className={s.tradeContainer} lg={4} xs={12}>
              <div data-tut="trade">
                <Panel theme={this.props.theme}>
                  <Tabs align="left" theme={this.props.theme}>
                    <Tab eventKey={0} title="Trade History">
                      <TradeHistory height={350} />
                    </Tab>
                  </Tabs>
                </Panel>
                {/* <Trade showBuyNSellTabs /> */}
              </div>
            </Col>
          </Row>
          <Row style={{ margin: 0, marginTop: 10 }}>
            <div data-tut="pairList">
              <PairsList
                showSearchInHeader
                actions={['gotoAdvancedExchange']}
                tabAlign="left"
                isLoggedIn={this.props.isLoggedIn}
                rowHeight="40px"
                height="400px"
              />
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  theme: PropTypes.string,
  favouriteCharts: PropTypes.arrayOf(PropTypes.number).isRequired,
  pairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoggedIn: PropTypes.bool,
};

Dashboard.defaultProps = {
  theme: 'dark',
  isLoggedIn: false,
};

const mapState = state => ({
  favouriteCharts: state.userInfo.favouriteCharts,
  pairs: state.pairs,
  isLoggedIn: state.isLoggedIn,
  theme: state.theme,
});

export default connect(mapState)(withStyles(s)(Dashboard));
