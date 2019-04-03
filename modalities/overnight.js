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
import HomeScreen from '../home';
import {Action} from 'react-native-router-flux';
import {Content, List, ListItem} from 'native-base';
import {NightData} from '../modalityData/modality_pros_n_cons';
import {modalityStyles} from './modality_style';
import {connect} from 'react-redux';
import SectionListItem from './sectionlistitem';

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

class Overnight extends Component {

  render() {

    const {navigate} = this.props.navigation;

    console.log(this.props.navigation)

    return (
      <View>
      <ScrollView>
       <View style={modalityStyles.container}>
      	<Text style={modalityStyles.header}>What is Nocturnal Dialysis?</Text>
        <View style= {{
          backgroundColor: 'white',
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20
        }}></View>
      	<Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50}]}>Nocturnal or Overnight Dialysis is a slower, longer hemodialysis 
          treatment that takes place at night while you sleep. This longer treatment is for six to eight hours, 
          three times a week. This process requires that you sleep at the dialysis center overnight. Dialysis 
          professionals who are skilled in performing hemodialysis, manage the treatments.</Text>
        <Text style={modalityStyles.header}>How does it Work?</Text>
        <View style= {{
          backgroundColor: 'white',
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20
        }}></View>
        <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50}]}>Before treatment can begin, you will need a surgical procedure that 
          creates an access site under your skin. This site allows blood to flow from your body to the dialysis 
          machine for filtering and then returns to your body cleaned. There are three types of hemodialysis access options: 
          a fistula, graft or catheter. Fistula is considered the best option for people because it is your own blood 
          vessels and has less risk of infection and clotting issues.  </Text>
        {/*SECTION LIST*/}
        <SectionList
                    renderItem={({item, index}) => {
                          return(<SectionListItem item={item} index={index}>
                            
                            </SectionListItem>);
                    }}
                    renderSectionHeader={({section}) => {
                        return(<SectionHeader section={section} />);
                    }}
                    sections={NightData}
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
export default connect(mapStateToProps)(Overnight);
