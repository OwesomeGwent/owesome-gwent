import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import { App } from './containers';
/* 초기 작업 여기서 */

const store = createStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
