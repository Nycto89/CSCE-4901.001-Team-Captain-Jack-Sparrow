import React, {Component} from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight, Dimensions } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import HomeCarousel from '../carousel';

const { width } = Dimensions.get('window');

  class HomeScreen extends React.Component {
    
    render() {
      return (
        <View style={styles.mainViewContainer}>
          
          <View style={styles.picFlex}>
              <HomeCarousel />
                {/* <Image source={require('../images/harold2.jpg')} style={styles.pic} resizeMode='contain' /> */}
          </View>

          <View style={[styles.tileFlexMain, {backgroundColor : this.props.themeProp.backgroundColor}]}>

            <View style={styles.tileFlexHorizontal1} >
              <TouchableHighlight
                onPress={ () => Actions.ModalityMainScreen()}>
                <View style={{width : 265, height : 50,
                              borderWidth: 3, borderColor: this.props.themeProp.textColor}}>
                <Text style={[styles.tile1, {color: this.props.themeProp.textColor}]}>
                  MODALITIES
                </Text>
                </View>
            </TouchableHighlight>
            </View>

            <View style={styles.tileFlexHorizontal1} >
              <TouchableHighlight
                onPress={ () => Actions.InfoPage()}>
                <View style={{width : 265, height : 50,
                              borderWidth: 3, borderColor: this.props.themeProp.textColor}}>
                <Text style={[styles.tile1, {color: this.props.themeProp.textColor}]}>
                  KIDNEY INFO
                </Text>
                </View>
            </TouchableHighlight>
            </View>

            <View style={styles.tileFlexHorizontal2} >
              <TouchableHighlight
                onPress={ () => Actions.CalendarPage()}>
                <Image source={require('../images/calendaricon.png')} style={[styles.tile2,  {tintColor: this.props.themeProp.textColor, borderColor : this.props.themeProp.textColor}]}/>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={ () => Actions.ClinicFinder()}>
                <Image source={require('../images/findericon.png')} style={[styles.tile2,  {tintColor: this.props.themeProp.textColor, borderColor : this.props.themeProp.textColor}]}/>
            </TouchableHighlight>

            </View>
          </View>
          
        </View>
          
      );
    }
  }

  const styles = StyleSheet.create({

    mainViewContainer : {
      flex : 1,
      // backgroundColor : 'blue'
    },

    // titleParent : {
    //   flex : 1,
    //   flexDirection : 'row',
    //   alignItems : 'stretch',
    //   justifyContent : 'space-around',
    //   paddingTop : 10,
    //   textAlign : 'center',
    //   // backgroundColor : 'orange'
    // } ,

    title: {
      height : 30,
      alignSelf : 'center',
      fontSize : 24
    },

    picFlex: {
      flex: 3,
      width : null ,
      height : null 
    } ,

    pic: {
      flex : 1,
      width : width,
      // height : 400,
      alignItems : 'flex-start',
      justifyContent : 'center'
    } , 

    tileFlexMain : {
      flex : 4,
      alignItems : 'center',
      justifyContent : 'space-around'
    }, 

    tileFlexHorizontal1 : {
      flex : 1,
      justifyContent : 'center',
      padding : 15
    },

    tileFlexHorizontal2 : {
      flex : 2,
      flexDirection : 'row',
      justifyContent : 'center',
      paddingBottom : 80
    },

    tile1: {
      width : 265,
      height : 50,
      textAlign: 'center',
      fontSize: 30,
      letterSpacing: 5,
      paddingTop: 5,
      fontWeight: 'bold'
    },

    tile2 : {
      height : 40,
      width : 40 ,
      margin : 15,
      padding : 55,
      borderWidth : 3,
      tintColor: 'white'
    }
    
  }); 

  function mapStateToProps(state) {
    return {
    themeProp: state.themeProps
    };
  }


  export default connect(mapStateToProps)(HomeScreen);
  