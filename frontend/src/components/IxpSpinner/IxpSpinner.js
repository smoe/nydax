import React from 'react';
// import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import lightLogo from './lightLogo.svg';
import { ThreeBounce } from 'better-react-spinkit';
// import themify from '../../themify';
import s from './IxpSpinner.css';
/* eslint-disable css-modules/no-undef-class */

const IxpSpinner = () => (
  <div className={s.root}>
    &nbsp;
    <ThreeBounce size={20} color="#b7aeae" />
  </div>
);

// IxpSpinner.propTypes = {
//   theme: PropTypes.string,
// };

// IxpSpinner.defaultProps = {
//   theme: 'dark',
// };

export default withStyles(s)(IxpSpinner);
