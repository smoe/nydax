import React from 'react';
import { Tabs as BSTabs } from 'react-bootstrap';
import PropTypes from 'prop-types';
/* eslint-disable css-modules/no-undef-class */

const Tabs = props => {
  if (props.align === 'right')
    return (
      <BSTabs id="tab" className={`customTab right ${props.theme}`} {...props}>
        {props.children}
      </BSTabs>
    );
  if (props.align === 'left')
    return (
      <BSTabs id="tab" className={`customTab left ${props.theme}`} {...props}>
        {props.children}
      </BSTabs>
    );
  return (
    <BSTabs id="tab" className={`customTab ${props.theme}`} {...props}>
      {props.children}
    </BSTabs>
  );
};

Tabs.propTypes = {
  align: PropTypes.string,
  theme: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Tabs.defaultProps = {
  align: '',
  theme: 'dark',
};

export default Tabs;
