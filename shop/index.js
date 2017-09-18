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

import App from './app';

//let store = createStore(todoApp);

export default class IosIndex extends Component {
  render() {
    return (
        <App />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});