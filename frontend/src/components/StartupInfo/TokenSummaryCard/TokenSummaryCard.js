import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { setSelectedPair } from '../../../actions/pairs';
import themify from '../../../themify';
import C from '../../../constants/actions';
import s from './TokenSummaryCard.css';
/* eslint-disable css-modules/no-undef-class */

const TokenSummaryCard = ({
  theme,
  pairs,
  tokenId,
  setSelectedPair, // eslint-disable-line
  tokenLogo,
  tokenSymbol,
  companyName,
  companyDescription,
  price,
  soldTokens,
  totalTokenAmount,
  showBuyTokenModal,
}) => (
  <div className={themify(s, s.root, theme)}>
    <div className={s.header}>
      <img src={tokenLogo} alt="logo" />
      <div className={s.companyNameContainer}>
        <p className={s.companyName}>{companyName}</p>
        <p className={s.companyDescription}>{companyDescription}</p>
      </div>
      <div className={s.price}>{price}</div>
    </div>
    <div className={s.body}>
      <div className={s.statistics}>
        <p className={s.statisticTitle}>Number of sold tokens</p>
        <p className={s.statistic}>{soldTokens}</p>
      </div>
      <div className={s.statistics}>
        <p className={s.statisticTitle}>Total token amount</p>
        <p className={s.statistic}>{totalTokenAmount}</p>
      </div>
      <br />
      <Button
        bsStyle="success"
        block
        onClick={() => {
          setSelectedPair(
            pairs.find(item =>
              [item.baseTokenId, item.quoteTokenId].includes(tokenId),
            ).id,
          );
          showBuyTokenModal(tokenId);
        }}
      >
        <div style={{ padding: 5 }}>Buy {tokenSymbol} Token instantly</div>
      </Button>
      <div className={s.watchVideo}>
        <i className="fa fa-2x fa-play-circle" /> &nbsp;Watch into video to
        learn more about {tokenSymbol}
      </div>
    </div>
  </div>
);

TokenSummaryCard.propTypes = {
  theme: PropTypes.string,
  pairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedPair: PropTypes.func.isRequired,
  tokenId: PropTypes.number.isRequired,
  tokenLogo: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  companyDescription: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  soldTokens: PropTypes.number.isRequired,
  totalTokenAmount: PropTypes.number.isRequired,
  showBuyTokenModal: PropTypes.func.isRequired,
};

TokenSummaryCard.defaultProps = {
  theme: 'darkCmc',
};

const mapState = state => ({
  theme: state.theme,
  pairs: state.pairs,
});

const mapDispatch = dispatch => ({
  setSelectedPair(id) {
    dispatch(setSelectedPair(id));
  },
  showBuyTokenModal(tokenId) {
    dispatch({ type: C.SET_INITIAL_TOKEN_FOR_BUY, payload: tokenId });
    dispatch({ type: C.TOGGLE_BUY_TOKEN_MODAL });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(TokenSummaryCard));
export const WithoutRedux = withStyles(s)(TokenSummaryCard);
