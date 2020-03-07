import React from 'react';
import PropTypes from 'prop-types';
import { FilterLabel, Box } from './styled-components/styled-components';

const FilterItem = ({ label, isChecked, value, handleCheck }) => {
  FilterItem.propTypes = {
    handleCheck: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
  };

  return (
    <div>
      <FilterLabel>
        <input
          type="checkbox"
          onChange={e => {
            handleCheck(e);
          }}
          checked={isChecked}
          value={value}
        />
        <Box className="checkbox" />
        {label}
      </FilterLabel>
    </div>
  );
};

export default FilterItem;
