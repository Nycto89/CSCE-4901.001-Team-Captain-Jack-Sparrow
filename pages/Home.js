import React from 'react';
import { Alert, Dimensions, Image, Linking, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getClinics } from '../actions/index';
import HomeCarousel from '../carousel';


const { width, height } = Dimensions.get('window');

class HomeScreen extends React.Component {

  componentDidMount() {
    if (!this.props.clinicProps.clinicLst.length)
      this.props.getClinics();
  }

  render() {

    return (
      <View style={styles.mainViewContainer}>

        <View style={styles.picFlex}>
          <HomeCarousel />
        </View>

        <View style={[styles.tileFlexMain, { backgroundColor: this.props.themeProp.backgroundColor }]}>
          <View style={styles.tileFlexHorizontal}>
            <View style={styles.tileFlexVertical}>
              <TouchableHighlight
                style={{ paddingVertical: 0, paddingHorizontal: 60 }}
                underlayColor={'transparent'}
                activeOpacity={.8}
                onPress={() => Actions.ModalityMainScreen()}>
                <Image source={require('../images/home_icons/kidneyV3.png')} style={[styles.tile, this.iconTintStyle()]} />
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'transparent'}
                activeOpacity={.8}
                onPress={() => Actions.ModalityMainScreen()}>
                <Text style={[styles.textStyle, { color: this.props.themeProp.textColor }]}>
                  Modalities</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.tileFlexVertical}>
              <TouchableHighlight
                style={{ paddingVertical: 0, paddingHorizontal: 60 }}
                underlayColor={'transparent'}
                activeOpacity={.8}
                onPress={() => Actions.Nutrition()}>
                <Image source={require('../images/home_icons/nutrition.png')} style={[styles.tile, this.iconTintStyle()]} />
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'transparent'}
                activeOpacity={.8}
                onPress={() => Actions.Nutrition()}>
                <Text style={[styles.textStyle, { color: this.props.themeProp.textColor }]}>
                  Phosphorus{"\n"}Checker</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.tileFlexHorizontal} >
            <View style={styles.tileFlexVertical}>
              <TouchableHighlight
                style={{ paddingVertical: 0, paddingHorizontal: 60 }}
                underlayColor={'transparent'}
                activeOpacity={.8}
                onPress={() => {
                  Alert.alert(
                    'Leaving App',
                    'You are leaving the app and will be taken to https://www.esrdnetwork.org/.',
                    [
                      { text: 'Cancel' },
                      { text: 'Continue', onPress: () => Linking.openURL('https://www.esrdnetwork.org/') }
                    ],
                    { cancelable: true },
                  );
                }}>
                <Image source={require('../images/home_icons/ESRD.png')} style={[styles.tile, this.iconTintStyle()]} />
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'transparent'}
                activeOpacity={.8}
                onPress={() => {
                  Alert.alert(
                    'Leaving App',
                    'You are leaving the app and will be taken to https://www.esrdnetwork.org/.',
                    [
                      { text: 'Cancel' },
                      { text: 'Continue', onPress: () => Linking.openURL('https://www.esrdnetwork.org/') }
                    ],
                    { cancelable: true },
                  );
                }}>
                <Text style={[styles.textStyle, { color: this.props.themeProp.textColor }]}>
                  ESRD</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.tileFlexVertical}>
              <TouchableHighlight
                style={{ paddingVertical: 0, paddingHorizontal: 60 }}
                underlayColor={'transparent'}
                activeOpacity={.8}
                onPress={() => Actions.ClinicFinder()}>
                <Image source={require('../images/home_icons/map.png')} style={[styles.tile, this.iconTintStyle()]} />
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'transparent'}
                activeOpacity={.8}
                onPress={() => Actions.ClinicFinder()}>
                <Text style={[styles.textStyle, { color: this.props.themeProp.textColor }]}>
                  Clinic{"\n"}Finder</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>

        {/* <View style={[styles.tileFlexHorizontal, {backgroundColor : this.props.themeProp.backgroundColor}]} >
            <TouchableHighlight
              onPress={()=>{ Linking.openURL('https://www.esrdnetwork.org/')}}>
              <View style={{width : 265, height : 40,
                          alignItems : 'center', justifyContent: 'center',
                            borderWidth: 3, borderColor: this.props.themeProp.textColor,
                            backgroundColor : this.props.themeProp.backgroundColor}}>
                <Text style={[{fontSize: 25, color: this.props.themeProp.textColor}]}>
                    ESRD WEBSITE
                </Text>
              </View>
            </TouchableHighlight>
          </View> */}
      </View>
    );
  }

  iconTintStyle() {
    return { tintColor: this.props.themeProp.themeType ? '#e5e5e5' : '#000000' }
  }

}



const styles = StyleSheet.create({

  mainViewContainer: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },

  picFlex: {
    flex: 4,
    width: null,
    height: null
  },

  tileFlexMain: {
    flex: 4,
    alignItems: 'center',
    paddingBottom: 10

    //justifyContent : 'space-around'
  },

  tileFlexHorizontal: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent : 'space-around',
    alignItems: 'center'
  },

  tileFlexVertical: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  tile: {
    height: height * (20 / 100),
    width: width * (20 / 100),
    resizeMode: 'contain'
    // margin : 25,
    // padding : 55,
    // borderColor : 'black',
    // borderWidth : 3
  },

  textStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10

  }


});

function mapStateToProps(state) {
  return {
    themeProp: state.themeProps,
    clinicProps: state.clinicDataProps
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getClinics: getClinics }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
