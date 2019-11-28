/* eslint-disable css-modules/no-undef-class */
import React from 'react';
// import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFound.css';
// import invoIcon from './invoIcon.png';

class NotFound extends React.Component {
  // static propTypes = {
  //   title: PropTypes.string.isRequired,
  // };

  render() {
    return (
      <div className={s.root}>
        <div className={s.errorContainer}>
          <p>404</p>
        </div>
        <div className={s.messageContainer}>SORRY, PAGE NOT FOUND!</div>
        <br />
        <button
          className={s.backButton}
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Back To Dashboard
        </button>
        <div className={s.footer}>Powered By Intelisa. 2019 &copy;</div>
      </div>
    );
  }
}

export default withStyles(s)(NotFound);
