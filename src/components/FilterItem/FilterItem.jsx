import React from 'react';
import PropTypes from 'prop-types';
import { FilterLabel, Box } from './styled-components/styled-components';

const FilterItem = ({ label, checked, index, id, transferChange }) => {
  FilterItem.propTypes = {
    transferChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  };

  return (
    <div>
      <FilterLabel>
        <input
          type="checkbox"
          onChange={() => {
            transferChange(index, id);
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
