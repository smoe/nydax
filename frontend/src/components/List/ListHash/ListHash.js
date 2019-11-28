import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { toastr } from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
/* eslint-disable css-modules/no-undef-class */

const ListHash = ({ hash }) => (
  <div>
    <span>{`${hash.substring(0, 15)}...`}</span>
    &nbsp;
    <button
      onClick={() => {
        copy(hash);
        toastr.info('copied!');
      }}
      style={{
        height: 'auto',
        color: '#f00',
        background: 'transparent',
        border: 0,
      }}
    >
      <FontAwesomeIcon icon={faCopy} title="copy" color="#a5bdea" />
    </button>
  </div>
);

ListHash.propTypes = {
  hash: PropTypes.string.isRequired,
};

export default ListHash;
