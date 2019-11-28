/**
 * Body Component wrap other components of a route.
 * It adds default stylings and capabilities to wrapped pages
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReduxToastr from 'react-redux-toastr';
import themify from '../../themify';
import s from './Body.css';

const Body = props => {
  const { children } = props;
  return (
    <div className={themify(s, s.root, props.theme)}>
      {children}
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
        preventDuplicates
      />
    </div>
  );
};

Body.propTypes = {
  theme: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Body.defaultProps = {
  theme: 'dark',
};

const mapState = state => ({
  theme: state.theme,
});

export default connect(
  mapState,
  undefined,
)(withStyles(s)(Body));
