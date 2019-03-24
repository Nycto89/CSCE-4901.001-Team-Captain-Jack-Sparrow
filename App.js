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

export default class App extends Component{
  render() {
    return (
        <AppContainer/>
    )
  }
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
