import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HelpBlock } from 'react-bootstrap';

const FieldError = ({ error, show, color, fontWeight }) => (
  <div>
    {show && error.length !== 0 && (
      <HelpBlock
        style={{
          textAlign: 'left',
          fontSize: '11px',
          color: color || 'red',
          fontWeight,
        }}
      >
        <i className="fa fa-exclamation-circle" /> {error}
      </HelpBlock>
    )}
  </div>
);

FieldError.propTypes = {
  color: PropTypes.string,
  error: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  fontWeight: PropTypes.string,
};

FieldError.defaultProps = {
  fontWeight: 'bold',
  color: '',
};

const mapState = state => ({
  theme: state.theme,
});

export default connect(mapState)(FieldError);
