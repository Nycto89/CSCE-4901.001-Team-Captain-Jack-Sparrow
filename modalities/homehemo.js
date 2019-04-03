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
import {HomeData} from '../modalityData/modality_pros_n_cons';
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

class HomeHemo extends Component {

  render() {

    const {navigate} = this.props.navigation;

    console.log(this.props.navigation)

    return (
      <View>
      <ScrollView>
       <View style={modalityStyles.container}>
      	<Text style={modalityStyles.header}>What is Home Hemodialysis?</Text>
      	<View style= {{
          backgroundColor: 'white',
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20
        }}></View>
        <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50}]}>Home Hemodialysis is a home dialysis option. 
          Hemodialysis is a treatment that replaces the work of your own kidneys to remove wastes and 
          extra fluid from your bloodstream. This is done using a special filter called a dialyzer or 
          artificial kidney. You can do hemodialysis at home by yourself or with a care partner. This allows 
          you to fit your treatments within a schedule. You along with your care partner will receive training at 
          your local dialysis center in order to safely perform these treatments at home.</Text>
        <Text style={modalityStyles.header}>How does it Work?</Text>
        <View style= {{
          backgroundColor: 'white',
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20
        }}></View>
        <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50}]}>You will need surgery to create an access for hemodialysis. This access is 
          quite literally, your lifeline; a way to reach your bloodstream and be able to clean your blood using the 
          dialysis machine and return it safely back to your body. There are three types of access sites for home hemodialysis: 
          fistula, graft or catheter. Fistula is considered the best option for people because it is your own blood vessels 
          and has less risk of infection and clotting issues. Using a dialysis machine at home, you’ll perform treatments 
          usually 4 to 5 times per week.  </Text>
          {/*SECTION LIST*/}
        <SectionList
                    renderItem={({item, index}) => {
                          return(<SectionListItem item={item} index={index}>
                            
                            </SectionListItem>);
                    }}
                    renderSectionHeader={({section}) => {
                        return(<SectionHeader section={section} />);
                    }}
                    sections={HomeData}
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
export default connect(mapStateToProps)(HomeHemo);
