import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import themify from '../../../themify';
import s from './PercentButton.css';

const PercentButton = ({ amount, percent, onClick, width, theme }) => (
  <button
    style={{ width }}
    className={themify(s, s.PercentButton, theme)}
    onClick={() => onClick((+amount * +percent) / 100)}
  >
    {`${percent}%`}
  </button>
);

PercentButton.propTypes = {
  amount: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  width: PropTypes.string,
  theme: PropTypes.string,
};

PercentButton.defaultProps = {
  width: 'auto',
  theme: 'dark',
};

export default withStyles(s)(PercentButton);
