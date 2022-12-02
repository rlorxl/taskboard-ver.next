import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

html,
body {
  padding: 0 3em;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

body {
  min-width: 320px;
  min-height: 100vh;
  color: #ffffff;
  overflow-y: hidden;
  position: relative;
}

:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

h2 {
  margin: 0;
  padding: 0;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: none;
}

a:hover {
  color: #535bf2;
}
`;

export default GlobalStyle;
