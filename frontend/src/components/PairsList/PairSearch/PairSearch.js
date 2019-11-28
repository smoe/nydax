import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import { setFilteredPairs } from '../../../actions/pairs';
import themify from '../../../themify';
import s from './PairSearch.css';
/* eslint-disable css-modules/no-undef-class */

const search = (pairs, filterKey) => {
  if (filterKey === '') {
    return pairs;
  }
  const filteredPairs = pairs.filter(
    item => item.name.toLowerCase().search(filterKey.toLowerCase()) !== -1,
  );
  return filteredPairs;
};

class PairSearch extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.onFilterDone(this.props.pairs);
  }

  handleInputChange = filterKey => {
    const filteredPairs = search(this.props.pairs, filterKey);
    this.props.onFilterDone(filteredPairs);
  };

  render() {
    return (
      <div
        className={
          this.props.showSearchInHeader
            ? cx(s.searchContainer, s.inHeader)
            : s.searchContainer
        }
      >
        <div className={s.search}>
          <FormGroup
            controlId="searchFrom"
            className={themify(s, s.searchCustomInput, this.props.theme)}
          >
            <InputGroup>
              <InputGroup.Addon className={s.inputIcon}>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Addon>
              <FormControl
                onChange={e => this.handleInputChange(e.target.value)}
                type="text"
                name="searchKey"
                placeholder="Search"
              />
            </InputGroup>
          </FormGroup>
        </div>
      </div>
    );
  }
}

PairSearch.propTypes = {
  theme: PropTypes.string,
  pairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFilterDone: PropTypes.func.isRequired,
  showSearchInHeader: PropTypes.bool,
};

PairSearch.defaultProps = {
  theme: 'dark',
  showSearchInHeader: false,
};

const mapState = state => ({
  pairs: state.pairs,
});

const mapDispatch = dispatch => ({
  onFilterDone(filteredPairs) {
    dispatch(setFilteredPairs(filteredPairs));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(PairSearch));
