import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import { modalityStyles } from './modality_style';

class SectionListItem extends Component {

  constructor(props) {
    super(props);
  }

  doesPhotoExist() {
    if (this.props.item.icon === undefined) {
      //do nothing
    }
    else {
      return (<Image width={100} height={100} style={{ top: 20, marginBottom: 50, tintColor: this.props.themeProp.textColor }} source={this.props.item.icon} />);
    }
  }

  render() {

    return (
      <View style={{ width: Dimensions.get('window').width - 50, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
        {this.doesPhotoExist()}
        <Text style={[modalityStyles.data_txt, { fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor }]}>{this.props.item.description}</Text>
        <View style={{
          backgroundColor: this.props.themeProp.textColor,
          height: 1,
          width: Dimensions.get('window').width - 50,
          marginBottom: 20
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