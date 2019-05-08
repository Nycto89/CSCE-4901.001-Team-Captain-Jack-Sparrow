/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {Platform, StatusBar} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MainNavigator from './Navigator.js';
import { persistor, store } from './reducers/configureStore';





export default class App extends Component {
  componentDidMount(){
    if(Platform.OS == 'ios'){
      let darkTheme = store.getState().themeProps.themeType;
      if(darkTheme) StatusBar.setBarStyle('light-content', true);
      else          StatusBar.setBarStyle('dark-content', true);
    }//end if ios
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    )
  }
}
