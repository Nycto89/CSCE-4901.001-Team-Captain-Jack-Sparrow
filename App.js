/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Animated, TouchableHighlight, Dimensions, 
Platform, StyleSheet, Text, 
View, Image, PanResponder } from 'react-native';
import {Actions} from 'react-native-router-flux';
import AppContainer from './Navigator.js';
import {connect, Provider} from 'react-redux';

import {createStore} from 'redux';
import allReducers from './reducers/index';

import { store, persistor } from './reducers/configureStore';

import { PersistGate } from 'redux-persist/integration/react';

import MainNavigator from './Navigator.js';

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigator/>
        </PersistGate>
      </Provider>
    )
  }
}
