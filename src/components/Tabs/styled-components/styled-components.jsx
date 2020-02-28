import styled from 'styled-components';

const TabsButton = styled.button`
  width: 50%;
  display: inline-block;
  height: 50px;
  left: calc(50% - 251px / 2 + 252.5px);
  background: ${props => (props.active ? '#2196F3' : '#fff')};
  color: ${props => (props.active ? '#fff' : '#4A4A4A')};
  border: 1px solid #dfe5ec;
`;

const Span = styled.span`
  font-size: 12px;
  font-family: 'Open Sans', sans-serif !important;
  line-height: 20px;
`;

export { TabsButton, Span };
