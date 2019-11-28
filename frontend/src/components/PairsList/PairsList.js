import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tab } from 'react-bootstrap';
import Tabs from '../Tabs';
import { setSelectedPair } from '../../actions/pairs';
import themify from '../../themify';
import s from './PairsList.css';
import List from '../List/List';
import PairSearch from './PairSearch/PairSearch';
import routes from '../../constants/routes';
import { arrayOfPairsNumberFormat } from '../../utils';
/* eslint-disable css-modules/no-undef-class */

class PairsList extends Component {
  render() {
    const tokenCategoryList = categoryId => (
      <List
        offsetHeight={!this.props.showSearchInHeader ? '38px' : '0'}
        listType="pairs"
        theme={this.props.theme}
        list={this.props.pairs.filter(pair => {
          const baseToken = this.props.tokens.find(
            item => item.symbol === pair.name.split('/')[0],
          );
          const quoteToken = this.props.tokens.find(
            item => item.symbol === pair.name.split('/')[1],
          );
          return (
            baseToken.categoryId === categoryId ||
            quoteToken.categoryId === categoryId
          );
        })}
        columns={[
          'name',
          'lastPrice',
          'change24Percentage',
          ...(this.props.currentRoute === routes.DASHBOARD ? ['high24'] : []),
          ...(this.props.currentRoute === routes.DASHBOARD ? ['low24'] : []),
          ...(this.props.currentRoute === routes.DASHBOARD ? ['vol24'] : []),
          ...(this.props.isLoggedIn ? ['favourites'] : []),
        ]}
        columnNames={[
          'Pair',
          'Price',
          '24h Chg',
          ...(this.props.currentRoute === routes.DASHBOARD ? ['24h High'] : []),
          ...(this.props.currentRoute === routes.DASHBOARD ? ['24h Low'] : []),
          ...(this.props.currentRoute === routes.DASHBOARD
            ? ['24h Volume']
            : []),
          ...(this.props.isLoggedIn ? ['Fav'] : []),
        ]}
        hiddenColumns={['vol24', 'high24', 'low24']}
        columnPostfixes={['', '', '%', '', '', '']}
        colors={[
          {},
          {},
          {
            attribute: 'change24Percentage',
            operator: '>',
            value: '0',
            True: '#2cb950',
            False: '#ff4242',
          },
          {},
        ]}
        selectedItemId={this.props.selectedPairId}
        onSelectItem={item => this.props.onSelect(item.id)}
        rowHeight={this.props.rowHeight}
        actions={this.props.actions}
      />
    );

    return (
      <div
        style={{
          position: this.props.showSearchInHeader ? 'relative' : 'initial',
          height: this.props.height,
        }}
        className={themify(s, s.customPanel, this.props.theme)}
      >
        <Tabs align={this.props.tabAlign} theme={this.props.theme}>
          <Tab eventKey={1} title="All">
            <PairSearch
              showSearchInHeader={this.props.showSearchInHeader}
              theme={this.props.theme}
              pairs={this.props.pairs}
            />

            <List
              offsetHeight={!this.props.showSearchInHeader ? '38px' : '0'}
              listType="pairs"
              theme={this.props.theme}
              list={this.props.pairs}
              columns={[
                'name',
                'lastPrice',
                'change24Percentage',
                ...(this.props.currentRoute === routes.DASHBOARD
                  ? ['high24']
                  : []),
                ...(this.props.currentRoute === routes.DASHBOARD
                  ? ['low24']
                  : []),
                ...(this.props.currentRoute === routes.DASHBOARD
                  ? ['vol24']
                  : []),
                ...(this.props.isLoggedIn ? ['favourites'] : []),
              ]}
              columnNames={[
                'Pair',
                'Price',
                '24h Chg',
                ...(this.props.currentRoute === routes.DASHBOARD
                  ? ['24h High']
                  : []),
                ...(this.props.currentRoute === routes.DASHBOARD
                  ? ['24h Low']
                  : []),
                ...(this.props.currentRoute === routes.DASHBOARD
                  ? ['24h Volume']
                  : []),
                ...(this.props.isLoggedIn ? ['Fav'] : []),
              ]}
              hiddenColumns={['vol24', 'high24', 'low24']}
              columnPostfixes={['', '', '%', '', '', '']}
              colors={[
                {},
                {},
                {
                  attribute: 'change24Percentage',
                  operator: '>',
                  value: '0',
                  True: '#2cb950',
                  False: '#ff4242',
                },
                {},
              ]}
              selectedItemId={this.props.selectedPairId}
              onSelectItem={item => this.props.onSelect(item.id)}
              rowHeight={this.props.rowHeight}
              actions={this.props.actions}
            />
          </Tab>
          {this.props.currentRoute === routes.DASHBOARD && (
            <Tab eventKey={2} title="Currencies">
              {tokenCategoryList(1)}
            </Tab>
          )}
          {this.props.currentRoute === routes.DASHBOARD && (
            <Tab eventKey={3} title="Utilities">
              {tokenCategoryList(2)}
            </Tab>
          )}
          {this.props.currentRoute === routes.DASHBOARD && (
            <Tab eventKey={4} title="Equities">
              {tokenCategoryList(3)}
            </Tab>
          )}
          {this.props.currentRoute === routes.DASHBOARD && (
            <Tab eventKey={5} title="Assets">
              {tokenCategoryList(4)}
            </Tab>
          )}
          {this.props.currentRoute === routes.DASHBOARD && (
            <Tab eventKey={6} title="Dividends">
              {tokenCategoryList(5)}
            </Tab>
          )}
          {this.props.isLoggedIn && (
            <Tab eventKey={7} title="Favorites">
              <List
                offsetHeight={!this.props.showSearchInHeader && '38px'}
                theme={this.props.theme}
                list={this.props.pairs.filter(pair =>
                  this.props.favouritePairs.includes(pair.id),
                )}
                columns={[
                  'name',
                  'lastPrice',
                  'change24Percentage',
                  ...(this.props.currentRoute === routes.DASHBOARD
                    ? ['high24']
                    : []),
                  ...(this.props.currentRoute === routes.DASHBOARD
                    ? ['low24']
                    : []),
                  ...(this.props.currentRoute === routes.DASHBOARD
                    ? ['vol24']
                    : []),
                ]}
                columnNames={[
                  'Pair',
                  'Price',
                  '24h Chg',
                  ...(this.props.currentRoute === routes.DASHBOARD
                    ? ['24h High']
                    : []),
                  ...(this.props.currentRoute === routes.DASHBOARD
                    ? ['24h Low']
                    : []),
                  ...(this.props.currentRoute === routes.DASHBOARD
                    ? ['24h Volume']
                    : []),
                ]}
                columnPostfixes={['', '', '%', '']}
                colors={[
                  {},
                  {},
                  {
                    attribute: 'change24Percentage',
                    operator: '>',
                    value: '0',
                    True: '#2cb950',
                    False: '#ff4242',
                  },
                  {},
                ]}
                selectedItemId={this.props.selectedPairId}
                onSelectItem={item => this.props.onSelect(item.id)}
                rowHeight={this.props.rowHeight}
                actions={this.props.actions}
              />
            </Tab>
          )}
        </Tabs>
      </div>
    );
  }
}

PairsList.propTypes = {
  theme: PropTypes.string,
  pairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  favouritePairs: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedPairId: PropTypes.number, // eslint-disable-line react/forbid-prop-types
  onSelect: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string),
  tabAlign: PropTypes.string,
  showSearchInHeader: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  rowHeight: PropTypes.string,
  height: PropTypes.string,
  currentRoute: PropTypes.string,
};

PairsList.defaultProps = {
  theme: 'dark',
  selectedPairId: -1,
  actions: [],
  tabAlign: 'left',
  showSearchInHeader: false,
  isLoggedIn: false,
  rowHeight: '40px',
  height: 'inherit',
  currentRoute: '/',
};

const mapState = state => ({
  pairs: arrayOfPairsNumberFormat(state.filteredPairs),
  tokens: state.tokens,
  selectedPairId:
    state.pairs.length >= state.selectedPairId ? state.selectedPairId : 1,
  favouritePairs: state.userInfo.favouritePairs,
  isLoggedIn: state.isLoggedIn,
  currentRoute: state.currentRoute,
  theme: state.theme,
});

const mapDispatch = dispatch => ({
  onSelect(id) {
    dispatch(setSelectedPair(id));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(PairsList));
