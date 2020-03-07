import styled from 'styled-components';

const FilterTitle = styled.div`
  font-style: normal;
  margin: 15px 0 11px 20px;
  text-align: left;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const FilterWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px 0;
`;

const FilterList = styled.ul`
  padding: 0;
  margin: 0 0 5px 0;
  list-style: none;
`;

export { FilterTitle, FilterList, FilterWrapper };
