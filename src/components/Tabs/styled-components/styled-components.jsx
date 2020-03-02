import styled from 'styled-components';

const TabsButton = styled.button`
  width: 50%;
  display: inline-block;
  font-size: 15px;
  height: 50px;
  left: calc(50% - 251px / 2 + 252.5px);
  background: ${props => (props.active ? '#2196F3' : '#fff')};
  color: ${props => (props.active ? '#fff' : '#4A4A4A')};
  border: 1px solid #dfe5ec;
  &:nth-child(1) {
    border-radius: 10px 0 0 10px;
  }
  &:nth-child(2) {
    border-radius: 0 10px 10px 0;
  }
`;

export default TabsButton;
