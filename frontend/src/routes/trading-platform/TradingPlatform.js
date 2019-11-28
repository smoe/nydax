import React from 'react';

import PropTypes from 'prop-types';
import { Tab } from 'react-bootstrap';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import Tabs from '../../components/Tabs';
import OrderBookAndTradeHistory from '../../components/OrderBookAndTradeHistory';
import TradingView from '../../components/TradingView';
import Trade from '../../components/Trade';
// import DepthChart2 from '../../components/DepthChart/DepthChart2';
import PairsList from '../../components/PairsList';
import Panel from '../../components/Panel';
import UserInfo from '../../components/UserInfo';
import TokenInfo from '../../components/TokenInfo';
import C from '../../constants/actions';

const ResponsiveGridLayout = WidthProvider(Responsive);

// const rowStyle = { margin: 0 };
// const colStyle = { padding: 0 };

class TradingPlatform extends React.Component {
  constructor(props) {
    super(props);
    this.state = { appIsMounted: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ appIsMounted: true, showTour: true }); // eslint-disable-line
    }, 2000);
  }

  render() {
    const trLayouts = this.props.dndLayout;

    return (
      <React.Fragment>
        <ResponsiveGridLayout
          onLayoutChange={(layout, layouts) => {
            this.props.saveLayout(layouts);
          }}
          className="layout"
          draggableCancel="input,textarea"
          layouts={trLayouts}
          isResizable={!isMobile && !this.props.gridIsLocked}
          isDraggable={!isMobile && !this.props.gridIsLocked}
          rowHeight={30}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 48, md: 40, sm: 24, xs: 16, xxs: 8 }}
        >
          <div key="tradingView" data-tut="tradingView">
            <Panel theme={this.props.theme} style={{ height: 'inherit' }}>
              <Tabs defaultActiveKey={2} theme={this.props.theme} align="right">
                {/* <Tab eventKey={0} title="Reports" disabled /> */}
                <Tab eventKey={1} title="Token Info">
                  <TokenInfo
                    theme={this.props.theme}
                    tokenInfo={this.props.tokenInfo}
                  />
                </Tab>
                <Tab eventKey={2} title="Candle">
                  <TradingView
                    height="inherit"
                    containerId="advanced_chart"
                    isAdvanced
                    key={this.props.theme}
                  />
                </Tab>
                <Tab eventKey={3} title="Depth">
                  <div style={{ height: 'inherit' }}>
                    {this.state.appIsMounted &&
                      React.createElement(
                      require('../../components/DepthChart/DepthChart2').default // eslint-disable-line
                      )}
                  </div>
                </Tab>
              </Tabs>
            </Panel>
          </div>
          <div key="userInfo" data-tut="userInfo">
            <UserInfo height="inherit" />
          </div>
          <div key="orderbook" data-tut="orderBook">
            <OrderBookAndTradeHistory height="inherit" />
          </div>
          <div key="pairList" data-tut="pairList">
            <PairsList height="inherit" />
          </div>
          <div key="trade" data-tut="trade">
            <Trade showBuyNSellTabs />
          </div>
        </ResponsiveGridLayout>
      </React.Fragment>
    );
  }
}

TradingPlatform.propTypes = {
  theme: PropTypes.string,
  tokenInfo: PropTypes.shape(Object).isRequired,
  dndLayout: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveLayout: PropTypes.func.isRequired,
  gridIsLocked: PropTypes.bool.isRequired,
};

TradingPlatform.defaultProps = {
  theme: 'dark',
};

const mapState = state => ({
  theme: state.theme,
  tokenInfo: state.tokenInfo,
  dndLayout: state.tradingPlatformLayout,
  gridIsLocked: state.tradingPlatformGridIsLocked,
});

const mapDispatch = dispatch => ({
  saveLayout(tradingPlatformLayout) {
    dispatch({ type: C.CHANGE_TRADING_PLATFORM_LAYOUT, tradingPlatformLayout });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(TradingPlatform);
