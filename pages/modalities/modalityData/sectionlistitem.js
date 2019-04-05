import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, 
    ScrollView, Dimensions, ListView, 
    SectionList} from 'react-native';
import {Content, List, ListItem} from 'native-base';
import {modalityStyles} from './modality_style';
import {connect} from 'react-redux';
import Image from 'react-native-scalable-image';

class SectionListItem extends Component {

    constructor(props) {
        super(props);
      }

    doesPhotoExist() {
      if (this.props.item.photo === undefined)
      {
        //do nothing
      }
      else {
      return (<Image width={90} height={90} style={{top: 20, paddingBottom: 20, tintColor: this.props.themeProp.textColor}} source={this.props.item.photo} />);
      }
    }


    render() {

        return (
          <View style={{width: Dimensions.get('window').width - 50, justifyContent: 'center', alignItems: 'center'}}>             
            {this.doesPhotoExist()}
            <Text style={[modalityStyles.data_txt, {fontSize: (this.props.fontProp.fontVal)/2, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor}]}>
              {this.props.item.description}
            </Text>
            <View style= {{
              backgroundColor: this.props.themeProp.textColor,
              height: 1,
              width: Dimensions.get('window').width - 50,
              margin: 5
            }}></View>
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

export default connect(mapStateToProps)(SectionListItem);