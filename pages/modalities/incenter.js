/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Dimensions, ListView, SectionList} from 'react-native';
import {Button} from 'native-base';
import {DrawerActions} from 'react-navigation';
import ModalityHome from './home';
import {Action} from 'react-native-router-flux';
import {Content, List, ListItem} from 'native-base';
import {InCenterData} from './modalityData/modality_pros_n_cons';

class SectionListItem extends Component {
  render() {

      return (
        <View>
          <Text style={styles.data_txt}>
            {this.props.item.description}
          </Text>
          <View style= {{
          backgroundColor: 'white',
          height: 1,
          marginRight: 4
        }}></View>
        </View>
      );
  }
}

class SectionHeader extends Component {
  render() {

      return (
        <View>
          <Text style={styles.header}>
            {this.props.section.title}
          </Text>
        </View>
      )

  }

}

class Incenter extends Component {

  render() {

    const {navigate} = this.props.navigation;

    console.log(this.props.navigation)

    return (
      <View>
      <ScrollView>
       <View style={styles.container}>
      	<Text style={styles.header}>What is In-Center Hemodialysis?</Text>
      	<Text style={styles.important_txt}>In-Center Hemodialysis is a procedure where you go 
          to a dialysis clinic 3 days per week in order to have your blood cleaned of waste 
          products and excess fluids. These treatments last anywhere from 3 to 5 hours for daytime 
          hemodialysis or around 8 hours for nocturnal (nighttime) hemodialysis.</Text>
        <Text style={styles.header}>How does it Work?</Text>
        <Text style={styles.important_txt}>Before treatment can begin, you will need a surgical 
          procedure that creates an access site under your skin. This site allows blood to flow from 
          your body to the dialysis machine for filtering and then returns to your body cleaned. There 
          are three types of hemodialysis access options: a fistula, graft or catheter. Fistula is 
          considered the best option for people because it is your own blood vessels and has less risk 
          of infection and clotting issues.</Text>
        <Text style={styles.header}>The Routine for Hemodialysis</Text>
        <Text style={styles.important_txt}>1) Go to dialysis center. Your weight will be checked to see 
                                           how much fluid needs to be removed by dialysis. {'\n'}
                                           2) Wash access site to prevent infection.{'\n'}
                                           3) A dialysis center professional will take your blood pressure, 
                                           pulse and temperature, then they’ll perform a physical assessment.{'\n'}
                                           4) A professional will place two needles in your access. Your access 
                                           site is connected to the tubing on the hemodialysis machine and the treatment 
                                           begins.{'\n'}
                                              {'\t'} You will be regularly monitored during your treatment to make sure 
                                              you are tolerating it well. {'\n'}
                                           5) Sit back, relax, watch tv or do something else you enjoy while the 
                                           professionals take care of you. {'\n'}
                                           6) At the end of treatment, your needles are removed and a pressure 
                                           dressing is applied. {'\n'}
                                           7) Vitals are checked and weight recorded to determine how much fluid is removed. {'\n'}
                                           8) You’re now free to go home and resume your normal activities. {'\n'}
        </Text>
        {/*SECTION LIST*/}
        <SectionList
                    renderItem={({item, index}) => {
                          return(<SectionListItem item={item} index={index}>
                            
                            </SectionListItem>);
                    }}
                    renderSectionHeader={({section}) => {
                        return(<SectionHeader section={section} />);
                    }}
                    sections={InCenterData}
                    keyExtractor={(item, index) => item.name}
          >

          </SectionList>
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
  },
  data_txt: {
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Arial',
    color: 'white'
  }
});

export default Incenter;
