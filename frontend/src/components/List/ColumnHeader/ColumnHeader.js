import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortDown,
  faSortUp,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import s from './ColumnHeader.css';
/* eslint-disable css-modules/no-undef-class */

const ColumnHeader = ({
  sortFunction,
  sortedBy,
  showingName,
  originalName,
  order,
  isSortable,
  hide,
  width,
}) => {
  const showSortIcon = () => {
    if (sortedBy === '')
      return <FontAwesomeIcon className="ml-1" icon={faSort} />;
    else if (sortedBy === originalName && order === 'ASC')
      return <FontAwesomeIcon className="ml-1" icon={faSortUp} />;
    else if (sortedBy === originalName)
      return <FontAwesomeIcon className="ml-1" icon={faSortDown} />;
    return <FontAwesomeIcon className="ml-1" icon={faSort} />;
  };
  return (
    <td
      className={hide ? s.hide : undefined}
      style={{ width }}
      role="presentation"
      onClick={() => sortFunction(originalName, order)}
    >
      <span className={s.columnHeader}>
        {showingName}&nbsp;{isSortable && showSortIcon()}
      </span>
    </td>
  );
};

ColumnHeader.propTypes = {
  sortFunction: PropTypes.func.isRequired,
  sortedBy: PropTypes.string.isRequired,
  showingName: PropTypes.string.isRequired,
  originalName: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  isSortable: PropTypes.bool.isRequired,
  hide: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
};

export default withStyles(s)(ColumnHeader);
