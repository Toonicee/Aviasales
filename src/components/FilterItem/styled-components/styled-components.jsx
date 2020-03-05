import styled from 'styled-components';

import shape from '../../../img/Shape.svg';

const Box = styled.span`
  display: inline-block;
  left: 0;
  margin-right: 10px;
  position: relative;
  width: 20px;
  height: 20px;
`;

const FilterLabel = styled.label`
  text-align: left;
  cursor: pointer;
  height: 40px;
  padding: 0 20px;
  font-weight: normal;
  font-size: 13px;
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    background: #f1fcff;
  }
  &:focus {
    background: #f1fcff;
    .checkbox {
      &::after {
        border: 1px solid red;
      }
    }
  }
  &:active {
    background: #f1fcff;
  }

  input {
    opacity: 0;
    position: absolute;
    z-index: -1;
    &:checked {
      + .checkbox {
        &::before {
          content: '';
          position: absolute;
          background-position: center center;
          width: 12px;
          height: 8px;
          top: 6px;
          left: 5px;
          background: url(${shape}) no-repeat;
        }
        &::after {
          border: 1px solid #2196f3;
        }
      }
    }
    + .checkbox::after {
      content: '';
      width: 20px;
      height: 20px;
      position: absolute;
      border: 1px solid #9abbce;
      box-sizing: border-box;
      border-radius: 2px;
    }
  }
`;

export { FilterLabel, Box };
