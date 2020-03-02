import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #E5E5E5;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #4A4A4A;
    line-height: 20px;
  }
`;

export const AppWrapper = styled.div`
  text-align: center;
  background-color: #e5e5e5;
  display: grid;
  grid-template-columns: 232px 502px;
  grid-gap: 30px 20px;
  justify-content: center;
  margin-top: 148px;
  .header__logo {
    grid-row: 1;
    grid-column: 2 / 2;
    display: flex;
    margin-left: 83px;
  }

  .sidebar {
    grid-row: 2 / 2;
    grid-column: 1 / 2;
  }

  .main {
    grid-row: 2 / 2;
    grid-column: 2 / 2;
  }
`;
