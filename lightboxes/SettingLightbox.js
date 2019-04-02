import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Button, Slider, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Lightbox from './BaseLightbox';

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
  fontSliderRontainer: {

  },
  colorSwitchContainer : {
    justifyContent: 'center',
  }
});

export default class SettingsLightbox extends React.Component{
  constructor(props) {
    super(props)
    this.state = { fontSize: 12,
                colorSwitchValue: false }
   } 

   getTheme(){
     return (this.state.colorSwitchValue ? 'Dark' : 'Light');
   }

   getVal(val){
    console.log(val);
    }  

  

    toggleColorSwitch = (value) => {
      this.setState({colorSwitchValue : !this.state.colorSwitchValue})
      console.log('Color switch is: ' + this.state.colorSwitchValue)
   }

    render(){
        return(
              <Lightbox verticalPercent={0.5} 
                        horizontalPercent={0.8}
                        >
      
                <View style={styles.fontSliderContainer}>
                  <Text> Font Size </Text>
                  <Slider
                  style={{ width: 200}}
                  step={1}
                  minimumValue={18}
                  maximumValue={72}
                  value={this.state.fontSize}
                  onValueChange={val => this.setState({ fontSize : val })}
                  onSlidingComplete={ val => this.getVal(val) }
                  />
                  <Text style={styles.welcome}>
                    {this.state.fontSize}
                  </Text>      
                </View>
                <View style={styles.colorSwitchContainer}>
                  <Text> Light / Dark Theme </Text>
                  <Switch onValueChange = {this.toggleColorSwitch}
                          value = {this.state.colorSwitchValue}/>
                  <Text> Current theme: {this.getTheme()} </Text> 
                </View>
                {/* <Text>Settings Lightbox {this.props.data}</Text> */}
            </Lightbox>
        )
    }
}

// const SettingsLightbox = ({ data, children }) => (

// );

// export default SettingsLightbox;

