import React from 'react';
import { FilterLabel, Box } from './styled-components/styled-components';

const FilterItem = ({ label }) => {
  return (
    <div className="checkboxes-list__item">
      <FilterLabel>
        <input type="checkbox" />
        <Box className="checkbox" />
        {label}
      </FilterLabel>
    </div>
  );
};

export default FilterItem;
