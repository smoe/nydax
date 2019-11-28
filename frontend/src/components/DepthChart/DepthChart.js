import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import $ from 'jquery';

class DepthChart extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', () => {
      this.drawASimpleChart();
    });
    this.drawASimpleChart();
  }

  drawASimpleChart() {
    if (!d3.select('#depthContainer').empty()) {
      d3.select('#depthContainer svg').remove();
    }
    const data = {
      buy: [{ x: 5, y: 10 }],
      sell: [{ x: 99.12, y: 32 }],
    };
    let sells = [];
    let buys = [];
    let totalSellOrders = 0;
    let totalBuyOrders = 0;

    if (!this.props.orders) {
      return;
    }
    let sumOfBuys = 0;

    []
      .concat(this.props.orders)
      .filter(item => item.side === 'buy')
      .map(element => {
        sumOfBuys += +element.amount * +element.price;
        return element;
      });

    buys = []
      .concat(this.props.orders)
      .filter(item => item.side === 'buy')
      .map((i, index) => {
        if (index === 0) {
          totalBuyOrders = sumOfBuys - +i.amount * i.price;
          if (totalBuyOrders === 0) totalBuyOrders = +i.amount * i.price;
          return { x: i.price, y: totalBuyOrders };
        }
        totalBuyOrders -= +i.amount * i.price;
        if (totalBuyOrders === 0) totalBuyOrders = +i.amount * i.price;
        return { x: i.price, y: totalBuyOrders };
      });

    sells = []
      .concat(this.props.orders)
      .filter(item => item.side === 'sell')
      .map((i, index) => {
        if (index === 0) {
          totalSellOrders += +i.amount * i.price;
          return { x: i.price, y: totalSellOrders };
        }
        totalSellOrders += +i.amount * i.price;
        return { x: i.price, y: totalSellOrders };
      });

    data.buy = buys;
    data.sell = sells;

    data.buy.sort((a, b) => a.x - b.x);
    data.sell.sort((a, b) => a.x - b.x);

    const BuyPrices = data.buy.map(i => i.x);
    const SellPrices = data.sell.map(i => i.x);
    const prices = [].concat(BuyPrices).concat(SellPrices);

    const BuyAmounts = data.buy.map(i => i.y);
    const SellAmounts = data.sell.map(i => i.y);
    const Amounts = [].concat(BuyAmounts).concat(SellAmounts);

    const maxX = Math.max.apply(null, prices);
    const minX = Math.min.apply(null, prices);
    const maxY = Math.max.apply(null, Amounts);

    const $container = $('#depthContainer');
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const width = $container.width() - margin.right - margin.left;
    const height = $container.height() - margin.top - margin.bottom;

    const x = d3
      .scaleLinear()
      .domain([minX, maxX])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, maxY])
      .range([height, 0]);

    const xAxis = d3.axisBottom(x).tickFormat(d => {
      let format;
      if (maxX > 10000) {
        format = d3.formatPrefix(',.0', 1e3);
        return format(d);
      }
      return d;
    });
    const yAxis = d3.axisLeft(y).tickFormat(d => {
      let format;
      if (maxY > 10000) {
        format = d3.formatPrefix(',.0', 1e3);
        return format(d);
      }
      return d;
    });

    const areaBuy = d3
      .area()
      .x(d => x(d.x))
      .y0(height)
      .y1(d => y(d.y));
    const areaSell = d3
      .area()
      .x(d => x(d.x))
      .y0(height)
      .y1(d => y(d.y));

    const lineSell = d3
      .line()
      .x(d => x(d.x))
      .y(d => y(d.y));

    const lineBuy = d3
      .line()
      .x(d => x(d.x))
      .y(d => y(d.y));

    const chartContainer = d3.select('#depthContainer');

    d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('display', 'none');

    const svg = chartContainer
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr(
        'viewBox',
        `0 0 ${Math.min(width, $container.height())} ${Math.min(
          width,
          $container.height(),
        )}`,
      )
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .append('g')
      .attr('transform', `translate(${55},${30})`);

    svg
      .append('path')
      .datum(data.buy)
      .attr('class', 'areaBuy')
      .attr('d', areaBuy);

    svg
      .append('path')
      .datum(data.sell)
      .attr('class', 'areaSell')
      .attr('d', areaSell);

    svg
      .append('path')
      .datum(data.sell)
      .attr('class', 'lineSell')
      .attr('d', lineSell);

    svg
      .append('path')
      .datum(data.buy)
      .attr('class', 'lineBuy')
      .attr('d', lineBuy);

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    const mouseG = svg.append('g').attr('class', 'mouse-over-effects');
    mouseG
      .append('path') // this is the black vertical line to follow mouse
      .attr('class', 'mouse-line')
      .style('stroke', 'black')
      .style('stroke-width', '1px')
      .style('opacity', '0');

    const mousePerLine = mouseG.append('g').attr('class', 'mouse-per-line');

    mousePerLine
      .append('circle')
      .attr('r', 7)
      .attr('class', 'pointer')
      .style('stroke', '#67ff00')
      .style('color', 'white')
      .style('fill', 'none')
      .style('stroke-width', '1px')
      .style('opacity', '0');

    const textContainer = mousePerLine
      .append('svg:rect')
      .style('opacity', '0')
      .attr('width', 100)
      .attr('rx', '10')
      .attr('ry', '10')
      .attr('height', 40)
      .attr('fill', '#97a1b8')
      .attr('transform', 'translate(-50,-55)');

    mousePerLine.append('text').attr('transform', 'translate(-30,-30)');
    mouseG
      .append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', () => {
        // on mouse out hide line, circles and text
        d3.selectAll('.mouse-per-line .pointer').style('opacity', '0');
        d3.selectAll('.mouse-per-line text').style('opacity', '0');
        textContainer.style('opacity', '0');
      })
      .on('mouseover', () => {
        // on mouse in show line, circles and text
        d3.selectAll('.mouse-per-line .pointer').style('opacity', '1');
        d3.selectAll('.mouse-per-line text').style('opacity', '1');
        textContainer.style('opacity', '1');
      })
      .on('mousemove', function() {
        // mouse moving over canvas
        const mouse = d3.mouse(this);
        d3.select('.mouse-line').attr('d', () => {
          let d = `M${mouse[0]},${height}`;
          d += ` ${mouse[0]},${0}`;
          return d;
        });
        d3.selectAll('.mouse-per-line').attr('transform', function() {
          const xpos = x.invert(mouse[0]);
          const bisect = d3.bisector(d => d.x).left;
          let pos = null;

          if (
            mouse[0] >
            d3
              .select('.lineBuy')
              .node()
              .getPointAtLength(
                d3
                  .select('.lineBuy')
                  .node()
                  .getTotalLength(),
              ).x
          ) {
            textContainer
              .style('stroke', '#ff4e6d')
              .style('stroke-width', '2')
              .style('Opacity', '0.45');
            d3.selectAll('.mouse-per-line .pointer')
              .style('stroke', '#ff4e6d')
              .style('fill', '#ff4e6d');
            bisect(data.sell, xpos);
            let beginning = 0;
            let end = d3
              .select('.lineSell')
              .node()
              .getTotalLength();
            let target = null;
            pos = null;
            while (true) {
              target = Math.floor((beginning + end) / 2);
              pos = d3
                .select('.lineSell')
                .node()
                .getPointAtLength(target);
              if (
                (target === end || target === beginning) &&
                pos.x !== mouse[0]
              ) {
                break;
              }
              if (pos.x > mouse[0]) end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; // position found
            }
          } else {
            textContainer
              .style('stroke', '#67ff00')
              .style('stroke-width', '2')
              .style('Opacity', '0.45');
            d3.selectAll('.mouse-per-line .pointer')
              .style('stroke', '#67ff00')
              .style('fill', '#67ff00');
            bisect(data.buy, xpos);
            let beginning = 0;
            let end = d3
              .select('.lineBuy')
              .node()
              .getTotalLength();
            let target = null;
            pos = null;
            while (true) {
              target = Math.floor((beginning + end) / 2);
              pos = d3
                .select('.lineBuy')
                .node()
                .getPointAtLength(target);
              if (
                (target === end || target === beginning) &&
                pos.x !== mouse[0]
              ) {
                break;
              }
              if (pos.x > mouse[0]) end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; // position found
            }
          }

          d3.select(this)
            .select('text')
            .text(x.invert(pos.x).toFixed(6));

          return `translate(${mouse[0]},${pos.y})`;
        });
      });
  }

  render() {
    return <div id="depthContainer" className="depthChart" />;
  }
}
DepthChart.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default DepthChart;
