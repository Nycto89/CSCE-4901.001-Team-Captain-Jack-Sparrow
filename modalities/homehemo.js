/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Dimensions, ListView} from 'react-native';
import {Button} from 'native-base';
import {DrawerActions} from 'react-navigation';
import HomeScreen from '../home';
import {Action} from 'react-native-router-flux';
import {Content, List, ListItem} from 'native-base';


class HomeHemo extends Component {

  render() {

    const {navigate} = this.props.navigation;

    console.log(this.props.navigation)

    return (
      <View>
      <ScrollView>
       <View style={styles.container}>
      	<Text style={styles.header}>What is Home Hemodialysis?</Text>
      	<Text style={styles.important_txt}>Home Hemodialysis is a home dialysis option. 
          Hemodialysis is a treatment that replaces the work of your own kidneys to remove wastes and 
          extra fluid from your bloodstream. This is done using a special filter called a dialyzer or 
          artificial kidney. You can do hemodialysis at home by yourself or with a care partner. This allows 
          you to fit your treatments within a schedule. You along with your care partner will receive training at 
          your local dialysis center in order to safely perform these treatments at home.</Text>
        <Text style={styles.header}>How does it Work?</Text>
        <Text style={styles.important_txt}>You will need surgery to create an access for hemodialysis. This access is 
          quite literally, your lifeline; a way to reach your bloodstream and be able to clean your blood using the 
          dialysis machine and return it safely back to your body. There are three types of access sites for home hemodialysis: 
          fistula, graft or catheter. Fistula is considered the best option for people because it is your own blood vessels 
          and has less risk of infection and clotting issues. Using a dialysis machine at home, you’ll perform treatments 
          usually 4 to 5 times per week.  </Text>
       </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#A52A2A',
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height*2),
    paddingTop: 60,
    paddingLeft: 20
  },
  header: {
    fontSize: 30,
    paddingBottom: 15,
    fontFamily: 'Verdana',
    color: 'white'
  },
  important_txt: {
    fontSize: 15,
    paddingBottom: 20,
    fontFamily: 'Arial',
    color: 'white',
    textAlign: 'left',
    paddingRight: 10
  }
});

export default HomeHemo;
