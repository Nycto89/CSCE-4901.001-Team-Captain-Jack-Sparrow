import React from 'react';
import { StyleSheet, Dimensions, View, TouchableHighlight, Image} from 'react-native';
// import Swiper from 'react-native-swiper';
// import SplashScreen from './splashScreen/index';
import HomeScreen from '../home';
import Transplant from '../modalities/transplant';
import Peritoneal from '../modalities/peritoneal';
import Incenter from '../modalities/incenter';
import Overnight from '../modalities/overnight';
import HomeHemo from '../modalities/homehemo';
import Therapy from '../modalities/ctherapy';
import DrawerMenu from '../drawers';
import { Router, Scene, Actions } from 'react-native-router-flux';
// import {
//   createStackNavigator, createDrawerNavigator,
//   createAppContainer, DrawerItems, DrawerActions,
//   CardStackStyleInterpolator
// } from 'react-navigation';

const SCREEN_WIDTH = Dimensions.get("window").width

export default class Modalities extends React.Component {
      render() {
      return (
        <Router>
          <Scene key="root">
            <Scene key="mainScreen"
              component={HomeScreen}
              title="Welcome!"
              renderBackButton={() => (null)}
              panHandlers={null}
              initial
            />

            <Scene
              key="drawer"
              drawer
              contentComponent={DrawerMenu}
              drawerWidth={300}
              panHandlers={null}
              hideNavBar>

              <Scene
                key="drawer1"
                title="Kidney Transplant"
                component={Transplant}
                renderRightButton={HomeButton} />
              <Scene
                key="drawer2"
                title="Peritoneal Dialysis"
                component={Peritoneal}
                renderRightButton={HomeButton} />
              <Scene
                key="drawer3"
                title="In-Center Hemodialysis"
                component={Incenter}
                renderRightButton={HomeButton} />
              <Scene
                key="drawer4"
                title="Nocturnal Dialysis"
                component={Overnight}
                renderRightButton={HomeButton} />
              <Scene
                key="drawer5"
                title="Home Hemodialysis"
                component={HomeHemo}
                renderRightButton={HomeButton} />
              <Scene
                key="drawer6"
                title="Conservative Therapy"
                component={Therapy}
                renderRightButton={HomeButton} />
            </Scene>
          </Scene>
        </Router>
        //<AppNav />
      );
    }
}

//Home icon
var HomeButton = function () {
  return (
    <View>
      <TouchableHighlight onPress={() => Actions.mainScreen()}>
        <Image style={{ height: 30, width: 30, marginRight: 20 }} source={require('../images/HOME.png')} />
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});