import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
