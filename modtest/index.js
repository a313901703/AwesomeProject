/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers';

import App from './conponents/App';

let store = createStore(todoApp);

export default class IosIndex extends Component {
  render() {
    return (
        <Provider store={store}>
        <App />
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});