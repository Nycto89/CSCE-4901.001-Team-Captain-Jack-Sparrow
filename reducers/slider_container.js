import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Slider from 'react-native-slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeFontSize } from '../actions/index';


class FontSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 30,
    };
  }

  getFontProp = () => {
    return this.props.fontProp.map((fontPropety) => {
      return (fontPropety.fontVal);
    })
  }

  change(value) {
    this.setState(() => {
      value = parseInt(value)
      this.props.changeFontSize(value);
    });
  }

  getFontValue() {
    return (
      <View style={{ justifyContent: 'center', paddingBottom: 20 }}>
        <Text key="fontSize" style={{ color: this.props.themeProp.textColor, textAlign: 'center' }}>Font Size: {this.props.fontProp.fontVal}</Text>
        <Text key="fSizePreview" style={{ fontSize: this.props.fontProp.fontVal, color: this.props.themeProp.textColor, textAlign: 'center' }}>
          Aa
                </Text>
      </View>
    );
  }

  render() {
    const { value } = this.state;
    return (
      <View>
        <Slider
          step={5}
          maximumValue={50}
          minimumValue={15}
          onValueChange={this.change.bind(this)}
          value={this.props.fontProp.fontVal}
          trackStyle={{ width: 250 }}
          style={{
            margin: 15
          }}
          thumbTintColor='gray'
          minimumTrackTintColor='gray'
          maximumTrackTintColor={this.props.themeProp.sliderColor}
        />
        {this.getFontValue()}
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

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ changeFontSize: changeFontSize }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(FontSlider);