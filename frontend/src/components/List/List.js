import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Glyphicon } from 'react-bootstrap';
import ReactStars from 'react-stars';
import MediaQuery from 'react-responsive';
import { removeOrder } from '../../actions/order';
import { setSelectedPair, toggleFavouritePair } from '../../actions/pairs';
import routes from '../../constants/routes';
import Link from '../Link';
import themify from '../../themify';
import ColumnHeader from './ColumnHeader';
import ListHash from './ListHash';
import config from '../../config';
import TradingPlatformIcon from '../Icons/TradingPlatformIcon';
import s from './List.css';
/* eslint-disable css-modules/no-undef-class */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

const tagColor = (item, { attribute, operator, value, True, False }) => {
  if (operator === '===') return item[attribute] === value ? True : False;
  else if (operator === '>') return item[attribute] > value ? True : False;
  else if (operator === '<') return item[attribute] < value ? True : False;
  return '';
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedBy: '',
      sortOrder: '',
      list: props.list,
    };
    this.sortList = this.sortList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ list: nextProps.list }, () => {
      this.sortList(
        this.state.sortedBy,
        this.state.sortOrder === 'ASC' ? 'DESC' : 'ASC',
      );
    });
  }

  sortList(columnName, order) {
    let newOrder = order;
    if (columnName === '') return;
    if (columnName === this.state.sortedBy)
      newOrder = order === 'ASC' ? 'DESC' : 'ASC';
    const list = this.state.list.sort((a, b) => {
      if (newOrder === 'ASC')
        if (a[columnName] > b[columnName]) return 1;
        else if (a[columnName] < b[columnName]) return -1;
        else return 0;
      else if (b[columnName] > a[columnName]) return 1;
      else if (b[columnName] < a[columnName]) return -1;
      else return 0;
    });
    this.setState({ list, sortOrder: newOrder, sortedBy: columnName });
  }

  render() {
    const {
      columns,
      hiddenColumns,
      columnPostfixes,
      actions,
      colors,
      favouritePairs,
    } = this.props;
    const shownColumns = columns.filter(x => hiddenColumns.indexOf(x) < 0);
    const numberOfColumns = cols =>
      actions && actions.length > 0 ? cols.length + 1 : cols.length;

    const smallSizeWidthOfCells = `${100 / numberOfColumns(shownColumns)}%`;
    const largeSizeWidthOfCells = `${100 / numberOfColumns(columns)}%`;

    return (
      <div
        className={themify(s, s.scrollable, this.props.theme)}
        style={
          this.props.offsetHeight !== '0'
            ? { height: `calc(100% - ${this.props.offsetHeight})` }
            : { height: '100%' }
        }
      >
        <table className={s.sortableTable}>
          <thead>
            <tr style={{ height: this.props.rowHeight }}>
              {columns
                .filter(item => item !== 'favourites')
                .map((item, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={i}>
                    <MediaQuery maxWidth={768}>
                      <ColumnHeader
                        width={smallSizeWidthOfCells}
                        sortFunction={this.sortList}
                        sortedBy={this.state.sortedBy}
                        showingName={this.props.columnNames[i]}
                        originalName={this.props.columns[i]}
                        order={this.state.sortOrder}
                        isSortable={
                          ![
                            'favourites',
                            'address',
                            'destination',
                            'txHash',
                            'source',
                          ].includes(this.props.columns[i])
                        }
                        hide={hiddenColumns.includes(item)}
                      />
                    </MediaQuery>
                    <MediaQuery minWidth={768}>
                      <ColumnHeader
                        width={largeSizeWidthOfCells}
                        sortFunction={this.sortList}
                        sortedBy={this.state.sortedBy}
                        showingName={this.props.columnNames[i]}
                        originalName={this.props.columns[i]}
                        order={this.state.sortOrder}
                        isSortable={
                          ![
                            'favourites',
                            'address',
                            'destination',
                            'txHash',
                            'source',
                          ].includes(this.props.columns[i])
                        }
                        hide={false}
                      />
                    </MediaQuery>
                  </React.Fragment>
                ))}
              {actions && actions.length > 0 && (
                <td style={{ width: largeSizeWidthOfCells }}>Actions</td>
              )}
            </tr>
          </thead>
          <tbody>
            {this.state.list &&
              this.state.list.map((item, index) => (
                <tr
                  // eslint-disable-next-line react/no-array-index-key
                  key={this.props.listType + index}
                  className={
                    item.id === this.props.selectedItemId
                      ? s.selectedToken
                      : undefined
                  }
                  style={{ height: this.props.rowHeight }}
                >
                  {columns
                    .filter(
                      column =>
                        ![
                          'logoUrl',
                          'favourites',
                          // 'address',
                          // 'destination',
                          // 'txHash',
                          // 'source',
                        ].includes(column),
                    )
                    .map((key, j) => (
                      <td
                        key={key}
                        onClick={() => this.props.onSelectItem(item)}
                        style={
                          colors[j]
                            ? {
                                color: tagColor(item, colors[j]),
                                width: smallSizeWidthOfCells,
                                fontWeight:
                                  tagColor(item, colors[j]) === colors[j].False
                                    ? 'bold'
                                    : '100',
                              }
                            : {
                                width: smallSizeWidthOfCells,
                              }
                        }
                        className={
                          hiddenColumns.includes(key) ? s.hideXs : undefined
                        }
                      >
                        {item.logoUrl && key === 'name' && (
                          <img
                            width="20"
                            height="20"
                            src={`${config.api.serverUrl}/${item.logoUrl}`}
                            alt="logo"
                          />
                        )}
                        {columns.includes('favourites') && key === 'name' && (
                          <ReactStars
                            count={1}
                            onChange={isFavourite => {
                              this.props.toggleFavoritePair(
                                item.id,
                                isFavourite,
                              );
                            }}
                            size={15}
                            color2="#ffd700"
                            half={false}
                            value={favouritePairs.includes(item.id)}
                            className={s.star}
                          />
                        )}
                        &nbsp;
                        {[
                          'address',
                          'destination',
                          'source',
                          'txHash',
                        ].includes(key) ? (
                          <ListHash hash={item[key]} />
                        ) : (
                          item[key]
                        )}
                        &nbsp;
                        {columnPostfixes && columnPostfixes[j]}
                      </td>
                    ))}
                  {/* {columns.includes('favourites') && (
                    <td style={{ width: smallSizeWidthOfCells }}>
                      <ReactStars
                        count={1}
                        onChange={isFavourite => {
                          this.props.toggleFavoritePair(item.id, isFavourite);
                        }}
                        size={15}
                        color2="#ffd700"
                        half={false}
                        value={favouritePairs.includes(item.id)}
                        className={s.star}
                      />
                    </td>
                  )} */}
                  {/* {columns.includes('address') && (
                    <td style={{ width: smallSizeWidthOfCells }}>
                      <ListHash hash={item.address} />
                    </td>
                  )}
                  {columns.includes('destination') && (
                    <td style={{ width: smallSizeWidthOfCells }}>
                      <ListHash hash={item.destination} />
                    </td>
                  )}
                  {columns.includes('txHash') && (
                    <td style={{ width: smallSizeWidthOfCells }}>
                      <ListHash hash={item.txHash} />
                    </td>
                  )}
                  {columns.includes('source') && (
                    <td style={{ width: smallSizeWidthOfCells }}>
                      <ListHash hash={item.source} />
                    </td>
                  )} */}
                  {actions && actions.includes('remove') && (
                    <td style={{ width: smallSizeWidthOfCells }}>
                      <span>
                        <Glyphicon
                          onClick={() =>
                            this.props.removeFromList(
                              item.id,
                              this.props.listType,
                            )
                          }
                          title="cancel Order"
                          alt="cancel Order"
                          glyph="remove-circle"
                        />
                      </span>
                    </td>
                  )}
                  {actions && actions.includes('gotoAdvancedExchange') && (
                    <td
                      onClick={() => this.props.setSelectedPair(item.id)}
                      style={{ width: smallSizeWidthOfCells }}
                    >
                      <span className={s.gotoAdvancedExchangeContainer}>
                        <Link to={routes.TRADING_PLATFORM}>
                          <button className={s.gotoAdvancedExchange}>
                            <TradingPlatformIcon
                              className={s.hideXs}
                              width="18"
                              height="18"
                            />
                            &nbsp; Trade
                          </button>
                        </Link>
                      </span>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

List.propTypes = {
  theme: PropTypes.string,
  listType: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  columnNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  columnPostfixes: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.arrayOf(PropTypes.string),
  favouritePairs: PropTypes.arrayOf(PropTypes.number),
  setSelectedPair: PropTypes.func.isRequired,
  toggleFavoritePair: PropTypes.func,
  removeFromList: PropTypes.func,
  selectedItemId: PropTypes.number, // eslint-disable-line react/forbid-prop-types
  onSelectItem: PropTypes.func,
  rowHeight: PropTypes.string,
  offsetHeight: PropTypes.string,
};

List.defaultProps = {
  theme: 'dark',
  listType: '',
  selectedItemId: -1,
  colors: [],
  actions: [],
  favouritePairs: [],
  hiddenColumns: [],
  removeFromList: (id, listType) => ({ id, listType }),
  toggleFavoritePair: id => id,
  onSelectItem: item => item,
  rowHeight: '20px',
  offsetHeight: '0px',
};

const mapState = state => ({
  favouritePairs: state.userInfo.favouritePairs,
  theme: state.theme,
});

const mapDispatch = dispatch => ({
  toggleFavoritePair(id) {
    dispatch(toggleFavouritePair(id));
  },
  removeFromList(id, listType) {
    if (listType === 'liveOrder') {
      dispatch(removeOrder(id));
    }
  },
  setSelectedPair(id) {
    dispatch(setSelectedPair(id));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(List));
export const WithoutRedux = withStyles(s)(List);
