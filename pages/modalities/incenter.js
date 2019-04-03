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
import {modalityStyles} from './modalityData/modality_style';
import {connect} from 'react-redux';
import SectionListItem from './modalityData/sectionlistitem';

class SectionHeader extends Component {
  render() {

      return (
        <View>
          <Text style={modalityStyles.header}>
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
       <View style={modalityStyles.container}>
      	<Text style={modalityStyles.header}>What is In-Center Hemodialysis?</Text>
        <View style= {{
          backgroundColor: 'white',
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20
        }}></View>
      	<Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50}]}>In-Center Hemodialysis is a procedure where you go 
          to a dialysis clinic 3 days per week in order to have your blood cleaned of waste 
          products and excess fluids. These treatments last anywhere from 3 to 5 hours for daytime 
          hemodialysis or around 8 hours for nocturnal (night-time) hemodialysis.</Text>
        <Text style={modalityStyles.header}>How does it Work?</Text>
        <View style= {{
          backgroundColor: 'white',
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20
        }}></View>
        <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50}]}>Before treatment can begin, you will need a surgical 
          procedure that creates an access site under your skin. This site allows blood to flow from 
          your body to the dialysis machine for filtering and then returns to your body cleaned. There 
          are three types of hemodialysis access options: a fistula, graft or catheter. Fistula is 
          considered the best option for people because it is your own blood vessels and has less risk 
          of infection and clotting issues.</Text>
        <Text style={modalityStyles.header}>The Routine for Hemodialysis</Text>
        <View style= {{
          backgroundColor: 'white',
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20
        }}></View>
        <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50}]}>1) Go to dialysis center. Your weight will be checked to see 
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
          <View style={{flex: 0.2, paddingBottom: 50}}>
          </View>
       </View>
      </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
  fontProp: state.fontProps
  };
}

connect(mapStateToProps)(SectionListItem);
export default connect(mapStateToProps)(Incenter);
