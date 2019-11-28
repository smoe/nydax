import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import themify from '../../themify';
import s from './DepthChart2.css';
/* eslint-disable */

// am4core.useTheme(am4themesAnimated);
class DepthChart extends React.Component {
  constructor(props) {
    super(props);

    this.renderChart = this.renderChart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.renderChart(nextProps);
  }

  componentDidMount() {
    this.renderChart(this.props);
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  renderChart(props) {
    if (this.chart) {
      this.chart.dispose();
    }
    const chart = am4core.create('chartdiv', am4charts.XYChart);

    const pair = props.pairs.find(item => item.id === props.selectedPairId);
    chart.color = am4core.color('#fff');

    // Add data
    // Function to process (sort and calculate cummulative volume)
    function processData(list, type, desc) {
      // Convert to data points
      for (var i = 0; i < list.length; i++) {
        list[i] = {
          value: Number(list[i]['price']),
          volume: Number(list[i]['amount']) - Number(list[i]['filledAmount']),
        };
      }

      // Sort list just in case
      list.sort((a, b) => {
        if (a.value > b.value) {
          return 1;
        } else if (a.value < b.value) {
          return -1;
        }

        return 0;
      });

      const newList = list.length > 0 ? [list[0]] : [];
      for (let i = 1; i < list.length; i++) {
        if (list[i].value === list[i - 1].value)
          newList[newList.length - 1].volume = newList[newList.length - 1].volume + list[i].volume;
        else
          newList.push(list[i]);
      }
      list = newList;

      // Calculate cummulative volume
      if (desc) {
        for (var i = list.length - 1; i >= 0; i--) {
          if (i < list.length - 1) {
            list[i].totalvolume = list[i + 1].totalvolume + list[i].volume;
          } else {
            list[i].totalvolume = list[i].volume;
          }
          var dp = {};
          dp.value = list[i].value;
          dp[`${type}volume`] = list[i].volume;
          dp[`${type}totalvolume`] = list[i].totalvolume;
          res.unshift(dp);
        }
      } else {
        for (var i = 0; i < list.length; i++) {
          if (i > 0) {
            list[i].totalvolume = list[i - 1].totalvolume + list[i].volume;
          } else {
            list[i].totalvolume = list[i].volume;
          }
          var dp = {};
          dp.value = list[i].value;
          dp[`${type}volume`] = list[i].volume;
          dp[`${type}totalvolume`] = list[i].totalvolume;
          res.push(dp);
        }
      }
    }

    // Init
    var res = [];
    processData(props.orders.filter(order => order.sideId === 1 && order.pairId === props.selectedPairId), 'bids', true);
    processData(props.orders.filter(order => order.sideId === 2 && order.pairId === props.selectedPairId), 'asks', false);

    chart.data = res;

    // Set up precision for numbers
    chart.numberFormatter.numberFormat = '#,###.######';

    // Create axes
    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = 'value';
    // xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.minGridDistance = 50;
    xAxis.title.text = `Price (${pair.name})`;
    xAxis.stroke = am4core.color(['dark', 'darkCmc'].includes(props.theme) ? '#a5bdea' : '#363a4c');
    xAxis.opacity = 0.9;
    xAxis.fontSize = 11;

    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.title.text = 'Volume';
    yAxis.stroke = am4core.color(['dark', 'darkCmc'].includes(props.theme) ? '#a5bdea' : '#363a4c');
    yAxis.opacity = 0.9;
    yAxis.fontSize = 11;

    // Create series
    const series = chart.series.push(new am4charts.StepLineSeries());
    series.dataFields.categoryX = 'value';
    series.dataFields.valueY = 'bidstotalvolume';
    series.strokeWidth = 2;
    series.stroke = am4core.color('#0f0');
    series.fill = series.stroke;
    series.fillOpacity = 0.1;
    series.tooltipText =
      'Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{bidsvolume}[/]';

    const series2 = chart.series.push(new am4charts.StepLineSeries());
    series2.dataFields.categoryX = 'value';
    series2.dataFields.valueY = 'askstotalvolume';
    series2.strokeWidth = 2;
    series2.stroke = am4core.color('#f00');
    series2.fill = series2.stroke;
    series2.fillOpacity = 0.1;
    series2.tooltipText =
      'Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{asksvolume}[/]';

    const series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.dataFields.categoryX = 'value';
    series3.dataFields.valueY = 'bidsvolume';
    series3.strokeWidth = 0;
    series3.fill = am4core.color('#000');
    series3.fillOpacity = 0;

    const series4 = chart.series.push(new am4charts.ColumnSeries());
    series4.dataFields.categoryX = 'value';
    series4.dataFields.valueY = 'asksvolume';
    series4.strokeWidth = 0;
    series4.fill = am4core.color('#000');
    series4.fillOpacity = 0;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    this.chart = chart;
  }

  // componentDidMount() {
  //   const chart = am4core.create('chartdiv', am4charts.XYChart);
  //   this.chart = chart;
  //   // ... chart code goes here ...
  // }

  render() {
    return (
      <div
        id="chartdiv"
        style={{ height: 'inherit' }}
        className={themify(s,s.depthChartContainer,this.props.theme)}
      />
    );
  }
}

DepthChart.propTypes = {
  theme: PropTypes.string,
  selectedPairId: PropTypes.number.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  depthChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

DepthChart.defaultProps = {
  theme: 'dark',
};

const mapState = state => ({
  theme: state.theme,
  pairs: state.pairs,
  selectedPairId: state.pairs.length >= state.selectedPairId ? state.selectedPairId : 1,
  depthChartData: state.depthChartData,
  orders: state.lastOrders,
});

export default connect(mapState)(withStyles(s)(DepthChart));
