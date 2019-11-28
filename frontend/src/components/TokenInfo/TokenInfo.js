import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Button } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
// import Panel from '../Panel';
import s from './TokenInfo.css';
import themify from '../../themify';
import {
  teamChartColors,
  marketChartColors,
} from '../../constants/tokenInfoChartsColors';

// destribution data
const tokenAllocationTeam = {
  labels: ['Founders', 'Advisory', 'Tech Team', 'Private Sell'],
  datasets: [
    {
      data: [300, 50, 100, 200],
      backgroundColor: teamChartColors,
      hoverBackgroundColor: teamChartColors,
      borderWidth: 0,
      hoverBorderWidth: 10,
      hoverBorderColor: teamChartColors,
      borderColor: teamChartColors,
    },
  ],
};

const tokenAllocationMarket = {
  labels: ['Product', 'Marketing', '# Operations', 'Buy back'],
  datasets: [
    {
      data: [300, 50, 100, 200],
      backgroundColor: marketChartColors,
      hoverBackgroundColor: marketChartColors,
      borderWidth: 0,
      hoverBorderWidth: 10,
      hoverBorderColor: marketChartColors,
      borderColor: marketChartColors,
    },
  ],
};

const chartOptions = {
  legend: {
    display: true,
    position: 'right',
    labels: {
      usePointStyle: true,
      // boxWidth: 15,
      // padding: 10,
      fontSize: 11,
      fontColor: '#8997c0',
      fontFamily: 'Courier',
    },
  },
};

class TokenInfo extends React.Component {
  componentWillReceiveProps(nextProps) {
    tokenAllocationTeam.datasets[0].data =
      nextProps.tokenInfo.teamAllocationData;
    tokenAllocationMarket.datasets[0].data =
      nextProps.tokenInfo.marketAllocationData;
  }
  render() {
    return (
      <Row
        style={{ margin: 0 }}
        className={themify(s, s.root, this.props.theme)}
      >
        <Col sm={6} style={{ padding: 0 }}>
          <Row className={s.infoRow}>
            <Col sm={6} className={s.infoCol}>
              Token Name
            </Col>
            <Col sm={6} className={s.infoCol}>
              {this.props.tokenInfo.tokenName}
            </Col>
          </Row>
          <Row className={s.infoRow}>
            <Col sm={6} className={s.infoCol}>
              Token Symbol
            </Col>
            <Col sm={6} className={s.infoCol}>
              {this.props.tokenInfo.symbol}
            </Col>
          </Row>
          <Row className={s.infoRow}>
            <Col sm={6} className={s.infoCol}>
              Issuer
            </Col>
            <Col sm={6} className={s.infoCol}>
              {this.props.tokenInfo.issuer.name}
            </Col>
          </Row>
          <Row className={s.infoRow}>
            <Col sm={6} className={s.infoCol}>
              Token Type
            </Col>
            <Col sm={6} className={s.infoCol}>
              {this.props.tokenInfo.tokenType}
            </Col>
          </Row>
          <Row className={s.infoRow}>
            <Col sm={6} className={s.infoCol}>
              Token Contract Address
            </Col>
            <Col sm={6} className={s.infoCol}>
              <a href={this.props.tokenInfo.contractAddressLink}>
                {this.props.tokenInfo.contractAddress}
              </a>
            </Col>
          </Row>
          <Row className={s.infoRow}>
            <Col sm={6} className={s.infoCol}>
              Max Supply
            </Col>
            <Col sm={6} className={s.infoCol}>
              {this.props.tokenInfo.maxSupply}
            </Col>
          </Row>
          <Row className={s.infoRow}>
            <Col sm={6} className={s.infoCol}>
              Total Circulation
            </Col>
            <Col sm={6} className={s.infoCol}>
              {this.props.tokenInfo.tokenCirculation}
            </Col>
          </Row>
          <Row className={s.infoRow}>
            <Col sm={6} className={s.infoCol}>
              Number of Token Holders
            </Col>
            <Col sm={6} className={s.infoCol}>
              {this.props.tokenInfo.numberOfHolders}
            </Col>
          </Row>
          <Row className={s.infoRow}>
            <Col sm={6} className={s.infoCol}>
              Issuer Website
            </Col>
            <Col sm={6} className={s.infoCol}>
              <a href={this.props.tokenInfo.issuer.siteUrl}>
                {this.props.tokenInfo.issuer.siteName}
              </a>
            </Col>
          </Row>
          <Row className={s.infoRow}>
            <Col sm={6} className={s.infoCol}>
              Issuer Telegram
            </Col>
            <Col sm={6} className={s.infoCol}>
              <a href={this.props.tokenInfo.issuer.telegramUrl}>
                {this.props.tokenInfo.issuer.telegramId}
              </a>
            </Col>
          </Row>
          <p className={s.headLine}>About the Product</p>
          <Row className={s.description}>{this.props.tokenInfo.aboutToken}</Row>
          <p className={s.headLine}>Legal Documents</p>
          <Row style={{ margin: 0, padding: 10 }}>
            <a href={this.props.tokenInfo.issuer.discloserUrl}>
              - Token Issuer Discloser
            </a>
            <br />
            <a href={this.props.tokenInfo.buyerAgreementUrl}>
              - Token Buyers Agreement
            </a>
            <br />
            <a href={this.props.tokenInfo.reDistributionAgreementUrl}>
              - Token Re-Distribution Agreement
            </a>
          </Row>
        </Col>
        <Col
          sm={6}
          style={{
            padding: 0,
            paddingTop: 10,
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <Col md={10} sm={12}>
            <div>
              <Doughnut data={tokenAllocationTeam} options={chartOptions} />
            </div>
          </Col>
          <Col md={10} sm={12}>
            <div>
              <Doughnut data={tokenAllocationMarket} options={chartOptions} />
            </div>
          </Col>
          <br />
          <Col sm={12}>
            <div style={{ width: '50%', margin: 'auto' }}>
              <Button
                bsStyle="primary"
                onClick={() => {
                  window.location.href = `/startup-info/${
                    this.props.tokenInfo.id
                  }`;
                }}
              >
                Go To Token Page
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    );
  }
}

TokenInfo.defaultProps = {
  theme: 'dark',
};

TokenInfo.propTypes = {
  theme: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  tokenInfo: PropTypes.object.isRequired,
};

export default withStyles(s)(TokenInfo);
