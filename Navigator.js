import React, { Component } from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Actions, Drawer, Lightbox, Router, Scene, Stack } from 'react-native-router-flux';
import { connect } from 'react-redux';
import DrawerMenu from './drawer.js';
import SettingsLightbox from './lightboxes/SettingLightbox';
import NavBarCustom from './NavBar';
import ClinicFinder from './pages/ClinicFinder.js';
import HomeScreen from './pages/Home.js';
import Therapy from './pages/modalities/ctherapy';
import ModalityHome from './pages/modalities/home';
import HomeHemo from './pages/modalities/homehemo';
import Incenter from './pages/modalities/incenter';
import Overnight from './pages/modalities/overnight';
import Peritoneal from './pages/modalities/peritoneal';
import Transplant from './pages/modalities/transplant';
import Nutrition from './pages/Nutrition.js';
import Tutorial from './pages/Tutorial.js';







class MainNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: this.props.visitProp.visited,
    };

    // Disables yellow box warnings for demo
    //console.disableYellowBox = true;
    ;
  }

  render() {
    return (
      // <AppContainer/>
      <Router
        navBar={NavBarCustom}
        navigationBarStyle={styles.navBar}
        sceneStyle={styles.routerScene}
        titleStyle={styles.navBarTitleStyle}
      >
        <Lightbox key="lightbox">
          {/* <Modal key="modal" hideNavBar> */}
          <Stack key="root">
            <Drawer
              key="Drawer"
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
                  title="Home"
                  drawer
                  initial={this.state.first}
                />
                <Scene key="Tutorial"
                  component={Tutorial}
                  title="Tutorial"
                  drawer
                  hideNavBar={!this.state.first}
                  initial={!this.state.first}
                />
                <Scene key="ModalityMainScreen"
                  component={ModalityHome}
                  title="Modalities"
                  renderBackButton={() => (null)}
                  panHandlers={null}
                />
                <Scene key="ClinicFinder"
                  component={ClinicFinder}
                  title="Find a clinic"
                />
                <Scene key="Nutrition"
                  component={Nutrition}
                  title="Phosphorus Lookup"
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
function HomeButton() {
  // if(Actions.currentScene === 'HomeScreen')
  //   return null;
  // else
  return (
    <View>
      <TouchableHighlight onPress={() => Actions.HomeScreen({ type: "reset" })}>
        <Image style={{ height: 30, width: 30, marginRight: 20, tintColor: '#AACCFF' }} source={require('./images/HOME.png')} />
      </TouchableHighlight>
    </View>
  )
}

//Hamburger drawer icon
const DrawerIcon = () => {
  return (
    <View>
      {/* <TouchableHighlight> */}
      <TouchableHighlight onPress={() => { Actions.get('Drawer').ref.toggle() }}>
        <Image style={{ height: 25, width: 15, marginLeft: 5, tintColor: 'white' }} source={require('./images/menu_burger_2.png')} />
      </TouchableHighlight>
    </View>
  )
}





const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#222222', // changing navbar color
  },
  navBarTitleStyle: {
    // centering for Android
    flex: 1,
    textAlign: 'center',
    color: 'white'
  },
  routerScene: {
    // paddingTop : 0
  },
});

//  export default MainNavigator

function mapStateToProps(state) {
  return {
    visitProp: state.visitProps
  };
}
export default connect(mapStateToProps)(MainNavigator);