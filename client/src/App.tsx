import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import { Home } from './containers';
/* 초기 작업 여기서 */

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
