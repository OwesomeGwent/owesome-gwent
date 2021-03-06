import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import 'intersection-observer'; // polyfill
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Home, Modal, Notification } from './containers';
import { deckListener } from './helpers/deckUrl';
import { history } from './helpers/history';
import { notify } from './helpers/notify';
import createStore from './store/createStore';
/* 초기 작업 여기서 */
const GlobalStyle = createGlobalStyle`
  #root {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }
  body {
    margin: 0;
    background-color: #121315;
    background-image: url(/img/background/bg.jpg);
    font-family: 'Roboto', 'Noto Sans KR', sans-serif;
    word-wrap: break-word;
    word-break: keep-all;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  main {
    display: block;
  }
  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }
  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }
  a {
    background-color: transparent;
  }
  abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }
  b,
  strong {
    font-weight: bolder;
  }
  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }
  button,
  input { /* 1 */
    overflow: visible;
  }
  button,
  select { /* 1 */
    text-transform: none;
  }
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }
  legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }
  progress {
    vertical-align: baseline;
  }
  textarea {
    overflow: auto;
  }


  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }


  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }


  [type="search"] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6d6d6d',
      dark: '#24282A',
      main: '#424242',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#a4a4a4',
      dark: '#494949',
      main: '#757575',
      contrastText: '#fbfbfb',
    },
  },
});

export const store = createStore();
store.subscribe(deckListener);

export default class App extends Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>
          <Modal>
            <Router history={history}>
              <Route render={props => <Home {...props} />} />
            </Router>
          </Modal>
        </Provider>
        <Notification notify={notify} />
      </MuiThemeProvider>
    );
  }
}
