import React, { Component } from 'react';
import {Animated, TouchableHighlight, Dimensions, 
    Platform, StyleSheet, Text, 
    View, Image, PanResponder } from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

class NavBar extends Component {

    constructor(props) {
        super(props);
    }
  
    render() {
      return (
        <View  style={{ flex: 1, 
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems : 'center',
            paddingTop: 20,
            marginTop: 20,
            height : 60,
            backgroundColor : this.props.themeProp.backgroundColor,
            borderRadius : 0,}}
            >
            <DrawerIcon themeProps={this.props.themeProp}/>
            <NavBarTitle text={this.props.title} themeProps={this.props.themeProp}/>
            <HomeButton themeProps={this.props.themeProp}/>
        </View>
      );
    }
  }

  function HomeButton(props){
    if(Actions.currentScene === 'HomeScreen')
      return null;
    else
    return (
        <View style={{ }}>
            <TouchableHighlight onPress={() => Actions.HomeScreen({ type : "reset" })}>
                <Image style={{ height: 30, width: 30, marginRight: 20, tintColor : props.themeProps.textColor }} source={require('./images/HOME.png')} />
            </TouchableHighlight>
        </View>
    )
    }

    function NavBarTitle(props){
    return(
        <View style={{ }}>
            <Text style={{ color : props.themeProps.textColor, fontSize : 20 }}>{props.text}</Text>  
        </View>
    )
    }

    //Hamburger drawer icon
    function DrawerIcon(props){
        return (
        <View style={{ }}>
            <TouchableHighlight onPress={() => {Actions.drawerOpen() }}>
                <Image style={{ height: 25, width: 15, marginLeft: 5, tintColor : props.themeProps.textColor }} source={require('./images/menu_burger.png')} />
            </TouchableHighlight>
        </View>
        )
    }

//   export default NavBar;

  function mapStateToProps(state) {
    return {
      themeProp: state.themeProps,
      fontProp: state.fontProps
    };
  }
  
  
  export default connect(mapStateToProps)(NavBar);