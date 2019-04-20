import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, 
    ScrollView, Dimensions, ListView, 
    SectionList, Image} from 'react-native';
import {Content, List, ListItem} from 'native-base';
import {modalityStyles} from './modality_style';
import {connect} from 'react-redux';


class SectionHeader extends Component {

  doesPhotoExist(v_photo) {
    if (v_photo === undefined)
    {
      //do nothing
    }
    else {
    return (<Image width={Dimensions.get('window').width} style={{paddingBottom: 20}} source={v_photo} />);
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

    render() {

        return (
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
        )

    }

}

function mapStateToProps(state) {
  return {
  fontProp: state.fontProps,
  themeProp: state.themeProps
  };
}

export default connect(mapStateToProps)(SectionHeader);