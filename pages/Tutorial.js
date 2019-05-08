import React from 'react';
import { Alert, Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setVisited } from '../actions/index';

//import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');


class Tutorial extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visited: false,
    }
  }

  componentDidMount() {
    if (this.props.visitProp.visited === this.state.visited){
      //StatusBar.setBarStyle('light-content', true);
      this.setState(() => {
        this.props.setVisited();
      });
    }
      

  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: this.props.themeProp.backgroundColor }}>

        <View style={[{ alignItems: 'center', marginTop: 25 }]}>
          <Text style={[styles.textStyle,
          {
            color: this.props.themeProp.textColor,
            fontSize: this.props.fontProp.fontVal + 5,
            fontWeight: 'bold'
          }]}>
            Welcome </Text>

          <Text style={[styles.textStyle, { color: this.props.themeProp.textColor, fontSize: this.props.fontProp.fontVal }]}>
            And Thank You for using the ESRD app.
            We are proud to provide this app to help educate on and assist those suffering from End Stage Renal Disease. This short tutorial will serve to explain what the icons on the home page are and the features they lead to. We hope this app can help make life easier for those suffering from ESRD.
              </Text>
        </View>

        <View style={[{ alignItems: 'center', marginTop: 15 }]}>

          <Text style={[styles.textStyle,
          {
            color: this.props.themeProp.textColor,
            fontSize: this.props.fontProp.fontVal + 5,
            fontWeight: 'bold'
          }]}>

            Features </Text>

          <View style={styles.tileFlexVertical}>
            <Image source={require('../images/home_icons/kidneyV2.png')} style={[styles.tile, this.iconTintStyle()]} />
            <Text style={[styles.textStyle, { color: this.props.themeProp.textColor, fontWeight: 'bold', fontSize: this.props.fontProp.fontVal }]}>

              Modalities</Text>
            <Text style={[styles.textStyle, { color: this.props.themeProp.textColor, fontSize: this.props.fontProp.fontVal }]}>
              Selecting this feature will give you the option to read up on different treatment modalities, their potential benefits, and considerations when deciding a treatment route. </Text>
          </View>
          <View style={styles.tileFlexVertical}>
            <Image source={require('../images/home_icons/nutrition.png')} style={[styles.tile, this.iconTintStyle()]} />
            <Text style={[styles.textStyle, { color: this.props.themeProp.textColor, fontWeight: 'bold', fontSize: this.props.fontProp.fontVal }]}>
              Phosphorus Search</Text>
            <Text style={[styles.textStyle, { color: this.props.themeProp.textColor, fontSize: this.props.fontProp.fontVal }]}>

              As phosphorus is not required on nutrition labels, this lets you scan a barcode or enter a food item that searches the USDA's National Nutrient Database to learn the phosphorus content of that food.</Text>
          </View>

          <View style={styles.tileFlexVertical}>
            <Image source={require('../images/home_icons/map.png')} style={[styles.tile, this.iconTintStyle()]} />
            <Text style={[styles.textStyle, { color: this.props.themeProp.textColor, fontWeight: 'bold', fontSize: this.props.fontProp.fontVal }]}>
              Find a Clinic</Text>
            <Text style={[styles.textStyle, { color: this.props.themeProp.textColor, fontSize: this.props.fontProp.fontVal }]}>
              The app will ask for your permission to access the device's GPS and find dialysis clinics in your immediate area.</Text>
          </View>

          <View style={styles.tileFlexHorizontal}>
            <Image source={require('../images/home_icons/nutrition.png')} style={[styles.tile, this.iconTintStyle()]} />
            <Image source={require('../images/home_icons/map.png')} style={[styles.tile, this.iconTintStyle()]} />
          </View>
          <View style={styles.tileFlexVertical}>
          <TouchableHighlight
                style={{ paddingVertical: 0, paddingHorizontal: 60 }}
                underlayColor={'transparent'}
                activeOpacity={.8}
                onPress={() => {
                  Alert.alert(
                    'Leaving App',
                    'You are leaving the app and will be taken to our privacy policy.',
                    [
                      { text: 'Cancel' },
                      { text: 'Continue', onPress: () => Linking.openURL('https://esrd-app.flycricket.io/privacy.html') }
                    ],
                    { cancelable: true },
                  );
                }}>
                <Text style={[styles.textStyle, { textDecorationLine: "underline", color: this.props.themeProp.textColor, fontWeight: 'bold', fontSize: this.props.fontProp.fontVal }]}>
              Privacy Policy (Click to Open)</Text>
              </TouchableHighlight>
            <Text style={[styles.textStyle, { color: this.props.themeProp.textColor, fontSize: this.props.fontProp.fontVal }]}>
              The app does not store or share any user or device data. The app does temporarily collect camera and location data to lookup results relevant to user searches.</Text>
          </View>

          <View style={[styles.tileFlexVertical, { marginBottom: 15 }]}>
            <Image source={require('../images/home_icons/ESRD.png')} style={[styles.tile, this.iconTintStyle()]} />
            <Text style={[styles.textStyle, { color: this.props.themeProp.textColor, fontWeight: 'bold', fontSize: this.props.fontProp.fontVal }]}>

              ESRD Link</Text>
            <Text style={[styles.textStyle, { color: this.props.themeProp.textColor, fontSize: this.props.fontProp.fontVal }]}>

              A link to the website of the sponsors of the app, the End Stage Renal Disease Network. Clicking the icon will send you to the ESRD website for more information.</Text>
          </View>

        </View>
        <TouchableOpacity
          style={[{ backgroundColor: this.props.themeProp.textColor, height: this.props.fontProp.fontVal * 2, alignItems: 'center', justifyContent: 'space-around' }]}
          onPress={() => Actions.HomeScreen()}>
          <Text style={[styles.textStyle, { color: this.props.themeProp.backgroundColor, fontSize: this.props.fontProp.fontVal }]}>
            Go to Home Screen</Text>
        </TouchableOpacity>

      </ScrollView>
    )
  }

  iconTintStyle() {
    return { tintColor: this.props.themeProp.themeType ? '#e5e5e5' : '#000000' }
  }
}



const styles = StyleSheet.create({

  tileFlexMain: {
    flex: 1,
    alignItems: 'center',
  },

  tileFlexHorizontal: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  tileFlexVertical: {
    alignItems: 'center',
  },


  tile: {
    height: height * (25 / 100),
    width: width * (25 / 100),
    resizeMode: 'contain'
  },

  textStyle: {
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center'
  }


});

function mapStateToProps(state) {
  return {
    themeProp: state.themeProps,
    visitProp: state.visitProps,
    fontProp: state.fontProps
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setVisited: setVisited }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Tutorial);