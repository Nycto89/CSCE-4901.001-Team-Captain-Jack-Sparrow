import React, {Component} from 'react';
import {Animated, TouchableHighlight, Dimensions, 
    Platform, StyleSheet, Text, 
    View, Image, PanResponder } from 'react-native';
import Swiper from 'react-native-swiper';
import {Actions} from 'react-native-router-flux';

class HomeScreen extends Component {

    onPressLearnMore()
    {
    
    }

    
  render() {

    const {navigate} = this.props.navigation;

    return (
            <Swiper>
              <View style={styles.slideDefault}>
              <View style={{flex: 0.2, justifyContent: 'flex-start', paddingTop: 0, marginBottom: 10}}>
              <Text style={styles.headingText}>Kidney Transplant</Text>
              </View> 
              <TouchableHighlight onPress= {() => Actions.drawer1()}>
              <View style={styles.circle}> 
              </View>
              </TouchableHighlight>
        </View>
        <View style={styles.slideDefault}>
              <View style={{flex: 0.2, justifyContent: 'flex-start', paddingTop: 0, marginBottom: 0}}>
              <Text style={styles.headingText}>Peritoneal Dialysis</Text>
              </View> 
              <TouchableHighlight onPress= {() => Actions.drawer2()}>
              <View style={styles.circle}>
              </View>
              </TouchableHighlight>
        </View>
        <View style={styles.slideDefault}>
            <View style={{flex: 0.2, justifyContent: 'flex-start', paddingTop: 0, marginBottom: 0}}>
              <Text style={styles.headingText}>In-Center Dialysis</Text>
            </View> 
            <TouchableHighlight onPress= {() => Actions.drawer3()}>
            <View style={styles.circle}>
            </View>
            </TouchableHighlight>
        </View>
        <View style={styles.slideDefault}>
              <View style={{flex: 0.2, justifyContent: 'flex-start', paddingTop: 0, marginBottom: 0}}>
              <Text style={styles.headingText}>Nocturnal Dialysis</Text>
              </View> 
            <TouchableHighlight onPress= {() => Actions.drawer4()}>
            <View style={styles.circle}>
            </View>
            </TouchableHighlight>
        </View>
        <View style={styles.slideDefault}>
            <View style={{flex: 0.2, justifyContent: 'flex-start', paddingTop: 0, marginBottom: 0}}>
              <Text style={styles.headingText}>Home Hemodialysis</Text>
              </View> 
            <TouchableHighlight onPress= {() => Actions.drawer5()}>
            <View style={styles.circle}>
            </View>
            </TouchableHighlight>
        </View>
        <View style={styles.slideDefault}>
            <View style={{flex: 0.2, justifyContent: 'flex-start', paddingTop: 0, marginBottom: 20}}>
              <Text style={styles.headingText}>Conservative Therapy</Text>
              </View> 
            <TouchableHighlight onPress= {() => Actions.drawer6()}>
            <View style={styles.circle}>
            </View>
            </TouchableHighlight>
        </View>
            </Swiper>

    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 300,
    height: 300,
    borderRadius: 300/2,
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 0,
    paddingTop: 0
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Arial',
        color: '#222222',
        fontSize: 30
    },
    slideDefault: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#222222'
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
      color: '#222222',
      fontSize: 50,
      fontFamily: 'Helvetica',
      marginTop: 70
    },
    imageStyle: {
      height: 200,
      width: 200,
      margin: 20
    },
    headingText: {
      fontFamily: 'Arial',
      color: 'white',
      fontSize: 35,
      flexWrap: 'wrap'
    }
  });
  

export default HomeScreen;