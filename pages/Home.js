import React, {Component} from 'react';
import { StyleSheet, Button, View, Image, Text, TouchableHighlight, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

  class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home' , 
      header : null,
  
    };
    render() {
      return (
        <View style={styles.mainViewContainer}>
          <View style={styles.titleParent}>

            <Text style={styles.title}>App Name</Text>
          </View>
          
          <View style={styles.picFlex}>
                <Image source={require('../images/harold2.jpg')} style={styles.pic} resizeMode='contain' />
          </View>

          <View style={styles.tileFlexMain}>

            <View style={styles.tileFlexHorizontal1} >
              <TouchableHighlight
                onPress={ () => this.props.navigation.navigate('Modalities')}>
                <Image source={require('../images/modalities.png')} style={styles.tile1}/>
            </TouchableHighlight>
            </View>

            <View style={styles.tileFlexHorizontal1} >
              <TouchableHighlight
                onPress={ () => this.props.navigation.navigate('InfoPage')}>
                <Image source={require('../images/kidneyinfo.png')} style={styles.tile1}/>
            </TouchableHighlight>
            </View>

            <View style={styles.tileFlexHorizontal2} >
              <TouchableHighlight
                onPress={ () => this.props.navigation.navigate('Calendar')}>
                <Image source={require('../images/calendaricon.png')} style={styles.tile2}/>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={ () => this.props.navigation.navigate('ClinicFinder')}>
                <Image source={require('../images/findericon.png')} style={styles.tile2}/>
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
      backgroundColor : 'blue'
    },

    titleParent : {
      flex : 1,
      flexDirection : 'row',
      alignItems : 'stretch',
      justifyContent : 'space-around',
      paddingTop : 10,
      textAlign : 'center',
      backgroundColor : 'orange'
    } ,

    title: {
      height : 30,
      alignSelf : 'center',
      fontSize : 24
    },

    picFlex: {
      flex: 3,
      width : null ,
      height : null ,
      backgroundColor : 'grey'
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
      backgroundColor : 'purple',
      justifyContent : 'space-around'
    }, 

    tileFlexHorizontal1 : {
      flex : 1,
      justifyContent : 'center',
      backgroundColor : 'yellow',
      padding : 15
    },

    tileFlexHorizontal2 : {
      flex : 2,
      backgroundColor : 'yellow',
      flexDirection : 'row',
      justifyContent : 'center',
      paddingBottom : 80
    },

    tile1: {
      width : 265,
      height : 50,
      borderColor : 'black',
      borderWidth : 3
    },

    tile2 : {
      height : 40,
      width : 40 ,
      margin : 15,
      padding : 55,
      borderColor : 'black',
      borderWidth : 3
    }
    
  }); 
  export default HomeScreen;
  