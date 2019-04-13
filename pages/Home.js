import React, {Component} from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight, Dimensions } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import HomeCarousel from '../carousel';

const { width, height } = Dimensions.get('window');

  class HomeScreen extends React.Component {
    
    render() {

      return (
        <View style={styles.mainViewContainer}>
          
          <View style={[styles.picFlex, {backgroundColor : this.props.themeProp.backgroundColor}]}>
              <HomeCarousel />
          </View>

          <View style={[styles.tileFlexMain, {backgroundColor : this.props.themeProp.backgroundColor}]}>

            <View style={styles.tileFlexHorizontal}>
            <View style={styles.tileFlexVertical}>

              <TouchableHighlight
                onPress={ () => Actions.ModalityMainScreen()}>
                <Image source={require('../images/home_icons/treatment.png')} style={[styles.tile, this.iconTintStyle()]}/>
              </TouchableHighlight>
            </View>
            <View style={styles.tileFlexVertical}>
              <TouchableHighlight
                onPress={ () => Actions.Nutrition()}>
                <Image source={require('../images/home_icons/nutrition.png')} style={[styles.tile, this.iconTintStyle()]}/>
              </TouchableHighlight>
            </View>
            
            </View>

            <View style={styles.tileFlexHorizontal} >
              <View style={styles.tileFlexVertical}>
                <TouchableHighlight
                onPress={ () => Actions.CalendarPage()}>
                <Image source={require('../images/home_icons/calendar.png')} style={[styles.tile, this.iconTintStyle()]}/>
              </TouchableHighlight>
              </View>
              <View style={styles.tileFlexVertical}>
                <TouchableHighlight
                onPress={ () => Actions.ClinicFinder()}>
                <Image source={require('../images/home_icons/map.png')} style={[styles.tile, this.iconTintStyle()]}/>
              </TouchableHighlight>
              </View>
              

            </View>
          </View>
          
        </View>
          
      );
    }

    iconTintStyle = function(){
      return {tintColor : this.props.themeProp.themeType ? '#e5e5e5' : '#000000'}
    } 

  }

  

  const styles = StyleSheet.create({

    mainViewContainer : {
      flex : 1,
      // backgroundColor : 'blue'
    },

    picFlex: {
      flex: 3,
      width : null ,
      height : null 
    } ,

    tileFlexMain : {
      flex : 4,
      alignItems : 'center',
      justifyContent : 'space-around'
    }, 

    tileFlexHorizontal : {
      flex : 1,
      flexDirection : 'row',
      justifyContent : 'space-around',
      alignItems : 'center'
    },

    tileFlexVertical : {
      flex : 1,
      flexDirection : 'column',
      justifyContent : 'space-around',
      alignItems: 'center'
    },

    tile : {
      height : height * (25/100),
      width : width * (25 / 100),
      resizeMode : 'contain'
      // margin : 25,
      // padding : 55,
      // borderColor : 'black',
      // borderWidth : 3
    }
    
  }); 

  function mapStateToProps(state) {
    return {
    themeProp: state.themeProps
    };
  }


  export default connect(mapStateToProps)(HomeScreen);
  