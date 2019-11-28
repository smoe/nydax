import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReactPlayer from 'react-player';
import themify from '../../../themify';
import s from './VideoPlayer.css';
/* eslint-disable css-modules/no-undef-class */

const VideoPlayer = ({ theme, url, height }) => (
  <div className={themify(s, s.root, theme)}>
    <ReactPlayer url={url} controls width="100%" height={height} />
  </div>
);

VideoPlayer.propTypes = {
  theme: PropTypes.string,
  height: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

VideoPlayer.defaultProps = {
  theme: 'darkCmc',
};

const mapState = state => ({
  theme: state.theme,
});

export default connect(mapState)(withStyles(s)(VideoPlayer));
export const WithoutRedux = withStyles(s)(VideoPlayer);
