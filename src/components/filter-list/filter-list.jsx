import React from 'react';
import FilterItem from '../filter-item';

import { FilterWrapper, FilterTitle, FilterList } from './styled-component/styled-component';

const Filter = () => {
  const arrNameLabel = [
    { label: 'Все', id: 'all' },
    { label: 'Без пересадок', id: 'non-stop' },
    { label: '1 персадка', id: '1-trasplant' },
    { label: '2 пересадки', id: '2-transplant' },
    { label: '3 пересадки', id: '3-transplant' },
  ];

  return (
    <FilterWrapper className="filters__item filter">
      <FilterTitle>Количество пересадок</FilterTitle>
      <div className="filter__content">
        <div className="filter__controls checkboxes-list">
          <FilterList>
            {arrNameLabel.map(({ label, id }) => (
              <li key={id}>
                <FilterItem label={label} />
              </li>
            ))}
          </FilterList>
        </div>
      </div>
    </FilterWrapper>
  );
};

export default Filter;
