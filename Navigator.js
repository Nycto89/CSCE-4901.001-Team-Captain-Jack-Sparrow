import React, { Component } from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './pages/Home.js';
import Modalities from './pages/Modalities.js';
import CalendarPage from './pages/Calendar.js';
import ClinicFinder from './pages/ClinicFinder.js';
import InfoPage from './pages/InfoPage.js';

const MainNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    Modalities: {screen: Modalities},
    Calendar : { screen: CalendarPage},
    ClinicFinder : {
      screen: ClinicFinder,
      navigationOptions: ()=>({
                               title:'Clinic Finder',
                               headerStyle: {
                                 backgroundColor: '#000000'
                               },
                               headerTitleStyle:{
                                 color: '#ffffff'
                               },
                               headerTintColor: '#ffffff'
                              })
    },
    InfoPage : { screen: InfoPage }
  } , {
    headerMode: 'screen',
    headerLayoutPreset: 'center'
  });

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;