import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated, Button, Dimensions, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

class BaseLightbox extends Component {
  static propTypes = {
    children: PropTypes.any,
    horizontalPercent: PropTypes.number,
    verticalPercent: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      duration: 500,
      toValue: 1,
    }).start();
  }

  closeModal = () => {
    Animated.timing(this.state.opacity, {
      duration: 500,
      toValue: 0,
    }).start(Actions.pop);
  };

  _renderLightBox = () => {
    const { children, horizontalPercent = 1, verticalPercent = 1 } = this.props;
    const height = verticalPercent ? deviceHeight * verticalPercent : deviceHeight;
    const width = horizontalPercent ? deviceWidth * horizontalPercent : deviceWidth;
    return (
      <View
        style={{
          width,
          height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: this.props.themeProp.backgroundColor,
        }}
      >
        {children}
        <Button style={{ paddingTop: 50 }} title="Close" onPress={this.closeModal} />
      </View>
    );
  };

  render() {
    // return <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>{this._renderLightBox()}</Animated.View>;
    return <Animated.View style={[styles.container, { opacity: 1 }]}>{this._renderLightBox()}</Animated.View>;
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52,52,52,0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    fontProp: state.fontProps,
    themeProp: state.themeProps
  };
}
export default connect(mapStateToProps)(BaseLightbox);