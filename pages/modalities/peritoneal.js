/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Dimensions, ListView, FlatList} from 'react-native';
import {Button} from 'native-base';
import {DrawerActions} from 'react-navigation';
import ModalityHome from './home';
import {Action} from 'react-native-router-flux';
import {Content, List, ListItem} from 'native-base';
import {PeritonealData} from './modalityData/modality_data';
import {modalityStyles} from './modalityData/modality_style';
import {connect} from 'react-redux';
import SectionListItem from './modalityData/sectionlistitem';
import SectionHeader from './modalityData/sectionheader';
import Image from 'react-native-scalable-image';
import Accordion from 'react-native-collapsible/Accordion';
import PeritonealItem from './modalityData/PeritonealSection';

class Peritoneal extends Component {

  state = {
    activeSections: [],
  };

  doesPhotoExist(v_photo) {
    if (v_photo === undefined)
    {
      //do nothing
    }
    else {
    return (<Image width={Dimensions.get('window').width} style={{paddingBottom: 20}} source={v_photo} />);
    }
  }

  doesIconExist(v_icon) {
    if (v_icon === undefined)
    {
      //do nothing
    }
    else {
    return (<Image width={90} height={90} style={{top: 20, paddingBottom: 20, tintColor: this.props.themeProp.textColor}} source={v_icon} />);
    }
  }

  doesHeadingExist(v_heading){
    if (v_heading === undefined)
    {
      //do nothing
    }
    else {
    return (v_heading);
    }
  }

  isList(data){
    if (data === undefined)
    {
      //do nothing
    }
    else
    {
    return (<FlatList
            data={data}
            renderItem= {({item, index}) => {
                          return(<SectionListItem item={item} index={index}>
                            
                            </SectionListItem>);
                    }}/>);
    }
  }

  isSection(type){
    if (type === undefined)
    {
      //do nothing
    }
    else
    {
      return (<FlatList
        data={type}
        renderItem= {({item, index}) => {
                      return(<PeritonealItem item={item} index={index}>
                        
                        </PeritonealItem>);
                }}/>);
    }
  }


  renderHeader = section => {
    return(
      <View>
      <View style= {{
        shadowColor: this.props.themeProp.textColor,
        shadowOffset: {height: 2},
        shadowRadius: 5,
        shadowOpacity: 0.5
            }}>
            {this.doesPhotoExist(section.photo)}
      </View>
        <Text style={[modalityStyles.header, {color: this.props.themeProp.accentColor}]}>{this.doesHeadingExist(section.heading)}</Text>
        <View style= {{
          backgroundColor: this.props.themeProp.accentColor,
          height: 1,
          width: (Dimensions.get('window').width) - 100,
          marginBottom: 20,
          marginLeft: 20
        }}></View>
      </View>
    );
  };

  renderContent = section => {
    return(
      <View>
      {this.isList(section.data)}
      {this.isSection(section.type)}
        <Text style={[modalityStyles.important_txt, {fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}>
          {section.text}
        </Text>
      </View>
    );
  };

  updateSections = activeSections => {
    this.setState({activeSections});
  };


  render() {

    return (
      <View>
      <ScrollView>
       <View style={[modalityStyles.container, {backgroundColor: this.props.themeProp.backgroundColor}]}>
          <Accordion
            sections={PeritonealData}
            activeSections={this.state.activeSections}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            onChange={this.updateSections}
          />
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
