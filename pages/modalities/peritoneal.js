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
import {PeritonealData} from './modalityData/modality_pros_n_cons';
import {modalityStyles} from './modalityData/modality_style';
import {connect} from 'react-redux';
import SectionListItem from './modalityData/sectionlistitem';
import SectionHeader from './modalityData/sectionheader';
import {Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';

class Peritoneal extends Component {

  render() {

    return (
      <View>
      <ScrollView>
       <View style={[modalityStyles.container, {backgroundColor: this.props.themeProp.backgroundColor}]}>
      	<Collapse>
        <CollapseHeader>
        <Text style={[modalityStyles.header, {color: this.props.themeProp.accentColor}]}>What is Peritoneal Dialysis?</Text>
        <View style= {{
          backgroundColor: this.props.themeProp.accentColor,
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20,
          marginLeft: 20
        }}></View>
        </CollapseHeader>
        <CollapseBody>
      	<Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}>Peritoneal Dialysis or PD is a home dialysis option. 
        In PD, the inside lining of your own belly acts as a natural filter. A cleansing fluid called 
        Dialysate, washes in and out of your abdominal cavity in cycles, which removes fluids and 
        waste products.</Text>
        </CollapseBody>
        </Collapse>
        <Collapse>
        <CollapseHeader>
        <Text style={[modalityStyles.header, {color: this.props.themeProp.accentColor}]}>How does Peritoneal Dialysis Work?</Text>
        <View style= {{
          backgroundColor: this.props.themeProp.accentColor,
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20,
          marginLeft: 20
        }}></View>
        </CollapseHeader>
        <CollapseBody>
        <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}>A soft plastic tube is placed in your belly through surgery. 
            Dialysate is moved in and out of your belly through this catheter. When the solution is inside 
            your body, it draws excess fluids and waste products from your system and then is drained out 
            through the catheter. </Text>
        </CollapseBody>
        </Collapse>
        <Collapse>
        <CollapseHeader>
        <Text style={[modalityStyles.header, {color: this.props.themeProp.accentColor}]}>Where to Start</Text>
        <View style= {{
          backgroundColor: this.props.themeProp.accentColor,
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20,
          marginLeft: 20
        }}></View>
        </CollapseHeader>
        <CollapseBody>
        <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}>Receiving a PD catheter requires outpatient surgery; 
            patients usually go home on the same day. It may require healing within a few weeks, 
            but the catheter may be used almost immediately.</Text>
        <Text style={[modalityStyles.header, {color: this.props.themeProp.accentColor}]}>There are two types of Peritoneal Dialysis:</Text>
        <View style= {{
          backgroundColor: this.props.themeProp.accentColor,
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20,
          marginLeft: 20
        }}></View>
        <View style={[modalityStyles.subheadingView, {backgroundColor: this.props.themeProp.textColor, borderColor: this.props.themeProp.textColor}]}>
              <Text style={[modalityStyles.subheading, {color: this.props.themeProp.backgroundColor}]}>Continuous Ambulatory Peritoneal Dialysis (CAPD)</Text>
         </View>
         <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}> A “continuous”, machine-free dialysis where exchanges 
           of dialysate are done 4 to 5 times a day while the patient is awake and doing normal 
           activities. Each exchange takes about 30 minutes. The fluid containing the wastes 
           removed from your body is drained out and replaced by fresh dialysate. </Text>
           <View style={[modalityStyles.subheadingView, {backgroundColor: this.props.themeProp.textColor, borderColor: this.props.themeProp.textColor}]}>  
           <Text style={[modalityStyles.subheading, {color: this.props.themeProp.backgroundColor}]}>Automated Peritoneal Dialysis (APD)</Text>  
          </View>
          <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}> A machine called a Cycler delivers and then drains 
            the solution for you. The treatment is usually done at night while you sleep. Your 
            physician may order you to keep fluid dwelling during the day in addition to your cycles 
            at night depending on how much dialysis you need. </Text>
          </CollapseBody>
          </Collapse>
       {/*SECTION LIST*/}
       <SectionList
                    renderItem={({item, index}) => {
                          return(<SectionListItem item={item} index={index}>
                            
                            </SectionListItem>);
                    }}
                    renderSectionHeader={({section}) => {
                        return(<SectionHeader section={section} />);
                    }}
                    sections={PeritonealData}
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
  fontProp: state.fontProps,
  themeProp: state.themeProps
  };
}

connect(mapStateToProps)(SectionListItem);
export default connect(mapStateToProps)(Peritoneal);
