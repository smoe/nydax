import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import { numberFormat } from '../../utils';
import { setSelectedPair, removeFavouriteChart } from '../../actions/pairs';
import themify from '../../themify';
import s from './PairCard.css';
/* eslint-disable css-modules/no-undef-class */

const lineChartOptions = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        display: false,
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        display: false,
        gridLines: {
          display: false,
        },
      },
    ],
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 1,
      HitRadius: 2,
      BorderColor: '#fff',
      HoverRadius: 3,
    },
  },
  title: {
    display: false,
  },
  legend: {
    display: false,
  },
  tooltips: {
    // Disable the on-canvas tooltip
    enabled: false,
    mode: 'index',
    intersect: false,
    custom(tooltipModel) {
      // Tooltip Element
      let tooltipEl = document.getElementById('chartjs-tooltip');

      // Create element on first render
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = '<table></table>';
        document.body.appendChild(tooltipEl);
      }

      // Hide if no tooltip
      if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set caret Position
      tooltipEl.classList.remove('above', 'below', 'no-transform');
      if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
      } else {
        tooltipEl.classList.add('no-transform');
      }

      function getBody(bodyItem) {
        return bodyItem.lines;
      }

      // Set Text
      if (tooltipModel.body) {
        const bodyLines = tooltipModel.body.map(getBody);
        let innerHtml = '<thead>';
        innerHtml += '</thead><tbody>';
        innerHtml += `<tr><td style="color:#97a1c0;">${bodyLines[0]}</td></tr>`;
        innerHtml += '</tbody>';
        const tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
      }
      // `this` will be the overall tooltip
      const position = this._chart.canvas.getBoundingClientRect(); //eslint-disable-line

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.left = `${position.left + tooltipModel.caretX - 30}px`;
      tooltipEl.style.top = `${position.top + tooltipModel.caretY - 30}px`;
      tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily; //eslint-disable-line
      tooltipEl.style.fontSize = `${tooltipModel.bodyFontSize}px`;
      tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle; //eslint-disable-line
      tooltipEl.style.padding = `${tooltipModel.yPadding}px ${
        tooltipModel.xPadding
      }px`;
    },
  },
  hover: {
    mode: 'index',
    intersect: false,
  },
};

class PairCard extends React.Component {
  constructor(props) {
    super(props);
    this.removeChart = this.removeChart.bind(this);
  }

  removeChart = () => {
    this.props.onRemove(this.props.pairId);
  };

  selectCard = () => {
    this.props.onSelect(this.props.pairId);
  };

  render() {
    const pairInfo = this.props.pairs.find(
      pair => pair.id === this.props.pairId,
    );

    return (
      <Panel
        className={themify(s, s.customPanel, this.props.theme)}
        height={this.props.height}
        style={{ border: 0, width: '100%' }}
      >
        <Panel.Body>
          <div
            role="presentation"
            className={s.closeIcon}
            onClick={this.removeChart}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className={s.chartInfo}>
            <div>
              <p className={s.name}>{pairInfo && pairInfo.name}</p>
              <p className={s.amount}>
                {pairInfo &&
                  numberFormat(pairInfo.lastPrice, pairInfo.priceDecimals)}
              </p>
            </div>
            <div>
              <p
                className={
                  pairInfo && pairInfo.change24Percentage > 0 ? s.green : s.red
                }
              >
                <FontAwesomeIcon
                  icon={
                    pairInfo && pairInfo.change24Percentage > 0
                      ? faArrowUp
                      : faArrowDown
                  }
                />
                {`${pairInfo && numberFormat(pairInfo.change24Percentage, 2)}%`}
              </p>
            </div>
          </div>
          <div // eslint-disable-line
            onClick={this.selectCard}
            style={{ height: (this.props.height * 3) / 5 }}
          >
            {
              <Line
                ref={ref => {
                  this.lineChart = ref;
                }}
                height={(this.props.height * 3) / 5}
                options={lineChartOptions}
                data={{
                  labels: this.props.labels,
                  datasets: [
                    {
                      label: '',
                      backgroundColor: this.props.backgroundColor,
                      borderColor: this.props.borderColor,
                      borderWidth: 1,
                      hoverBackgroundColor: this.props.hoverBackgroundColor,
                      hoverBorderColor: this.props.hoverBorderColor,
                      data: JSON.parse(
                        JSON.stringify(
                          this.props.pairs.find(
                            pair => pair.id === this.props.pairId,
                          )
                            ? this.props.pairs.find(
                                pair => pair.id === this.props.pairId,
                              ).chartPriceHistory
                            : [],
                        ),
                      ),
                    },
                  ],
                }}
              />
            }
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

PairCard.propTypes = {
  theme: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  hoverBorderColor: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  // priceHistory: PropTypes.arrayOf(PropTypes.number).isRequired,
  height: PropTypes.number,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  // pairInfo: PropTypes.object.isRequired //eslint-disable-line
  pairId: PropTypes.number.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

PairCard.defaultProps = {
  theme: 'dark',
  backgroundColor: 'rgba(255,99,132,0.2)',
  borderColor: 'rgba(255,99,132,1)',
  hoverBackgroundColor: 'rgba(255,99,132,0.5)',
  hoverBorderColor: 'rgba(255,99,132,1)',
  height: 155,
};

const mapState = state => ({
  pairs: state.pairs,
  theme: state.theme,
});

const mapDispatch = dispatch => ({
  onRemove(pairId) {
    dispatch(removeFavouriteChart(pairId));
  },
  onSelect(pairId) {
    dispatch(setSelectedPair(pairId));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(PairCard));
