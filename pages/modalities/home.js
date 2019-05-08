import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';

class ModalityHome extends Component {

  onPressLearnMore() {

  }

  constructor(props) {
    super(props);
    this.state = {
      cIndex: 0
    };
  }


  render() {

    const { navigate } = this.props.navigation;

    return (
      <Swiper loop={false}
        dotStyle={{ height: 20, width: 20 }}
        activeDotStyle={{ height: 20, width: 20 }}
        dotColor={this.props.themeProp.textColor} activeDotColor='#4169E1' onIndexChanged={(swipe_index) => {
          setTimeout(() => this.setState({ swipe_index }), 200)
        }}>
        <View style={[styles.slideDefault, { backgroundColor: this.props.themeProp.backgroundColor }]}>
          <View style={{ flex: 0.2, justifyContent: 'flex-start', paddingTop: 0, marginBottom: 10 }}>
            <Text style={[styles.headingText, { color: this.props.themeProp.textColor }]}>Kidney Transplant</Text>
          </View>
          <TouchableHighlight 
              underlayColor={'transparent'}
              activeOpacity={.8}
              onPress={() => Actions.KidneyTransplant()}>
            <View style={[styles.circle, { borderColor: this.props.themeProp.textColor }]}>
              <Image style={[styles.imageStyle, { aspectRatio: 4 / 3, tintColor: this.props.themeProp.textColor }]} source={require('../../images/transplant.png')} resizeMode="cover" />
            </View>
          </TouchableHighlight>
        </View>
        <View style={[styles.slideDefault, { backgroundColor: this.props.themeProp.backgroundColor }]}>
          <View style={{ flex: 0.2, justifyContent: 'flex-start', paddingTop: 0, marginBottom: 0 }}>
            <Text style={[styles.headingText, { color: this.props.themeProp.textColor }]}>Peritoneal Dialysis</Text>
          </View>
          <TouchableHighlight 
              underlayColor={'transparent'}
              activeOpacity={.8}
              onPress={() => Actions.PeritonealDialysis()}>
            <View style={[styles.circle, { borderColor: this.props.themeProp.textColor }]}>
              <Image style={[styles.imageStyle, { aspectRatio: 385 / 378, tintColor: this.props.themeProp.textColor }]} source={require('../../images/peritoneal.png')} resizeMode="cover" />
            </View>
          </TouchableHighlight>
        </View>
        <View style={[styles.slideDefault, { backgroundColor: this.props.themeProp.backgroundColor }]}>
          <View style={{ flex: 0.2, justifyContent: 'flex-start', paddingTop: 0, marginBottom: 0 }}>
            <Text style={[styles.headingText, { color: this.props.themeProp.textColor }]}>In-Center Dialysis</Text>
          </View>
          <TouchableHighlight 
            underlayColor={'transparent'}
            activeOpacity={.8}
            onPress={() => Actions.InCenterHemodialysis()}>
            <View style={[styles.circle, { borderColor: this.props.themeProp.textColor }]}>
              <Image style={[styles.imageStyle, { aspectRatio: 326 / 404, tintColor: this.props.themeProp.textColor }]} source={require('../../images/incenter.png')} resizeMode="cover" />
            </View>
          </TouchableHighlight>
        </View>
        <View style={[styles.slideDefault, { backgroundColor: this.props.themeProp.backgroundColor }]}>
          <View style={{ flex: 0.2, justifyContent: 'flex-start', paddingTop: 0, marginBottom: 0 }}>
            <Text style={[styles.headingText, { color: this.props.themeProp.textColor }]}>Nocturnal Dialysis</Text>
          </View>
          <TouchableHighlight 
            underlayColor={'transparent'}
            activeOpacity={.8}
            onPress={() => Actions.NocturnalDialysis()}>
            <View style={[styles.circle, { borderColor: this.props.themeProp.textColor }]}>
              <Image style={[styles.imageStyle, { aspectRatio: 405 / 407, tintColor: this.props.themeProp.textColor }]} source={require('../../images/nocturnal.png')} resizeMode="cover" />
            </View>
          </TouchableHighlight>
        </View>
        <View style={[styles.slideDefault, { backgroundColor: this.props.themeProp.backgroundColor }]}>
          <View style={{ flex: 0.2, justifyContent: 'flex-start', paddingTop: 0, marginBottom: 0 }}>
            <Text style={[styles.headingText, { color: this.props.themeProp.textColor }]}>Home Hemodialysis</Text>
          </View>
          <TouchableHighlight 
            underlayColor={'transparent'}
            activeOpacity={.8}
            onPress={() => Actions.HomeHemodialysis()}>
            <View style={[styles.circle, { borderColor: this.props.themeProp.textColor }]}>
              <Image style={[styles.imageStyle, { aspectRatio: 302 / 310, tintColor: this.props.themeProp.textColor }]} source={require('../../images/home_hemo.png')} resizeMode="cover" />
            </View>
          </TouchableHighlight>
        </View>
        <View style={[styles.slideDefault, { backgroundColor: this.props.themeProp.backgroundColor }]}>
          <View style={{ flex: 0.2, justifyContent: 'flex-start', paddingTop: 0, marginBottom: 20 }}>
            <Text style={[styles.headingText, { color: this.props.themeProp.textColor }]}>Conservative Therapy</Text>
          </View>
          <TouchableHighlight 
            underlayColor={'transparent'}
            activeOpacity={.8}
            onPress={() => Actions.ConservativeTherapy()}>
            <View style={[styles.circle, { borderColor: this.props.themeProp.textColor }]}>
              <Image style={[styles.imageStyle, { aspectRatio: 342 / 337, tintColor: this.props.themeProp.textColor }]} source={require('../../images/conservative.png')} resizeMode="cover" />
            </View>
          </TouchableHighlight>
        </View>
      </Swiper>

    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
    borderWidth: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 0,
    paddingTop: 0
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Arial',
    color: '#222222',
    fontSize: 30
  },
  slideDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#222222',
    fontSize: 50,
    fontFamily: 'Helvetica',
    marginTop: 70
  },
  imageStyle: {
    height: 150,
    width: 100,
    margin: 20,
  },
  headingText: {
    fontFamily: 'Arial',
    fontSize: 35,
    flexWrap: 'wrap'
  }
});

function mapStateToProps(state) {
  return {
    fontProp: state.fontProps,
    themeProp: state.themeProps
  };
}

connect(mapStateToProps);
export default connect(mapStateToProps)(ModalityHome);