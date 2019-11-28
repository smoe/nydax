import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable css-modules/no-undef-class */

const TradingPlatformIcon = ({ width, height, className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 15 15"
  >
    <g fill="none" fillRule="evenodd" stroke="currentColor">
      <path d="M13.036 9.385H1.975A.975.975 0 0 1 1 8.41V1.975C1 1.436 1.437 1 1.975 1h11.06c.54 0 .975.436.975.975V8.41a.975.975 0 0 1-.974.975z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.638 14.251l4.867-4.866v4.866M12.42 14.251L7.505 9.385M1 5.819h1.638l1.928-1.494 2.217 2.536 1.445-1.669 1.35 1.669 4.432-4.223"
      />
    </g>
  </svg>
);

TradingPlatformIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default TradingPlatformIcon;
