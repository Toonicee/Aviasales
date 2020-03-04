import React from 'react';
import PropTypes from 'prop-types';
import FilterItem from '../FilterItem';

import { FilterWrapper, FilterTitle, FilterList } from './styled-component/styled-component';

const Filter = ({ filterItems, transferChange, filterAllTickets }) => {
  Filter.defaultProps = {
    transferChange: () => {},
    filterAllTickets: () => {},
    filterItems: [],
  };

  Filter.propTypes = {
    transferChange: PropTypes.func,
    filterAllTickets: PropTypes.func,
    filterItems: PropTypes.instanceOf(Array),
  };
  return (
    <FilterWrapper className="filters__item filter">
      <FilterTitle>Количество пересадок</FilterTitle>
      <div>
        <div>
          <FilterList>
            {filterItems.map(({ label, id, checked, inputValue }, index) => (
              <li key={id}>
                <FilterItem
                  label={label}
                  checked={checked}
                  index={index}
                  inputValue={inputValue}
                  transferChange={transferChange}
                  filterAllTickets={filterAllTickets}
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
