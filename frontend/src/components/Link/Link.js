import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setRoute } from '../../actions/route';
// import history from '../../history';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: null,
  };

  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    // this.props.changeRoute(this.props.to);
    window.location.href = this.props.to;
    // history.push(this.props.to);
  };

  render() {
    const { to, children, ...props } = this.props;
    return (
      <a
        style={{ textDecoration: 'none' }}
        href={to}
        {...props}
        onClick={this.handleClick}
      >
        {children}
      </a>
    );
  }
}

Link.propTypes = {
  changeRoute: PropTypes.func.isRequired,
};

const mapDispatch = dispatch => ({
  changeRoute(newRoute) {
    dispatch(setRoute(newRoute));
  },
});

export default connect(
  undefined,
  mapDispatch,
)(Link);
