import React, { Component } from 'react';
import {Animated, TouchableHighlight, Dimensions, 
  Platform, StyleSheet, Text, 
  View, Image, PanResponder } from 'react-native';

import HomeScreen from './pages/Home.js';
import DrawerMenu from './drawer.js';
import ModalityHome from './pages/modalities/home';
import CalendarPage from './pages/Calendar.js';
import ClinicFinder from './pages/ClinicFinder.js';
import InfoPage from './pages/InfoPage.js';
import Transplant from './pages/modalities/transplant';
import Peritoneal from './pages/modalities/peritoneal';
import Incenter from './pages/modalities/incenter';
import Overnight from './pages/modalities/overnight';
import HomeHemo from './pages/modalities/homehemo';
import Therapy from './pages/modalities/ctherapy';

import SettingsModal from './modals/SettingsModal';
import SettingsLightbox from './lightboxes/SettingLightbox';

import { Router, Scene, Actions, Stack, Drawer, Modal, Lightbox} from 'react-native-router-flux';


export default class MainNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
        // <AppContainer/>
        <Router navigationBarStyle={styles.navBar} sceneStyle={styles.routerScene} titleStyle={styles.navBarTitleStyle}>
          <Lightbox key="lightbox">
          {/* <Modal key="modal" hideNavBar> */}
            <Stack key="root">
              <Drawer
              key="Drawer"
              onExit={() => {
                console.log('Drawer closed');
              }}
              onEnter={() => {
                console.log('Drawer opened');
              }}
              contentComponent={DrawerMenu}
              // drawerIcon={DrawerIcon}
              drawerImage={require('./images/menu_burger.png')}
              drawerWidth={300}
              renderRightButton={HomeButton}
              // renderTitle={PageTitle}
              hideNavBar
              >  
                <Scene key="MainScene" >
                  <Scene key="HomeScreen" 
                      component={HomeScreen} 
                      title="App Home" 
                      drawer
                      init
                      initial                      
                      />                  
                  <Scene key="ModalityMainScreen"
                      component={ModalityHome}
                      title="Modalities"
                      renderBackButton={() => (null)}
                      panHandlers={null}
                      />
                  <Scene key="CalendarPage" 
                      component={CalendarPage} 
                      title="Calendar" 
                      />
                  <Scene key="ClinicFinder" 
                      component={ClinicFinder} 
                      title="Find a clinic"
                      />
                  <Scene key="InfoPage" 
                      component={InfoPage} 
                      title="General Info" 
                      drawer
                      />
                  <Scene
                      key="KidneyTransplant"
                      title="Kidney Transplant"
                      component={Transplant}
                      />
                  <Scene
                      key="PeritonealDialysis"
                      title="Peritoneal Dialysis"
                      component={Peritoneal}                    
                      />
                  <Scene
                      key="InCenterHemodialysis"
                      title="In-Center Hemodialysis"
                      component={Incenter}                    
                      />
                  <Scene
                      key="NocturnalDialysis"
                      title="Nocturnal Dialysis"
                      component={Overnight}                     
                      />
                  <Scene
                      key="HomeHemodialysis"
                      title="Home Hemodialysis"
                      component={HomeHemo}                     
                      />
                  <Scene
                      key="ConservativeTherapy"
                      title="Conservative Therapy"
                      component={Therapy}                      
                      />
                </Scene>
              </Drawer>
            </Stack>
            <Scene key="SettingsLightbox" component={SettingsLightbox} />
          {/* </Modal>   */}
          </Lightbox>
        </Router>
    )
  }
}
  //Home icon
  const HomeButton = () => {
    if(Actions.currentScene === '_HomeScreen')
      return null;
    else
    return (
      <View>
        <TouchableHighlight onPress={() => Actions.HomeScreen({ type : "reset" })}>
          <Image style={{ height: 30, width: 30, marginRight: 20, tintColor: '#AACCFF'}} source={require('./images/HOME.png')} />
        </TouchableHighlight>
      </View>
    )
  }

  //Hamburger drawer icon
  const DrawerIcon = () => {
    return (
      <View>
        {/* <TouchableHighlight> */}
        <TouchableHighlight onPress={() => {Actions.get('Drawer').ref.toggle()}}>
          <Image style={{ height: 25, width: 15, marginLeft: 5 }} source={require('./images/menu_burger.png')} />
        </TouchableHighlight>
      </View>
    )
  }

  const styles = StyleSheet.create({
    navBar : {
      backgroundColor: '#222222', // changing navbar color
    }, 
    navBarTitleStyle: {
      // centering for Android
     flex: 1,
     textAlign: 'center',
     color: '#AACCFF'
    },
    routerScene: {
      // paddingTop : 0
    },
  });
