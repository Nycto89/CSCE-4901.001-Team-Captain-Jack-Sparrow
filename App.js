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
import Swiper from 'react-native-swiper';
import SplashScreen from './splashScreen/index';
import HomeScreen from './home';
import Transplant from './modalities/transplant';
import Peritoneal from './modalities/peritoneal';
import Incenter from './modalities/incenter';
import Overnight from './modalities/overnight';
import HomeHemo from './modalities/homehemo';
import Therapy from './modalities/ctherapy';
import DrawerMenu from './drawers'
import {createStackNavigator, createDrawerNavigator, 
createAppContainer, DrawerItems, DrawerActions,
CardStackStyleInterpolator} from 'react-navigation';
import {Router, Scene, Actions} from 'react-native-router-flux';

const SCREEN_WIDTH = Dimensions.get("window").width

//Home icon
var HomeButton = function() {
    return (
          <View>
            <TouchableHighlight onPress={() => Actions.mainScreen()}>
              <Image style={{height: 30, width: 30, marginRight: 20}} source={require('./images/HOME.png')}/>
            </TouchableHighlight>
          </View>
    )
}

export default class App extends Component {

  render() {
    return(
      <Router>
        <Scene key= "root">
          <Scene key="mainScreen" 
          component={HomeScreen} 
          title="Welcome!"
          renderBackButton={()=>(null)}
          panHandlers = {null}
          initial 
          />

          <Scene 
          key="drawer"
          drawer
          contentComponent={DrawerMenu}
          drawerWidth={300}
          panHandlers = {null}
          hideNavBar>

            <Scene
                key="drawer1"
                title="Kidney Transplant"
                component={Transplant}
                renderRightButton = {HomeButton}/>
            <Scene
                key="drawer2"
                title="Peritoneal Dialysis"
                component={Peritoneal}
                renderRightButton = {HomeButton}/>
            <Scene
                key="drawer3"
                title="In-Center Hemodialysis"
                component={Incenter}
                renderRightButton = {HomeButton}/>
            <Scene
                key="drawer4"
                title="Nocturnal Dialysis"
                component={Overnight}
                renderRightButton = {HomeButton}/>
            <Scene
                key="drawer5"
                title="Home Hemodialysis"
                component={HomeHemo}
                renderRightButton = {HomeButton}/>
            <Scene
                key="drawer6"
                title="Conservative Therapy"
                component={Therapy}
                renderRightButton = {HomeButton}/>
          </Scene>
        </Scene>
      </Router>
      //<AppNav />
    );
  }





  /*constructor(props){
    super(props)

    this.position = new Animated.ValueXY()
    this.state = {

    }
    this.rotate = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH,0,SCREEN_WIDTH],
        outputRange: ['-50deg', '0deg', '50deg'],
        extrapolate: 'clamp'

    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
    ]
    }
  }

  componentWillMount(){
      this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder:(evt, gestureState) => true,
            onPanResponderMove:(evt, gestureState) =>{
              this.position.setValue({x:gestureState.dx, y:gestureState.dy})
            },
            onPanResponderRelease:(evt,gestureState) => {}
      })


  }

  onPress = (id) => {
    console.log(id)
  }*/
}
