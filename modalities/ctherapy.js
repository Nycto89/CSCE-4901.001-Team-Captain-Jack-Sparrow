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


class Therapy extends Component {

  render() {

    const {navigate} = this.props.navigation;

    console.log(this.props.navigation)

    return (
      <View>
      <ScrollView>
       <View style={styles.container}>
      	<Text style={styles.header}>What does Conservative Therapy mean?</Text>
      	<Text style={styles.important_txt}>The option of choosing not to perform 
          dialysis is entirely up to you. There may be times when dialysis isn’t 
          the right choice for someone with kidney disease. If you decide not to 
          perform dialysis, you may opt for conservative therapy or conservative 
          care. This process involves your doctors keeping you comfortable for 
          the remainder of your life, which includes providing relief from the 
          discomfort and pain from kidney failure. However, choosing conservative 
          therapy is an important decision that should be discussed between you, 
          your doctor and your loved ones. {'\n'} People who choose conservative 
          therapy can live between a few months or sometimes more than a year. 
          The time frame differs depending on your medical conditions, how much 
          kidney function remains and your diet and amount of fluids.  However, 
          without dialysis, a person with ESRD will die a natural death. {'\n'}
          If you decide on this option, talk to your doctor about ways to reduce 
          pain and symptoms of kidney failure such as swelling or shortness of 
          breath. You may also discuss options such as palliative care or hospice 
          care to enhance comfort for the remainder of your life.</Text>
          <View style= {
            {backgroundColor: 'white',
            height: 1,
            marginRight: 4}}></View>
          <Text style={styles.paramount_line}>Remember it’s your life and your decision, but it’s important to 
            weigh all your options to make an informed choice.</Text>
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
    paddingRight: 10,
    lineHeight: 30
  },
  paramount_line: {
    fontSize: 20,
    padding: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  }
});

export default Therapy;
