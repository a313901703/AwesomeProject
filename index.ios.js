/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import './shopApp/global.js'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppWithNavigationState from './shopApp/AppNavigator';
import configureStore from './shopApp/configureStore' 

const store = configureStore()

export default class AwesomeProject extends Component {
    //store = createStore(AppReducer);
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
  }
}
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
