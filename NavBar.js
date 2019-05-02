import React, { Component } from 'react';
import {TouchableHighlight, Text, View, Image, Platform, StyleSheet, Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

const STATUSBAR_SIZE = isIphoneX() ? 50 : 20;

class NavBar extends Component {

    constructor(props) {
        super(props);
    }
  
    render() {
      return (
        <View>
            <StatusBarBackground/>
            <View  style={{ 
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems : 'center',        
                backgroundColor : this.props.themeProp.backgroundColor,
                // ...Platform.select({
                //     ios : {
                //         paddingTop: 5,
                //         marginTop: 20,
                //         height : 50,
                //     },
                //     android : {
                //         paddingTop : 5,
                //         height : 60
                //     }
                // }),
                paddingTop : 5,
                height : 60,
                borderRadius : 0,}}
                >
                <StatusBarBackground/>
                
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-start', paddingLeft : 10 }}>
                    <DrawerIcon themeProps={this.props.themeProp}/>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center',}}>
                    <NavBarTitle text={this.props.title} themeProps={this.props.themeProp}/>
                </View>

                <View style={{ flexDirection: 'row', justifyContent : 'flex-end' , flex: 1 }}>
                    <HomeButton themeProps={this.props.themeProp}/>
                </View>
                
            </View>    
        </View>
      );
    }
  }
  function StatusBarBackground(props){
    return(
        <View style={[styles.statusBarBackground, props.color || {}]}> 
        {/* This part is just so you can change the color of the status bar from the parents by passing it as a prop */}
        </View>
      );
  }

  function HomeButton(props){
    if(Actions.currentScene === 'HomeScreen' || 
     (Actions.currentScene === 'SettingsLightbox' && Actions.prevScene === 'HomeScreen'))
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
            <Text style={{ color : props.themeProps.textColor, fontSize : 20, fontWeight : '800' }}>{props.text}</Text>  
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
    
    function isIphoneX() {
        const dim = Dimensions.get('window');
        return (
          // This has to be iOS
          Platform.OS === 'ios' &&
          // Check either, iPhone X or XR
          (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
        );
      }
      
      function isIPhoneXSize(dim) {
        return dim.height == 812 || dim.width == 812;
      }
      
      function isIPhoneXrSize(dim) {
        return dim.height == 896 || dim.width == 896;
      }

//   export default NavBar;

const styles = StyleSheet.create({
    statusBarBackground: {
      height: (Platform.OS === 'ios') ? STATUSBAR_SIZE : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
      backgroundColor: (98,98,98),
    }
  
  })

  function mapStateToProps(state) {
    return {
      themeProp: state.themeProps,
      fontProp: state.fontProps
    };
  }
  
  
  export default connect(mapStateToProps)(NavBar);