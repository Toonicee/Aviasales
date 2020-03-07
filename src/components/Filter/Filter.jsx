import React from 'react';
import PropTypes from 'prop-types';
import FilterItem from '../FilterItem';

import { FilterWrapper, FilterTitle, FilterList } from './styled-component/styled-component';

const Filter = ({ handleCheckChieldElement, filterItems, handleAllChecked, inputAll }) => {
  Filter.propTypes = {
    handleCheckChieldElement: PropTypes.func.isRequired,
    handleAllChecked: PropTypes.func.isRequired,
    inputAll: PropTypes.bool.isRequired,
    filterItems: PropTypes.instanceOf(Array).isRequired,
  };

  return (
    <FilterWrapper className="filters__item filter">
      <FilterTitle>Количество пересадок</FilterTitle>
      <div>
        <div>
          <FilterItem label="Все" handleCheck={handleAllChecked} isChecked={inputAll} />
          <FilterList>
            {filterItems.map(({ value, id, isChecked }, index) => (
              <li key={id}>
                <FilterItem
                  label={value}
                  value={value}
                  isChecked={isChecked}
                  index={index}
                  id={id}
                  handleCheck={handleCheckChieldElement}
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
