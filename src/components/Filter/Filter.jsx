import React from 'react';
import PropTypes from 'prop-types';
import FilterItem from '../FilterItem';

import { FilterWrapper, FilterTitle, FilterList } from './styled-component/styled-component';

const Filter = ({ transferChange, filterItems }) => {
  Filter.propTypes = {
    transferChange: PropTypes.func.isRequired,
    filterItems: PropTypes.instanceOf(Array).isRequired,
  };
  return (
    <FilterWrapper className="filters__item filter">
      <FilterTitle>Количество пересадок</FilterTitle>
      <div>
        <div>
          <FilterList>
            {filterItems.map(({ label, id, checked }, index) => (
              <li key={id}>
                <FilterItem
                  label={label}
                  checked={checked}
                  index={index}
                  id={id}
                  transferChange={transferChange}
                />
              </li>
            ))}
          </FilterList>
        </div>
      </div>
    </FilterWrapper>
  );
};

export default Filter;
