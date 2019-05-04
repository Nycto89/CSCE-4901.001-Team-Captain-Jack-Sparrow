import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { modalityStyles } from './modality_style';

class PeritonealItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={{ width: Dimensions.get('window').width - 50, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
        <View style={[modalityStyles.subheadingView, { backgroundColor: this.props.themeProp.textColor, borderColor: this.props.themeProp.textColor }]}>
          <Text style={[modalityStyles.subheading, { color: this.props.themeProp.backgroundColor }]}>{this.props.item.name}</Text>
        </View>
        <Text style={[modalityStyles.data_txt, { fontSize: this.props.fontProp.fontVal, overflow: 'hidden', lineHeight: 50, color: this.props.themeProp.textColor }]}>
          {this.props.item.description}</Text>
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

export default connect(mapStateToProps)(PeritonealItem);