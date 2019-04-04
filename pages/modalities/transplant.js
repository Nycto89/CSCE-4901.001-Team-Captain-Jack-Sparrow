/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, 
ScrollView, Dimensions, ListView, 
SectionList, Image} from 'react-native';
import {Button} from 'native-base';
import {DrawerActions} from 'react-navigation';
import ModalityHome from './home';
import {Actions} from 'react-native-router-flux';
import {Content, List, ListItem} from 'native-base';
import {KidneyTransplant} from './modalityData/modality_pros_n_cons';
import {modalityStyles} from './modalityData/modality_style';
import {connect} from 'react-redux';
import SectionListItem from './modalityData/sectionlistitem';
import SectionHeader from './modalityData/sectionheader';

var i_fontSize = 24;

class Transplant extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    console.log("Value: " + this.props.fontProp.fontVal);

    return (
      <View>
      <ScrollView>
       <View style={[modalityStyles.container, {backgroundColor: this.props.themeProp.backgroundColor}]}>
      	<Text style={[modalityStyles.header, {color: this.props.themeProp.accentColor}]}>What Does it Mean to Have a Transplant?</Text>
        <View style= {{
          backgroundColor: this.props.themeProp.accentColor,
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20
        }}></View>
      	<Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}>
        A healthy kidney is placed inside your body 
      	to perform the work your own kidneys can no longer 
      	do. These kidneys can last between 12 to 15 years on 
      	average. During this time, dialysis isn’t needed.</Text>
        <Text style={[modalityStyles.header, {color: this.props.themeProp.accentColor}]}>Where do the Kidneys Come From?</Text>
        <View style= {{
          backgroundColor: this.props.themeProp.accentColor,
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20
        }}></View>
        <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}>Donated kidneys may come from someone who passed away 
          OR from a living donor. A healthy person who donates a kidney 
          can live a normal life with the kidney they have left. The wait 
          list for deceased donor kidneys is three to five years. Kidneys 
          from living donors can be transplanted faster. The operations are 
          done on the same day and can be scheduled at a convenient time for 
          both the patient and the donor.</Text>
        <Text style={[modalityStyles.header, {color: this.props.themeProp.accentColor}]}>Getting a Transplant</Text>
        <View style= {{
          backgroundColor: this.props.themeProp.accentColor,
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20
        }}></View>
        <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}>1) Ask your nephrologist or healthcare provider to refer you to a 
          transplant center for evaluation OR contact a transplant center in 
          your area.</Text>
        <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}>2) The transplant center professionals will provide a complete physical exam, 
          review your health records and conduct testing and x-rays to evaluate your ability 
          to receive surgery.</Text>
        <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}>3) Find a living donor or join the waiting list for a deceased donor kidney. 
          If you are on the waitlist, you may have to be on dialysis during this time.
        </Text>
        <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}>4) Next step: Transplant Surgery!</Text>


          {/*SECTION LIST*/}
          <SectionList
                    renderItem={({item, index}) => {
                          return(<SectionListItem item={item} index={index}>
                            
                            </SectionListItem>);
                    }}
                    renderSectionHeader={({section}) => {
                        return(<SectionHeader section={section} />);
                    }}
                    sections={KidneyTransplant}
                    keyExtractor={(item, index) => item.name}
          >

          </SectionList>
          <View style={{flex: 0.2, paddingBottom: 50}}></View>
       </View>
      </ScrollView>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
  fontProp: state.fontProps,
  themeProp: state.themeProps
  };
}

connect(mapStateToProps)(SectionListItem);
export default connect(mapStateToProps)(Transplant);

