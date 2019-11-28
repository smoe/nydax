import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { Panel as BSPanel } from 'react-bootstrap';
import s from './Panel.css';
import themify from '../../themify';
/* eslint-disable css-modules/no-undef-class */

class Panel extends React.Component {
  render() {
    const { theme, headerTitle, hasHeader, children, ...props } = this.props;
    return (
      <BSPanel className={themify(s, s.customPanel, theme)} {...props}>
        <BSPanel.Body
          style={{
            padding: 0,
            height: 'inherit',
          }}
        >
          {hasHeader && <div className={s.panelTitle}>{headerTitle}</div>}
          {hasHeader && <div className={s.divider} />}
          {children}
        </BSPanel.Body>
      </BSPanel>
    );
  }
}

Panel.propTypes = {
  theme: PropTypes.string,
  children: PropTypes.node.isRequired,
  hasHeader: PropTypes.bool,
  headerTitle: PropTypes.string,
};

Panel.defaultProps = {
  theme: 'dark',
  hasHeader: false,
  headerTitle: '',
};

export default withStyles(s)(Panel);
