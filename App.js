/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Animated, Dimensions, Platform, StyleSheet, Text, View, Image, PanResponder} from 'react-native';
import {Container, Content} from 'native-base';
import Swiper from 'react-native-swiper';
import Splash from './splashScreen/index';


const SCREEN_WIDTH = Dimensions.get("window").width



type Props = {};
export default class App extends Component<Props> {

  constructor(){
    super()
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



  render() {
    return (
      <Container>
          <Content>
            <Swiper
            showsPagination={false}>
              <View style={styles.slideDefault}>
                <Animated.View {...this.PanResponder.panHandlers} style={[{backgroundColor: 'transparent'}, {position: 'absolute'},this.rotateAndTranslate]}>
                  <View style = {styles.circle} >
                    <Text style = {styles.instructions}>Slide 1</Text>
                    </View>
                </Animated.View>
                {/*<View style={styles.slideDefault}>
                  <Text>Slide 2</Text>
                </View>
                <View style={styles.slideDefault}>
                  <Text>Slide 3</Text>
                </View>*/}
              </View>
            </Swiper>
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
      width: 300,
      height: 300,
      borderRadius: 300/2,
      backgroundColor: 'white',
  },
  slideDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#9DD6EB',
    fontSize: 50,
    fontFamily: 'Helvetica',
    marginTop: 70
  },
});
