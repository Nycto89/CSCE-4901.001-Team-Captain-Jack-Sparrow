import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, 
    ScrollView, Dimensions, ListView, 
    SectionList, Image} from 'react-native';
import {Content, List, ListItem} from 'native-base';
import {modalityStyles} from './modality_style';
import {connect} from 'react-redux';


class SectionHeader extends Component {
    render() {

        return (
          <View>
            <Text style={[modalityStyles.header, {color: this.props.themeProp.accentColor}]}>
              {this.props.section.title}
            </Text>
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