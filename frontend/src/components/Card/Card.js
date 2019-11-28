import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import themify from '../../themify';
import s from './Card.css';
/* eslint-disable css-modules/no-undef-class */

const Card = ({ imageUrl, text, theme }) => (
  <div className={s.cardArticle}>
    <img src={imageUrl} alt={text} />
    <div className={themify(s, s.text, theme)}>{text}</div>
    <div className={themify(s, s.readMore, theme)}>Read more article</div>
  </div>
);

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  theme: PropTypes.string,
};

Card.defaultProps = {
  theme: 'dark',
};

export default withStyles(s)(Card);
