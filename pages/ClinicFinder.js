import React, { Component } from 'react';
import { Platform, Dimensions, Alert, ActivityIndicator, Text, StyleSheet, FlatList, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Permissions from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings'
import {createOpenLink} from 'react-native-open-maps';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import {IconButton, Colors} from 'react-native-paper';
import {connect} from 'react-redux';
import cheerio from 'cheerio-without-node-native';

class clinicFinder extends Component{
  state = {ready: false};
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
  _requestPermission = async () => new Promise((resolve, reject) => {
    console.log('making request...');
    console.log(this.location);
    Permissions.request('location',
    ).then(async (response) => {
      console.log('got response');
      if(response === 'authorized'){
        console.log('access authorized...');
        this.state.perms = 'authorized';

        resolve('authorized');
      }//end if
      else{
        console.log('access denied...');
        resolve('denied');
      }
    })//end then()
  });//end request permissions promise

  _alertForPerms = async () => new Promise((resolve, reject) => {
    if(Platform.OS == 'android'){
      console.log('in alert...');
      Alert.alert(
      'Can we have access to your location?',
      'We need access to give you relevant clinic locations',
      [
        {
          text: 'Cancel',
          onPress: () => {console.log('Cancel pressed...'); resolve('cancel');},
          style: 'cancel'
        },
        ((this.state.perms == ('undetermined'))|| (this.state.perms == ('denied')))
          ? { text: 'OK', onPress: ()=>{resolve('OK');} }
          : { text: 'Open Settings', onPress: ()=>{resolve('settings');} }
      ],
      {cancelable: false}
      );//end alert
    }//end if android
    else if(Platform.OS == 'ios'){
      if(this.state.perms != 'restricted'){
        console.log('in alert...');
        Alert.alert(
        'Can we have access to your location?',
        'We need access to give you relevant clinic locations',
        [
          {
            text: 'Cancel',
            onPress: () => {console.log('Cancel pressed...'); resolve('cancel');},
            style: 'cancel'
          },
          (this.state.perms == ('undetermined'))
            ? { text: 'OK', onPress: ()=>{resolve('OK');} }
            : { text: 'Open Settings', onPress: ()=>{resolve('settings');} }
        ],
        {cancelable: false}
        );
      }//end if perms != 'restricted'
      else{//else iOS restricted
        Alert.alert(
          'The Location Permission has been disabled on your device',
          'The app will default to the Dallas Area...',
          [
            {
              text: 'Cancel',
              onPress: () => {console.log('Cancel pressed...'); resolve('cancel');},
              style: 'cancel'
            }
          ]
        );
      }//end else iOS restricted
    }//end else if iOS
  });//end alertForPerms promise

  getCoords = async () => new Promise(async (resolve, reject) => {
    console.log('getting Coords...');
    await Geolocation.getCurrentPosition(
      (position) => {
        console.log({position});
        this.location = {lat: position.coords.latitude,
                    lng: position.coords.longitude};
        console.log(this.location);
        resolve(this.location);
      },
      (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
          reject(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );//end Geolocation
  });//end getCoords promise
  
  doPhoneGeoCode = async () => new Promise(async (resolve, reject) =>{
    console.log('geoCoding...');
    console.log('this.location: ');
    console.log('lat: '+this.location.lat);
    console.log('lng: '+this.location.lng);
    try{
      const res = await Geocoder.geocodePosition(this.location);
      this.location = {
        lat: this.location.lat,
        lng: this.location.lng,
        city: res[0].locality,
        state: res[0].adminArea,
        zipCode: res[0].postalCode
      };
      console.log('location: ' + this.location);
      console.log('lat: '+this.location.lat);
      console.log('lng: '+this.location.lng);
      console.log('city: ' + this.location.city);
      console.log('state: ' + this.location.state);
      console.log('zipCode: ' + this.location.zipCode);
  
      resolve(this.location);
    }//end try
    catch(err){
      console.log('ERROR:' , err);
      reject(err);
    };
  
  });//end doPhoneGeoCode promise

  searchFilterFunc = input => {
    console.log('in filter func...');
    console.log({input});
    this.setState({searchVal: input});

    newLst = this.clinicLst.filter(clinic => {
      clinicName = clinic.name.toUpperCase();
      clinicMods = clinic.srvcs.toString();
      clinicMods = clinicMods.toUpperCase();

      //console.log({clinicName});
      //console.log({clinicMods});
      
      clinicData = clinicName+clinicMods;
      searchData = input.toUpperCase();

      //console.log({clinicData});
      //console.log({searchData});

      return clinicData.indexOf(searchData) > -1
    });

    this.setState({filteredLst: newLst});
  };//end searchFilterFunc
  ////////////////////////////////////////////////////////
  //END FUNCTIONS//
  ////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  /////////////////COMPONENT DID MOUNT////////////////////
  /////////////////////////////////////////////////////////
  async componentDidMount(){
    console.log('here2...');
    //check if authorized
    await Permissions.check('location').then(response =>{
      //console.log({response});
      this.setState({perms: response});

      //console.log(this.state);
    })

    //if not already authorized, tell why you want auth
    if(this.state.perms != 'authorized') await this._alertForPerms().then(async (response) => {
      console.log({response});
      
      //if not cancel... formal request for perms
      if(response == 'OK') await this._requestPermission().then(async (perms) =>{
        console.log('after request...');

        //if now authorized
        if(perms == 'authorized'){
         await this.getCoords().then(async () => {
          await this.doPhoneGeoCode().then(async (response) => {
            console.log('doPhoneGeoCode response: '+ response);
            await getFinderData(response, this.clinicLst).then((lst)=>{
              this.clinicLst = lst;
              this.state.filteredLst = lst;
              this.markerLst = lst.map(marker => {
                console.log('creating markers.................................');
                console.log({marker});
                return(
                <Marker
                  onCalloutPress={createOpenLink({query:(marker.addr)})}//end onCalloutPress
                  coordinate={marker.coords}
                  title={marker.name}
                  identifier = {marker.name}
                  key = {(marker.id).toString(10)}
                  //description={marker.description}
                />
              )})//end lst.map()
              console.log('this.markerLst.length...');
              console.log(this.markerLst.length);

              console.log('setState({ready: true})');
              this.setState({ready: true});
            });//end getFinderData.then()
          });//end doPhoneGeoCode.then()
        })//end getCoords.then()
        .catch(error => {console.log("ERROR: " + error)});
        }//end if authed
      });//end requestPermission.then()
      else if(response == 'settings'){//else user wants to open settings...        
        this.setState({reload: true});
      }//end else if 'settings'
    });//end ifPerms NOT ALREADY authorized --> alertForPerms.then()
    else{//already authorized
      await this.getCoords().then(async () => {
        await this.doPhoneGeoCode().then(async (response) => {
          console.log('doPhoneGeoCode response: '+ {response});
          await getFinderData(response, this.clinicLst).then((lst)=>{
            this.clinicLst = lst;
            this.state.filteredLst = lst;
            this.markerLst = lst.map(marker => {
              console.log('creating markers.................................');
              console.log({marker});
              return(
              <Marker
                onCalloutPress={createOpenLink({query:(marker.addr)})}//end onCalloutPress
                coordinate={marker.coords}
                title={marker.name}
                identifier = {marker.name}
                key = {(marker.id).toString(10)}
                //description={marker.description}
              />
            )})//end lst.map()
            console.log('this.markerLst.length...');
            console.log(this.markerLst.length);

            console.log('setState({ready: true})');
            this.setState({ready: true});
          });//end getFinderData.then()
        });//end doPhoneGeoCode.then()
      })//end getCoords.then()
      .catch(error => {console.log("ERROR: " + error)});
    }//end already authorized

    //check perms again... if authed, we already did stuff... if not go to default loc
    await Permissions.check('location').then(async (response) =>{
      this.state.perms = response;
      //console.log(this.state);

      //if still not authed... go to default location
      if(response != 'authorized'){
        this.location = {lat: 32.780907, lng: -96.797766};//set location to Dallas
        
        await this.doPhoneGeoCode().then(async (response) => {
          console.log('doPhoneGeoCode response: '+ {response});
          await getFinderData(response, this.clinicLst).then((lst)=>{
            this.clinicLst = lst;
            this.state.filteredLst = lst;
            this.markerLst = lst.map(marker => {
              console.log('creating markers.................................');
              console.log({marker});
              return(
              <Marker
                onCalloutPress={createOpenLink({query:(marker.addr)})}//end onCalloutPress
                coordinate={marker.coords}
                title={marker.name}
                identifier = {marker.name}
                key = {(marker.id).toString(10)}
                //description={marker.description}
              />
            )})//end lst.map()
            console.log('this.markerLst.length...');
            console.log(this.markerLst.length);

            console.log('setState({ready: true})');
            this.setState({ready: true});
          });//end getFinderData.then()
        });//end doPhoneGeoCode.then()
      }//end if still not authorized
    })//end permission check.then()

    console.log('after alert');
  }
  ////////////////////////////////////////////////////////
  /////////////////end componentDidMount()////////////////
  ////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  /////////////////COMPONENT DID UPDATE///////////////////
  ////////////////////////////////////////////////////////
  componentDidUpdate(){
    if((this.clinicLst.length)&&(this.state.searchVal != '')&&(this.state.searchVal))
    this.searchBar.focus();
  }
  ////////////////////////////////////////////////////////
  /////////////////end componentDidUpdate()///////////////
  ////////////////////////////////////////////////////////

  //////RENDER//////
  render(){
    console.log('in render...............................................');
    if(this.state.reload){
      if(Platform.OS == 'android') AndroidOpenSettings.appDetailsSettings();
      else if(Platform.OS == 'ios'){
        if(Permissions.canOpenSettings()){
          Permissions.openSettings();
        }
        else{
          return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 30}}>Please open settings on your phone, and allow this app to acces your location... Then reload clinicFinder</Text>
            </View>
          )
        }//end else can't open settings
      }//ense else if iOS
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 30}}>Please restart clinicFinder for permission changes to take affect...</Text>
        </View>
      )
    }
    if(!this.state.ready){
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Please wait while we find clinics near you...</Text>
          <ActivityIndicator size='large'/>
        </View>
      )
    }

    return(
      <FlatList
        removeClippedSubviews={true}
        ListHeaderComponent = {()=>{
          screenWidth = Dimensions.get('window').width;
          return(
            <View style = {{height: 350, width: screenWidth}}>
            <MapView
              onMapReady = {()=>{
                markerIDLst = this.clinicLst.map(loc => (loc.name));
                this.mapRef.fitToSuppliedMarkers(markerIDLst,  
                  {edgePadding: {
                  bottom: 25, right: 25, top: 250, left: 25,
                  },
                  animated: false
                });//end fitToSuppliedMarkers()
              }}//end onMapReady
              ref={ref => {this.mapRef = ref;}}
              moveOnMarkerPress={false}
              style = {{...StyleSheet.absoluteFillObject}}
              loadingEnabled={true}
              provider={MapView.PROVIDER_GOOGLE}
            >
            {[
              <Marker
                onCalloutPress={createOpenLink({query:('4309 Mesa Drive, Denton, TX 76207')})}//end onCalloutPress
                coordinate={{ latitude: 33.2349017, longitude: -97.17822629999999 }}
                title={'DaVita Renal Center Of North Denton'}
                identifier = {'DaVita Renal Center Of North Denton'}
                key = {'1'}
                //description={marker.description}
              />,
              <Marker
                onCalloutPress={createOpenLink({query:('3118 Los Colinas, Denton, TX 76207')})}//end onCalloutPress
                coordinate={{ latitude: 33.233335000000004, longitude: -97.1766268 }}
                title={'Accesscare Of North Texas Dialysis Center'}
                identifier = {'Accesscare Of North Texas Dialysis Center'}
                key = {'2'}
                //description={marker.description}
              />,
              <Marker
                onCalloutPress={createOpenLink({query:('3305 Unicorn Lake Blvd, Denton, TX 76210')})}//end onCalloutPress
                coordinate={{ latitude: 33.173286499999996, longitude: -97.0958198 }}
                title={'Physicians Dialysis Denton'}
                identifier = {'Physicians Dialysis Denton'}
                key = {'3'}
                //description={marker.description}
              />,
              <Marker
                onCalloutPress={createOpenLink({query:('3400 Corinth Pkwy., Corinth, TX 76208')})}//end onCalloutPress
                coordinate={{ latitude: 33.152678, longitude: -97.05644530000001 }}
                title={'Liberty Dialysis- Lake Lewisville/corinth'}
                identifier = {'Liberty Dialysis- Lake Lewisville/corinth'}
                key = {'4'}
                //description={marker.description}
              />,
              <Marker
                onCalloutPress={createOpenLink({query:('2700 Village Pkwy, Highland Village, TX 75077')})}//end onCalloutPress
                coordinate={{ latitude: 33.0782992, longitude: -97.0790016 }}
                title={'DaVita Highland Village Dialysis'}
                identifier = {'DaVita Highland Village Dialysis'}
                key = {'5'}
                //description={marker.description}
              />,
              <Marker
                onCalloutPress={createOpenLink({query:('101 E Southwest Pkwy #110, Lewisville, TX 75067')})}//end onCalloutPress
                coordinate={{ latitude: 33.02013, longitude: -96.9916851 }}
                title={'Liberty Dialysis South Lewisville'}
                identifier = {'Liberty Dialysis South Lewisville'}
                key = {'6'}
                //description={marker.description}
              />,
              <Marker
                onCalloutPress={createOpenLink({query:('4941 Long Prairie Rd, Flower Mound, TX 75028')})}//end onCalloutPress
                coordinate={{ latitude: 33.0520023, longitude: -97.0751815 }}
                title={'DaVita Renal Center Of Flower Mound'}
                identifier = {'DaVita Renal Center Of Flower Mound'}
                key = {'7'}
                //description={marker.description}
              />,
              <Marker
                onCalloutPress={createOpenLink({query:('785 Cross Timbers Road Suite 145, Flower Mound, TX 75028')})}//end onCalloutPress
                coordinate={{ latitude: 33.0415091, longitude: -97.039115 }}
                title={'US Renal Care Flower Mound'}
                identifier = {'US Renal Care Flower Mound'}
                key = {'8'}
                //description={marker.description}
              />,
              <Marker
                onCalloutPress={createOpenLink({query:('1600 Waters Ridge Dr Ste B, Lewisville, TX 75057')})}//end onCalloutPress
                coordinate={{ latitude: 33.0232375, longitude: -96.97560299999999 }}
                title={'DaVita Renal Center Of Lewisville'}
                identifier = {'DaVita Renal Center Of Lewisville'}
                key = {'9'}
                //description={marker.description}
              />,
              <Marker
                onCalloutPress={createOpenLink({query:('10850 Frisco St Ste 300, Frisco, TX 75033')})}//end onCalloutPress
                coordinate={{ latitude: 33.1680707, longitude: -96.83283879999999 }}
                title={'DaVita Renal Center Of Frisco'}
                identifier = {'DaVita Renal Center Of Frisco'}
                key = {'10'}
                //description={marker.description}
              />
            ]}
            </MapView>
            <SearchBar
              ref={searchRef => {this.searchBar = searchRef;}}
              placeholder="Type Here..."        
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
        )}
        }//end header
        
        data = {this.state.filteredLst}
        extraData={this.props}
        renderItem={({item})=>{
          //console.log({item});
          return(
            <View style={[styles.rowStyle, {backgroundColor: this.props.themeProp.backgroundColor, borderColor: this.props.themeProp.borderColor}]}>
              <View style={styles.listStyle}>
                <Text style={[styles.nameStyle, {color: this.props.themeProp.textColor}]}>{item.name}</Text>
                <Text style={[styles.modalityStyle, {color: this.props.themeProp.textColor}]}>Modalities: {item.srvcs.toString()}</Text>
                <Text style={[styles.addrStyle, {color: this.props.themeProp.accentColor}]}>{item.addr}</Text>
              </View>
              <View style={styles.buttonStyle}>
                <IconButton
                  icon={"explore"}
                  size={30}
                  color={this.props.themeProp.textColor}
                  onPress={createOpenLink({query:(item.addr)})}
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
  rowStyle:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  
  listStyle:{
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

  buttonStyle:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    width: 100,
    height: 100
  },
  
  nameStyle:{
    fontWeight: 'bold',
    fontSize: 15,
    color: '#ffffff'
  },

  modalityStyle:{
    borderStyle: 'dashed',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5
  },

  addrStyle:{
  }
})//end styles

////////////////////////////////////////////////////////////
//FUNCTIONS//
////////////////////////////////////////////////////////////
doAddrGeoCode = async (addr, i) => new Promise(async (resolve, reject) =>{
  console.log('geoCoding...');
  console.log('addr: '+addr);
  try{
    const res = await Geocoder.geocodeAddress(addr);
    rtnCoords = [{
      latitude: res[0].position.lat,
      longitude: res[0].position.lng
    }, i]

    resolve(rtnCoords);
  }//end try
  catch(err){
    console.log('ERROR:' , err);
    reject(err);
  };
});//end doAddrGeoCode promise

async function getFinderData(location, clinicLst){
  //clear the list... maybe change this later to allow to skip getting clinic data if list already populated
  clinicLst = [];
  //console.log(clinicLst);

  ////GET NUM PAGES////
  url = 'https://www.dialysisfinder.com/dialysis-centers/'+location.city+'/'+location.state+'/'+location.zipCode;
  console.log('getting clinicFinder data from website... ' + url);
  const htmlStr = await fetch(url)//request HTML page
  .then(
    response => (response.text())
  )
  .catch(
    error => {console.log('ERROR WITH FETCH: ' + error.message);}
  )
  console.log('html string received...');

  //parse HTML response into a string
  $ = cheerio.load(htmlStr);
  pageCheerioObj = $('div.pagination').last().children();//select 'ul' within last div.pagination element
  pageCheerioObj = $('a', pageCheerioObj);//select all 'a' elements within that 'ul'
  const numPages = pageCheerioObj.length - 1;
  console.log({numPages});
  ////FINISH GET NUM PAGES////

  ////GET CLINIC DATA////
  var pageNum = 1;//current page
  var numClinics = 0;//num clinics added to list
  do{
    newClinicCIO = $('ul:first-of-type', 'div.all-dva-center-mobile');//select first 'ul' from each locatin div
    newClinicCIO.each(async (i, elem)=>{//for each location 'ul', extract info & add to clinicList
      //console.log({elem});
      console.log('begin .each()');

      tmpName = $('*', 'li:first-of-type > a:first-of-type', elem).text();//select name text
      if(tmpName != ''){
        tmpAddr = $('li:first-of-type > p:first-of-type', elem).text();//select address text
        tmpSrvcLst = [];
        newSrvcCIO = $('ul', '*.all-serv-bar ~ div');//select lists on services from service divs
        const numPerPage = $(newSrvcCIO).length;
        newSrvcCIO = newSrvcCIO.eq(numClinics%numPerPage);
        newSrvcCIO = $('li', newSrvcCIO);
        newSrvcCIO.each((j, elem)=>{
          tmpSrvcLst.push($(elem).text());
        })

        //console.log({tmpAddr});
        //console.log({tmpName});
        //console.log({tmpSrvcLst});

        var newClinicOBJ = {'name': tmpName,
                            'addr': tmpAddr,
                            'srvcs': tmpSrvcLst,
                            'id': (numClinics + 1)};
        //console.log({newClinicOBJ});

        clinicLst.push(newClinicOBJ);
        //get location coords
        tmpLatLng = {};
        await doAddrGeoCode(tmpAddr, numClinics++).then((res) => {

          tmpLatLng = res[0];

          clinicLst[res[1]].coords = tmpLatLng;

        })
        .catch(err => {
          console.log(err);
        });//end doAddrGeoCode.catch()
        //console.log('here2')
      }//end if valid name
      //console.log('sucks to suck');
      //console.log('')
    });//select child of first 'a' within that 'ul' end .each()
    
    //finished getting clinics on this page, get next page
    var n = url.lastIndexOf("page");
    if(n == -1){
      url += "/page/" + (++pageNum);
    }
    else{
      url = url.replace(/page.*/, "page/");
      url += (++pageNum);
    }

    console.log('getting clinicFinder data from website... ' + url);
    const htmlStr = await fetch(url)//request HTML page
    .then(
      response => (response.text())
    )
    .catch(
      error => {console.log('ERROR WITH FETCH: ' + error.message);}
    )
    console.log('html string received...');

    //parse HTML response into a string
    $ = cheerio.load(htmlStr);
  }while(pageNum <= numPages);

  console.log("Finished all pages");
  //console.log({clinicLst});

  return clinicLst;
}//end getFinderData
/////////////////////////////////////////////////////////////
//END FUNCTIONS//
/////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////
//REDUX//
///////////////////////////////////////////////////////

//allow these global props to affect this component
function mapStateToProps(state) {
  return {
  fontProp: state.fontProps,
  themeProp: state.themeProps
  };
}

export default connect(mapStateToProps)(clinicFinder);