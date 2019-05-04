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
import ModalityHome from './home';
import {Action} from 'react-native-router-flux';
import {Content, List, ListItem} from 'native-base';
import {modalityStyles} from './modalityData/modality_style';
import {connect} from 'react-redux';
import {Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import Image from 'react-native-scalable-image';

class Therapy extends Component {

  render() {
    fontS = (1.5 * this.props.fontProp.fontVal);
    fontS = (fontS > 60) ? 60 : fontS;
    const {navigate} = this.props.navigation;

    console.log(this.props.navigation)

    return (
      <View>
      <ScrollView>
       <View style={[modalityStyles.container, {backgroundColor: this.props.themeProp.backgroundColor, paddingBottom: 550}]}>
        <Collapse>
        <CollapseHeader>
        <Image width={Dimensions.get('window').width} style={{paddingBottom: 20}} source={require('../../images/stock_images/conservative_therapy.jpg')} />
      	<Text style={
          [modalityStyles.header,
          {fontSize: fontS,
          color: this.props.themeProp.accentColor}]}
        >
          What is Conservative Therapy?
        </Text>
        <View style= {{
          backgroundColor: this.props.themeProp.accentColor,
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20,
          marginLeft: 20
        }}></View>
        </CollapseHeader>
        <CollapseBody>
      	<Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}>
          The option of choosing not to perform 
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
          <Text style={[modalityStyles.paramount_line, {color: this.props.themeProp.textColor, fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50}]}>Remember it’s your life and your decision, but it’s important to 
            weigh all your options to make an informed choice.</Text>
        </CollapseBody>
        </Collapse>
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

export default connect(mapStateToProps)(Therapy);
