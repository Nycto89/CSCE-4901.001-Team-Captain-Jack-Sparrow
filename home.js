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
            <Swiper showsPagination={false}>
              <View style={styles.slideDefault}>
                    <TouchableHighlight onPress= {() => Actions.drawer1()}>
                    <View style={styles.circle}>
                    <Text style={styles.buttonText}>Kidney Transplant</Text>
                    </View>
                    </TouchableHighlight>
              </View>
              <View style={styles.slideDefault}>
                    <TouchableHighlight onPress= {() => Actions.drawer2()}>
                    <View style={styles.circle}>
                    <Text>Peritoneal Dialysis</Text>
                    </View>
                    </TouchableHighlight>
              </View>
              <View style={styles.slideDefault}>
                  <TouchableHighlight onPress= {() => Actions.drawer3()}>
                  <View style={styles.circle}>
                  <Text>In-Center Hemodialysis</Text>
                  </View>
                  </TouchableHighlight>
              </View>
              <View style={styles.slideDefault}>
                  <TouchableHighlight onPress= {() => Actions.drawer4()}>
                  <View style={styles.circle}>
                  <Text>Nocturnal Dialysis</Text>
                  </View>
                  </TouchableHighlight>
              </View>
              <View style={styles.slideDefault}>
                  <TouchableHighlight onPress= {() => Actions.drawer5()}>
                  <View style={styles.circle}>
                  <Text>Home Hemodialysis</Text>
                  </View>
                  </TouchableHighlight>
              </View>
              <View style={styles.slideDefault}>
                  <TouchableHighlight onPress= {() => Actions.drawer6()}>
                  <View style={styles.circle}>
                  <Text>Conservative Therapy</Text>
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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        textAlign: 'center'
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
  

export default HomeScreen;