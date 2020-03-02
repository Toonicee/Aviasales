import React from 'react';
import PropTypes from 'prop-types';
import FilterItem from '../FilterItem';

import { FilterWrapper, FilterTitle, FilterList } from './styled-component/styled-component';

const Filter = ({ arrNameLabel, transferChange, filterTransfer }) => {
  Filter.defaultProps = {
    transferChange: () => {},
    filterTransfer: () => {},
    arrNameLabel: [],
  };

  Filter.propTypes = {
    transferChange: PropTypes.func,
    filterTransfer: PropTypes.func,
    arrNameLabel: PropTypes.instanceOf(Array),
  };
  return (
    <FilterWrapper className="filters__item filter">
      <FilterTitle>Количество пересадок</FilterTitle>
      <div className="filter__content">
        <div className="filter__controls checkboxes-list">
          <FilterList>
            {arrNameLabel.map(({ label, id, checked, inputValue }, index) => (
              <li key={id}>
                <FilterItem
                  label={label}
                  checked={checked}
                  index={index}
                  inputValue={inputValue}
                  onchange={transferChange}
                  filterTransfer={filterTransfer}
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
