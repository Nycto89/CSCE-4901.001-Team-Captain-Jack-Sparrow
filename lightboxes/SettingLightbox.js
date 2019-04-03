import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Button, Slider} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Lightbox from './BaseLightbox';
import FontSlider from '../reducers/slider_container';
import { connect } from 'react-redux';
import { Switch } from 'react-native-switch';
import {bindActionCreators} from 'redux';
import {switchThemes} from '../actions/index';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontSliderContainer: {

  },
  colorSwitchContainer : {
    justifyContent: 'center',
  }
});

class SettingsLightbox extends React.Component{
  constructor(props) {
    super(props)
    this.state = { fontSize: 12,
                colorSwitchValue: false }
   } 

   getTheme(){
     return (this.props.themeProp.themeType ? 'Dark' : 'Light');
   }

   getVal(val){
    console.log(val);
    }    

    toggleColorSwitch = (value) => {
      this.setState(() =>{
        this.props.switchThemes();
    });
      console.log('Color switch is: ' + this.props.themeProp.themeType)
   }

    render(){
        return(
              <Lightbox verticalPercent={0.5} 
                        horizontalPercent={0.8}
                        >
                <View styles={styles.fontSliderContainer}>
                  <FontSlider />
                  <Text>
                    {this.props.fontProp.fontSize}
                  </Text>      
                </View>
                <View style={styles.colorSwitchContainer}>
                  <Text> Light / Dark Theme </Text>
                  <Switch 
                          value = {this.props.themeProp.themeType}
                          onValueChange = {this.toggleColorSwitch}
                          backgroundActive = {'#222222'}
                          backgroundInactive = {'#ecebea'}
                          />
                  <Text> Current theme: {this.getTheme()} </Text> 
                </View>
                {/* <Text>Settings Lightbox {this.props.data}</Text> */}
            </Lightbox>
        )
    }
}

function mapStateToProps(state) {
  return {
  fontProp: state.fontProps,
  themeProp: state.themeProps
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({switchThemes: switchThemes}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SettingsLightbox);

