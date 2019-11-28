import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RSelect from 'react-select';
/* eslint-disable css-modules/no-undef-class */

const Select = ({
  options,
  theme,
  onChange,
  selectedValue,
  className,
  isBaseCurrency,
}) => (
  <RSelect
    className={`root ${theme} ${className}`}
    onChange={onChange}
    options={options.map(option => ({
      value: option.id,
      label: isBaseCurrency === true ? option.abbreviation : option.name,
    }))}
    clearable={false}
    value={{
      value:
        options.find(option => option.id === (selectedValue || 1)) &&
        options.find(option => option.id === (selectedValue || 1)).id,
      label:
        options.find(option => option.id === (selectedValue || 1)) &&
        (isBaseCurrency
          ? options.find(option => option.id === (selectedValue || 1))
              .abbreviation
          : options.find(option => option.id === (selectedValue || 1)).name),
    }}
    styles={{
      option: provided => ({
        ...provided,
        background: 'transparent',
        '&:hover': {
          background: ['dark', 'darkCmc'].includes(theme)
            ? '#353e5c'
            : '#ced3e3',
        },
        height: '40px',
        padding: '10px',
        color: ['dark', 'darkCmc'].includes(theme) ? '#fff' : '#363a4c',
      }),
      control: provided => ({
        ...provided,
        background: 'transparent',
        height: '40px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '3px',
        color: ['dark', 'darkCmc'].includes(theme) ? '#fff' : '#363a4c',
      }),
      menuList: provided => ({
        ...provided,
        background: 'transparent',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor:
          theme === ['dark', 'darkCmc'].includes(theme) ? '#585d70' : '#ddd',
      }),
      menu: () => ({
        background: 'transparent',
      }),
      singleValue: () => ({
        color:
          theme === ['dark', 'darkCmc'].includes(theme) ? '#fff' : '#363a4c',
      }),
      input: provided => ({
        ...provided,
        color:
          theme === ['dark', 'darkCmc'].includes(theme) ? '#fff' : '#363a4c',
      }),
    }}
  />
);

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  theme: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.number.isRequired,
  className: PropTypes.string,
  isBaseCurrency: PropTypes.bool,
};

Select.defaultProps = {
  theme: 'dark',
  className: '',
  isBaseCurrency: false,
};

const mapState = state => ({
  theme: state.theme,
});

export default connect(mapState)(Select);
