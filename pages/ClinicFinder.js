import React, { Component } from 'react';
import { Dimensions, Alert, Text, StyleSheet, FlatList, View} from 'react-native';
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
  ////////////////////////////////////////////////////////
  //END FUNCTIONS//
  ////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  /////////////////COMPONENT DID MOUNT////////////////////
  /////////////////////////////////////////////////////////
  async componentDidMount(){
    //check if authorized
    await Permissions.check('location').then(response =>{
      //console.log({response});
      this.setState({perms: response});

      console.log(this.state);
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
              console.log('clinicLst222222222222222222222222222: ');
              console.log(this.clinicLst);
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
            console.log('clinicLst222222222222222222222222222: ');
            console.log(this.clinicLst);
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
      console.log(this.state);

      //if still not authed... go to default location
      if(response != 'authorized'){
        this.location = {lat: 32.780907, lng: -96.797766};//set location to Dallas
        
        await this.doPhoneGeoCode().then(async (response) => {
          console.log('doPhoneGeoCode response: '+ {response});
          await getFinderData(response, this.clinicLst).then((lst)=>{
            this.clinicLst = lst;
            console.log('clinicLst222222222222222222222222222: ');
            console.log(this.clinicLst);
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

  //////RENDER//////
  render(){
    if(this.state.reload){
      AndroidOpenSettings.appDetailsSettings();
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 30}}>Please restart clinicFinder for permission cahnges to take affect...</Text>
        </View>
      )
    }
    if(!this.state.ready){
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Please wait while we find clinics near you...</Text>
        </View>
      )
    }

    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$here$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    console.log('render clinicLst: '+ this.clinicLst);
    return(
      <FlatList
        //removeClippedSubviews={false}
        ListHeaderComponent = {()=>{
          screenWidth = Dimensions.get('window').width;
          return(
            <View style = {{height: 300, width: screenWidth}}>
            <MapView
              style = {{...StyleSheet.absoluteFillObject}}
              loadingEnabled={true}
              initialRegion={{
                latitude: this.location.lat,
                longitude: this.location.lng,
                latitudeDelta: 5,
                longitudeDelta: 5,
              }}
            >
              {this.clinicLst.map(marker => (
                <Marker
                  coordinate={marker.coords}
                  title={marker.name}
                  identifier = {marker.name}
                  //description={marker.description}
                />
              ))}
            </MapView>
            </View>
        )}
        }//end header
        
        data = {this.clinicLst}
        extraData={this.props}
        renderItem={({item})=>{
          console.log({item});
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
        keyExtractor={(item, index) => item.name}
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

/*async function doAddrGeoCode(addr) {
  console.log('geoCoding...');
  console.log('addr: '+addr);
  try{
    const res = await Geocoder.geocodeAddress(addr);
    rtnCoords = {
      latitude: res[0].position.lat,
      longitude: res[0].position.lng
    }

    return(rtnCoords);
  }//end try
  catch(err){
    console.log('ERROR:' , err);
    return(err);
  };
}//end doAddrGeoCode
*/

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
  console.log(clinicLst);

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

        console.log({tmpAddr});
        console.log({tmpName});
        console.log({tmpSrvcLst});

        var newClinicOBJ = {'name': tmpName,
                            'addr': tmpAddr,
                            'srvcs': tmpSrvcLst,
                            'id': (numClinics + 1)};
        console.log({newClinicOBJ});

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
        console.log('here2')
      }//end if valid name
      console.log('sucks to suck');
      console.log('')
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
  console.log({clinicLst});

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