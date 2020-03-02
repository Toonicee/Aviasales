import React from 'react';
import PropTypes from 'prop-types';
import { FilterLabel, Box } from './styled-components/styled-components';

const FilterItem = ({ label, checked, index, inputValue, onchange, filterTransfer }) => {
  FilterItem.defaultProps = {
    onchange: () => {},
    filterTransfer: () => {},
    label: '',
    checked: false,
    index: 0,
    inputValue: 0,
  };

  FilterItem.propTypes = {
    onchange: PropTypes.func,
    filterTransfer: PropTypes.func,
    label: PropTypes.string,
    checked: PropTypes.bool,
    index: PropTypes.number,
    inputValue: PropTypes.number,
  };

  return (
    <div>
      <FilterLabel>
        <input
          type="checkbox"
          onChange={() => {
            onchange(index, inputValue);
            filterTransfer();
          }}
          checked={checked}
        />
        <Box className="checkbox" />
        {label}
      </FilterLabel>
    </div>
  );
};

export default FilterItem;
