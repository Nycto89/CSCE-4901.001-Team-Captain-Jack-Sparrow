import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';
import { SearchBar } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { createOpenLink } from 'react-native-open-maps';
import { IconButton } from 'react-native-paper';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getClinics } from '../actions/index';

class clinicFinder extends Component {
  state = { ready: false, refreshing: false };
  location = {};
  clinicLst = [];
  markerLst = [];
  mapRef = null;
  searchBar = null;
  text = '';
  timeout;

  ////////////////////////////////////////////////////////
  //FUNCTIONS//
  ////////////////////////////////////////////////////////
  searchFilterFunc = input => {
    this.setState({ searchVal: input });

    newLst = this.props.clinicLst.filter(clinic => {
      clinicName = clinic.name.toUpperCase();
      clinicMods = clinic.srvcs.toString();
      clinicMods = clinicMods.toUpperCase();
      clinicAddr = clinic.addr.toUpperCase();

      clinicData = clinicName + clinicMods + clinicAddr;
      searchData = input.toUpperCase();

      return clinicData.indexOf(searchData) > -1
    });

    this.setState({ filteredLst: newLst });
  };//end searchFilterFunc
  ////////////////////////////////////////////////////////
  //END FUNCTIONS//
  ////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  /////////////////COMPONENT DID UPDATE///////////////////
  ////////////////////////////////////////////////////////
  static getDerivedStateFromProps(nextProps, prevState) {
    //if received new clinic lst... update filteredLst
    if ((prevState.refreshing) && (prevState.filteredLst != nextProps.clinicLst)) {
      return { ...prevState, refreshing: false, filteredLst: nextProps.clinicLst };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.props.clinicLst.length) && (this.state.searchVal != '') && (this.state.searchVal))
      this.searchBar.focus();
  }
  ////////////////////////////////////////////////////////
  /////////////////end componentDidUpdate()///////////////
  ////////////////////////////////////////////////////////

  //////RENDER//////
  render() {
    if (this.state.reload) {
      if (Platform.OS == 'android') AndroidOpenSettings.appDetailsSettings();
      else if (Platform.OS == 'ios') {
        if (Permissions.canOpenSettings()) {
          Permissions.openSettings();
        }
        else {
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 30 }}>Please open settings on your phone, and allow this app to acces your location... Then reload clinicFinder</Text>
            </View>
          )
        }//end else can't open settings
      }//ense else if iOS
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 30 }}>Please restart clinicFinder for permission changes to take affect...</Text>
        </View>
      )
    }
    if (!this.props.clinicLst.length) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Please wait while we find clinics near you...</Text>
          <ActivityIndicator size='large' />
        </View>
      )
    }


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
        //description={marker.description}
        />
      )
    })//end generate markerLst
    return (
      <FlatList
        onRefresh={() => {
          this.setState({ refreshing: true },
            () => {
              this.props.getClinics();
              //this.state.refreshing = false;
            });
        }}
        refreshing={this.state.refreshing}
        removeClippedSubviews={true}
        ListHeaderComponent={() => {
          screenWidth = Dimensions.get('window').width;
          return (
            <View style={{ height: 350, width: screenWidth }}>
              <MapView
                onMapReady={() => {
                  markerIDLst = this.state.filteredLst.map(loc => (loc.name));
                  this.mapRef.fitToSuppliedMarkers(markerIDLst,
                    {
                      edgePadding: {
                        bottom: 25, right: 25, top: 250, left: 25,
                      },
                      animated: false
                    });//end fitToSuppliedMarkers()
                }}//end onMapReady
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
                placeholder="Type to filter list. Pull down to reload"
                lightTheme
                round
                onChangeText={input => {
                  this.searchFilterFunc(input)
                  //this.searchBar.focus();
                }}//end onChangeText
                autoCorrect={false}
                value={this.state.searchVal}
              />
            </View>
          )
        }
        }//end header

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