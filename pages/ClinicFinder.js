import React, { Component } from 'react';
import { Animated, Easing, ActivityIndicator, Dimensions, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';
import { SearchBar } from 'react-native-elements';
import AwesomeButton from "react-native-really-awesome-button/src/themes/rick";
import MapView, { Marker } from 'react-native-maps';
import { createOpenLink } from 'react-native-open-maps';
import { IconButton } from 'react-native-paper';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getClinics } from '../actions/index';

class clinicFinder extends Component {
  state = { ready: false, refreshing: false, foundClinicInRegion: true, mapMargin: 1, fadeVal: new Animated.Value(0)};
  markerLst = [];
  mapRef = null;
  searchBar = null;

  //animation handling follows
  discreteFadeVal = 0;
  fadeIn(){
    this.state.fadeVal.setValue(0);
    this.discreteFadeVal = 1;
    Animated.timing(
      this.state.fadeVal,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start();
  }//end fadeIn()
  fadeOut(){
    this.state.fadeVal.setValue(1);
    this.discreteFadeVal = 0;
    Animated.timing(
      this.state.fadeVal,
      {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.linear),
        useNativeDriver: true
      }
    ).start();
  }//end fadeOut()
  //end animation handling

  ////////////////////////////////////////////////////////
  //HELPER FUNCTIONS//
  ////////////////////////////////////////////////////////
  searchFilterFunc = input => {
    console.log('\nfilter...');
    //this.setState({ searchVal: input, userPan: false });

    newLst = this.props.clinicLst.filter(clinic => {
      clinicName = clinic.name.toUpperCase();
      clinicMods = clinic.srvcs.toString();
      clinicMods = clinicMods.toUpperCase();
      clinicAddr = clinic.addr.toUpperCase();

      clinicData = clinicName + clinicMods + clinicAddr;
      searchData = input.toUpperCase();

      return clinicData.indexOf(searchData) > -1
    });

    console.log('after filter... about to update...');
    this.setState({filteredLst: newLst, searchVal: input, foundClinicInRegion: true});
  };//end searchFilterFunc

  clinicInRegion(clinic, region){
    lat = clinic.coords.latitude;
    lng = clinic.coords.longitude;

    //scaling factors used... actually tests if clinic is within the box centered on same spot,
    //but whose length and width are 70% of actual map region
    latInReg = ((lat < region.latitude+(.35*region.latitudeDelta))&&(lat > region.latitude-(.35*region.latitudeDelta)));
    lngInReg = ((lng < region.longitude+(.35*region.longitudeDelta))&&(lng > region.longitude-(.35*region.longitudeDelta)));

    if(latInReg && lngInReg)
      return true;
    else
      return false;
  }

  determineNeedButton(region){
    /*
    this.state.currlatitude = region.latitude;
    this.state.currlongitude = region.longitude;
    this.state.currlatitudeDelta = region.latitudeDelta;
    this.state.currlongitudeDelta = region.longitudeDelta;
    */
    //update buttonSearchLoc
    this.state.buttonSearchLoc = {lat: region.latitude, lng: region.longitude}

    //if a clinic in filteredLst is in the curr region, set to true
    this.state.foundClinicInRegion = (this.state.filteredLst.findIndex((clinic) => {return this.clinicInRegion(clinic, region)}) !== -1);

    console.log('discreteVal: '+this.discreteFadeVal);
    console.log('foundClinicInRegion: '+this.state.foundClinicInRegion);

    if(this.state.foundClinicInRegion){
      if(this.discreteFadeVal == 1) this.fadeOut();
    }
    else if(this.discreteFadeVal == 0) this.fadeIn();
  }

  async searchNewArea(loc){//loc should be in form acceptable for geocoding... current implementation is {lat: [double], lng: [double]}
    this.props.getClinics(loc);

    this.state.mapCam = await this.mapRef.getCamera();
    this.setState({refreshing: true});
  }
  ////////////////////////////////////////////////////////
  //END HELPER FUNCTIONS//
  ////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  ///////////FUNC CALLED WHEN ABOUT TO RENDER/////////////
  ////////////////////////////////////////////////////////
  static getDerivedStateFromProps(nextProps, prevState) {
    //if received new clinic lst... update filteredLst
    if ((prevState.refreshing) && (prevState.filteredLst != nextProps.clinicLst)) {
      return { ...prevState, refreshing: false, filteredLst: nextProps.clinicLst, foundClinicInRegion: true};
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.props.clinicLst.length) && (this.state.searchVal != '') && (this.state.searchVal))
      this.searchBar.focus();
  }
  ////////////////////////////////////////////////////////
  ///////////////END FUNC CALLED AFTER RENDER/////////////
  ////////////////////////////////////////////////////////

  //////RENDER//////
  render() {
    if (!this.props.clinicLst.length) {//if clinicLst empty
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Please wait while we find clinics near you...</Text>
          <ActivityIndicator size='large' />
        </View>
      )
    }//end if clinicLst empty

    //////////////////////////////
    //MAKE MAP LISTS//
    //////////////////////////////
    //if no filteredLst... make it
    if (!this.state.filteredLst) {
      this.state.filteredLst = this.props.clinicLst;
    }
    //generate markerLst
    this.markerLst = this.state.filteredLst.map(marker => {
      return (
        <Marker
          onCalloutPress={createOpenLink({ query: (marker.addr) })}//end onCalloutPress
          coordinate={marker.coords}
          title={marker.name}
          identifier={marker.name}
          key={(marker.id).toString(10)}
        />
      )
    })//end generate markerLst
    //////////////////////////////
    //END MAKE MAP LISTS//
    //////////////////////////////

    //if clinicLst NOT empty
    return (
      <FlatList
        onRefresh={() => {
          this.setState({ refreshing: true, foundClinicInRegion: true },
            () => {
              this.props.getClinics();
              //this.state.refreshing = false;
            });
        }}//end on refresh
        refreshing={this.state.refreshing}
        removeClippedSubviews={true}
        ListHeaderComponent={() => {
          screenWidth = Dimensions.get('window').width;
          return (
            <View style={{ height: 350, width: screenWidth }} pointerEvents={"box-none"}>
              <MapView
                style={{flex: 1, marginBottom: this.state.mapMargin}}
                onLayout={() => {if((!this.state.foundClinicInRegion)) this.mapRef.setCamera(this.state.mapCam, 0);}}
                onMapReady={() => {
                  if((this.state.foundClinicInRegion)||(this.state.searchVal != '')){
                    console.log('fitting to markers...');
                    markerIDLst = this.state.filteredLst.map(loc => (loc.name));
                    this.mapRef.fitToSuppliedMarkers(markerIDLst,
                    {
                      edgePadding: {
                        bottom: 25, right: 25, top: 250, left: 25,
                      },
                      animated: false
                    });//end fitToSuppliedMarkers()
                  }
                }}//end onMapReady
                //initialRegion={(!this.state.userPan) ? null : {latitude: this.state.currlatitude+.018, longitude: this.state.currlongitude, latitudeDelta: this.state.currlatitudeDelta+.018, longitudeDelta: this.state.currlongitudeDelta}}
                onRegionChange={region => this.determineNeedButton(region)}
                ref={ref => { this.mapRef = ref; }}
                moveOnMarkerPress={false}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={true}
                loadingEnabled={true}
                style={{ ...StyleSheet.absoluteFillObject }}
              >
                {this.markerLst}
              </MapView>
              <SearchBar
                ref={searchRef => { this.searchBar = searchRef; }}
                placeholder="Type to filter list. Pull to use GPS"
                lightTheme
                round
                onChangeText={input => {
                  this.searchFilterFunc(input)
                }}//end onChangeText
                autoCorrect={false}
                value={this.state.searchVal}
              />
              <Animated.View
                style={{alignSelf: "center", marginTop: "1%",
                        flexDirection: "row", justifyContent: "center", alignItems: "center",
                        opacity: this.state.fadeVal}}
              >
                <AwesomeButton
                  raiseLevel={2}
                  height={25}
                  type = "secondary"
                  onPress={() => {/*do nothing if button invisible*/if(this.discreteFadeVal) this.searchNewArea(this.state.buttonSearchLoc);}}
                  disables={false}
                >
                  <Text> Search This Area </Text>
                </AwesomeButton>
              </Animated.View>
            </View>
          )//end return
        }}//end header

        data={this.state.filteredLst}
        extraData={this.props}
        renderItem={({ item }) => {
          return (
            <View style={[styles.rowStyle, { backgroundColor: this.props.themeProp.backgroundColor, borderColor: this.props.themeProp.borderColor }]}>
              <View style={styles.listStyle}>
                <Text style={[styles.nameStyle, { color: this.props.themeProp.textColor }]}>{item.name}</Text>
                <Text style={[styles.modalityStyle, { color: this.props.themeProp.textColor }]}>Modalities: {item.srvcs.toString()}</Text>
                <Text style={[styles.addrStyle, { color: this.props.themeProp.accentColor }]}>{item.addr}</Text>
              </View>
              <View style={styles.buttonStyle}>
                <IconButton
                  icon={"explore"}
                  size={30}
                  color={this.props.themeProp.textColor}
                  onPress={createOpenLink({ query: (item.addr) })}
                />
              </View>
            </View>
          )//end return
        }}//end renderItem
        keyExtractor={(item, index) => (item.id).toString(10)}
      />
    );
  }//end render

}//end class ScrollViewTEST

const styles = StyleSheet.create({
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
  },

  listStyle: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 20,
    width: 300
  },

  buttonStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    width: 100,
    height: 100
  },

  nameStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#ffffff'
  },

  modalityStyle: {
    borderStyle: 'dashed',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5
  },

  addrStyle: {
  }
})//end styles

///////////////////////////////////////////////////////
//REDUX//
///////////////////////////////////////////////////////

//allow these global props to affect this component
function mapStateToProps(state) {
  return {
    fontProp: state.fontProps,
    themeProp: state.themeProps,
    clinicLst: state.clinicDataProps.clinicLst
  };
}

//allow this component to request clinic data
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getClinics: getClinics }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(clinicFinder);