import React from 'react';
import PropTypes from 'prop-types';
import { FilterLabel, Box } from './styled-components/styled-components';

const FilterItem = ({ label, checked, index, inputValue, transferChange, filterAllTickets }) => {
  FilterItem.defaultProps = {
    transferChange: () => {},
    filterAllTickets: () => {},
    label: '',
    checked: false,
    index: 0,
    inputValue: 0,
  };

  FilterItem.propTypes = {
    transferChange: PropTypes.func,
    filterAllTickets: PropTypes.func,
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
            transferChange(index, inputValue);
            filterAllTickets();
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
