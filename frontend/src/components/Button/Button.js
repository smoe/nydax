import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button as BSButton } from 'react-bootstrap';
import s from './Button.css';

const Button = props => (
  <BSButton
    style={{
      background: props.color,
      width: props.width,
      height: props.height,
    }}
    className={s.customButton}
    {...props}
  >
    {props.children}
  </BSButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  width: PropTypes.string,
  hieght: PropTypes.string,
};

Button.defaultProps = {
  color: '#7577ff',
  width: 'auto',
  hieght: '40px',
};

export default withStyles(s)(Button);
