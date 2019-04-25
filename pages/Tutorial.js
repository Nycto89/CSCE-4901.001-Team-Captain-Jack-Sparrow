import React from 'react';
import {StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setVisited} from '../actions/index';
//import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');


class Tutorial extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          visited : false,
        }
       } 

    componentWillMount() {
      if(this.props.visitProp.visited === this.state.visited)
        this.setState(() =>{
        this.props.setVisited();
       });

    }

    render () {
      return (
        <ScrollView style={{backgroundColor: this.props.themeProp.backgroundColor}}>

          <View style = {[{alignItems: 'center', marginTop: 25}]}>
            <Text style= {[styles.textStyle, 
                          {color:this.props.themeProp.textColor, 
                          fontSize: this.props.fontProp.fontVal + 5, 
                          fontWeight: 'bold'}]}>
            Welcome </Text> 
            <Text style= {[styles.textStyle, {color:this.props.themeProp.textColor, fontSize: this.props.fontProp.fontVal}]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec ligula ex. Vestibulum tempus sit amet augue volutpat suscipit. Donec condimentum dui quis lacus porta bibendum. Sed rutrum tincidunt sodales. Sed imperdiet blandit risus vel sollicitudin. Aliquam placerat dui id felis finibus posuere. Integer arcu eros, porttitor in orci euismod, accumsan tincidunt arcu. Praesent purus quam, congue sit amet sem nec, semper fermentum mi. Sed tincidunt placerat purus, interdum rutrum nulla. Praesent mattis elit pulvinar, consectetur turpis vitae, ullamcorper ipsum.</Text>
            </View>

            <View style = {[{alignItems: 'center', marginTop: 15}]}>

            <Text style= {[styles.textStyle, 
                          {color:this.props.themeProp.textColor, 
                          fontSize: this.props.fontProp.fontVal + 5,
                          fontWeight: 'bold'}]}>

            Features </Text>

              <View style= {styles.tileFlexHorizontal}>
                  <View style= {styles.tileFlexVertical}>
                    <Image source={require('../images/home_icons/kidneyV2.png')} style={[styles.tile, this.iconTintStyle()]}/>
                    <Text style= {[styles.textStyle, {color:this.props.themeProp.textColor, fontWeight: 'bold', fontSize: this.props.fontProp.fontVal}]}>

                    Modalities</Text>
                    <Text style= {[styles.textStyle, {color:this.props.themeProp.textColor, fontSize: this.props.fontProp.fontVal}]}>
                    Selecting this feature will give you the option to read up on different treatment modalities, their potential benefits, and considerations to take into consideration when deciding. </Text>
                  </View>
                  <View style= {styles.tileFlexVertical}>
                    <Image source={require('../images/home_icons/nutrition.png')} style={[styles.tile, this.iconTintStyle()]}/>
                    <Text style= {[styles.textStyle, {color:this.props.themeProp.textColor, fontWeight: 'bold', fontSize: this.props.fontProp.fontVal}]}>
                    Phosphorus Search</Text>
                    <Text style= {[styles.textStyle, {color:this.props.themeProp.textColor, fontSize: this.props.fontProp.fontVal}]}>

                    As phosphorus is not required no nutrition labels, the app lets you scan a barcode or enter a food item that searches the USDA's National Nutrient Database to learn the phosphorus content of that food.</Text>
                  </View>
              </View>
              <View style= {styles.tileFlexHorizontal}>
              <View style= {styles.tileFlexVertical}>
                    <Image source={require('../images/home_icons/map.png')} style={[styles.tile, this.iconTintStyle()]}/>
                    <Text style= {[styles.textStyle, {color:this.props.themeProp.textColor, fontWeight: 'bold', fontSize: this.props.fontProp.fontVal}]}>
                        Find a Clinic</Text>
                        <Text style= {[styles.textStyle, {color:this.props.themeProp.textColor, fontSize: this.props.fontProp.fontVal}]}>
                        The app will ask for your permission to access the device's GPS and find dialysis clinics in your immediate area.</Text>
                  </View>
                <View style= {[styles.tileFlexVertical, {marginBottom: 15}]}>
                    <Image source={require('../images/home_icons/ESRD.png')} style={[styles.tile, this.iconTintStyle()]}/>
                    <Text style= {[styles.textStyle, {color:this.props.themeProp.textColor, fontWeight: 'bold', fontSize: this.props.fontProp.fontVal}]}>

                    ESRD Link</Text>
                    <Text style= {[styles.textStyle, {color:this.props.themeProp.textColor, fontSize: this.props.fontProp.fontVal}]}>

                    A link to the website of the sponsors of the app, the End Stage Renal Disease Network. Will open in a new page</Text>
                  </View>
                
              </View>
            </View>
            <TouchableOpacity 
            style={[{backgroundColor: this.props.themeProp.textColor, height: this.props.fontProp.fontVal * 2, alignItems: 'center', justifyContent: 'space-around'} ]} 
            onPress= {() => Actions.HomeScreen()}>
                    <Text style= {[styles.textStyle, {color:this.props.themeProp.backgroundColor, fontSize: this.props.fontProp.fontVal}]}>
              HomeScreen</Text>
            </TouchableOpacity>

        </ScrollView>
      )
    }

    iconTintStyle(){
      return {tintColor : this.props.themeProp.themeType ? '#e5e5e5' : '#000000'}
    } 
}



const styles = StyleSheet.create({

  tileFlexMain : {
    flex : 1,
    alignItems : 'center',
  }, 

  tileFlexHorizontal : {
    flexDirection : 'row',
    flexWrap: 'wrap', 
    alignItems : 'center'
  },

  tileFlexVertical : {
    alignItems: 'center',
  },


  tile : {
    height : height * (25/100),
    width : width * (25 / 100),
    resizeMode : 'contain'
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

  function matchDispatchToProps(dispatch){
    return bindActionCreators({setVisited: setVisited}, dispatch)
  }
  
  export default connect(mapStateToProps, matchDispatchToProps)(Tutorial);