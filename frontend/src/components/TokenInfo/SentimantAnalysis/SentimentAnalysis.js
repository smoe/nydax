import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowDown,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import s from './SentimentAnalysis.css';
import Panel from '../../Panel';
import themify from '../../../themify';

const rightSideData = {
  labels: ['Founders', 'Advisory'],
  datasets: [
    {
      data: [95, 5],
      backgroundColor: ['#7577ff', '#333a5f'],
      hoverBackgroundColor: ['#7577ff', '#333a5f'],
      borderWidth: 10,
      hoverBorderWidth: 10,
      hoverBorderColor: ['transparent', 'transparent'],
      borderColor: ['transparent', 'transparent'],
    },
    {
      data: [98, 2],
      backgroundColor: ['#595eba', '#333a5f'],
      hoverBackgroundColor: ['#595eba', '#333a5f'],
      borderWidth: 10,
      hoverBorderWidth: 10,
      hoverBorderColor: ['transparent', 'transparent'],
      borderColor: ['transparent', 'transparent'],
    },
  ],
};

const leftSideData = {
  labels: ['Founders', 'Advisory'],
  datasets: [
    {
      data: [9, 91],
      backgroundColor: ['#333a5f', '#7577ff'],
      hoverBackgroundColor: ['#333a5f', '#7577ff'],
      borderWidth: 10,
      hoverBorderWidth: 10,
      hoverBorderColor: ['transparent', 'transparent'],
      borderColor: ['transparent', 'transparent'],
    },
    {
      data: [9, 91],
      backgroundColor: ['#333a5f', '#595eba'],
      hoverBackgroundColor: ['#333a5f', '#595eba'],
      borderWidth: 10,
      hoverBorderWidth: 10,
      hoverBorderColor: ['transparent', 'transparent'],
      borderColor: ['transparent', 'transparent'],
    },
  ],
};

const sellChartOption = {
  legend: {
    display: false,
  },
  responsive: false,
  maintainAspectRatio: false,
  rotation: 0.5 * Math.PI,
  circumference: 1 * Math.PI,
};

const buyChartOption = {
  legend: {
    display: false,
  },
  rotation: -0.5 * Math.PI,
  circumference: 1 * Math.PI,
  responsive: false,
  maintainAspectRatio: false,
};

class SentimentAnalysis extends React.Component {
  componentWillReceiveProps(nextProps) {
    leftSideData.datasets[0].data = [
      nextProps.tokenSentimentInfo.soldPercent,
      nextProps.tokenSentimentInfo.boughtPercent,
    ];
    leftSideData.datasets[1].data = [
      nextProps.tokenSentimentInfo.soldPercent -
        nextProps.tokenSentimentInfo.boughtTodayChange,
      nextProps.tokenSentimentInfo.boughtPercent +
        nextProps.tokenSentimentInfo.boughtTodayChange,
    ];
    rightSideData.datasets[0].data = [
      nextProps.tokenSentimentInfo.buyPercent,
      nextProps.tokenSentimentInfo.sellPercent,
    ];
    rightSideData.datasets[1].data = [
      nextProps.tokenSentimentInfo.buyPercent -
        nextProps.tokenSentimentInfo.todayBuyPercent,
      nextProps.tokenSentimentInfo.sellPercent +
        nextProps.tokenSentimentInfo.todayBuyPercent,
    ];
  }
  ChangePercent = percent => {
    if (percent > 0) {
      return <FontAwesomeIcon className={s.green} icon={faArrowUp} />;
    } else if (percent === 0) {
      return <FontAwesomeIcon className={s.white} icon={faArrowRight} />;
    }
    return <FontAwesomeIcon className={s.red} icon={faArrowDown} />;
  };
  render() {
    return (
      <Panel theme={this.props.theme}>
        <Row
          style={{ margin: 0 }}
          className={themify(s, s.root, this.props.theme)}
        >
          <Col
            style={{
              padding: 20,
              position: 'relative',
            }}
            xs={12}
          >
            <div className={s.leftTop}>
              <p>Number of Clients</p>
              <p className={s.green}>
                {`${this.props.tokenSentimentInfo.boughtPercent}%`}
              </p>
              <p className={s.green}>Bought</p>
              <p>
                {this.ChangePercent(
                  this.props.tokenSentimentInfo.boughtTodayChange,
                )}
                {`${this.props.tokenSentimentInfo.boughtTodayChange}%`}
                Today
              </p>
            </div>

            <div className={s.rightTop}>
              <p>Position Value</p>
              <p className={s.green}>
                {`${this.props.tokenSentimentInfo.buyPercent}%`}
              </p>
              <p className={s.green}>Buy</p>
              <p>
                {this.ChangePercent(
                  this.props.tokenSentimentInfo.todayBuyPercent,
                )}
                {`${this.props.tokenSentimentInfo.todayBuyPercent}%`}
                Today
              </p>
            </div>
            <div className={s.leftBottom}>
              <p className={s.red}>Sold</p>
              <p className={s.red}>
                {`${this.props.tokenSentimentInfo.soldPercent}%`}
              </p>
            </div>
            <div className={s.rightBottom}>
              <p className={s.red}>Sell</p>
              <p className={s.red}>
                {`${this.props.tokenSentimentInfo.sellPercent}%`}
              </p>
            </div>
            <div className={s.chartContainer}>
              <div>
                <Doughnut
                  height={250}
                  width={115}
                  data={leftSideData}
                  options={sellChartOption}
                />
              </div>
              <div className={s.verticalDashedDivider} />
              <div>
                <Doughnut
                  height={250}
                  width={115}
                  data={rightSideData}
                  options={buyChartOption}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Panel>
    );
  }
}

SentimentAnalysis.propTypes = {
  theme: PropTypes.string,
  tokenSentimentInfo: PropTypes.shape(Object).isRequired,
};

SentimentAnalysis.defaultProps = {
  theme: 'dark',
};

const mapState = state => ({
  tokenSentimentInfo: state.tokenSentimentInfo,
});

export const WithoutRedux = withStyles(s)(SentimentAnalysis);

export default connect(
  mapState,
  undefined,
)(WithoutRedux);
