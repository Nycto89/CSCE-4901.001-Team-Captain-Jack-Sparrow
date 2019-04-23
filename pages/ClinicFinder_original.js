import React, { Component } from 'react';
import { Alert, Text, Button, StyleSheet, ScrollView, View} from 'react-native';
import Permissions from 'react-native-permissions';
import {createOpenLink} from 'react-native-open-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import {IconButton, Colors} from 'react-native-paper';
import {clinicLst} from '../clinicData/clinicLookupData';
import {connect} from 'react-redux';
import cheerio from 'cheerio-without-node-native';

class ScrollViewTEST extends Component{
  state = {ready: false};
  location = {};

  makeList=(item)=>(
    <View key={item.id} style={[styles.rowStyle, {backgroundColor: this.props.themeProp.backgroundColor, borderColor: this.props.themeProp.textColor}]}>
      <View style={styles.listStyle}>
        <Text style={[styles.nameStyle, {color: this.props.themeProp.textColor}]}>{item.name}</Text>
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
  );//end makeList

  _requestPermission = async () => {
    console.log('making request...');
    await Permissions.request('location',
      { rationale:{
        title: 'clinic Finder Location Permission',
        message: 'The clinic finder needs to access your location to find clinics near you!',
        }
      }
    ).then(async (response) => {
      console.log('got response');
      if(response === 'authorized'){
        await Geolocation.getCurrentPosition(
          (position) => {
            console.log({position});
            this.location = {lat: position.coords.latitude,
                        lng: position.coords.longitude};
            console.log(this.location);
          },
          (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );//end Geolocation
      }//end if
      else{
        console.log('access denied...');
      }
    })//end then()

    console.log('here');
  }//end request permissions

  _alertForPerms = async () => {
    console.log('in Alert...');
    console.log(this.state);
    new Promise((resolve, reject) => {
      Alert.alert(
        'Can we have access to your location?',
        'We need access to give you relevant clinic locations',
        [
          {
            text: 'Cancel',
            onPress: () => {console.log('Cancel pressed...'); resolve('cancel');},
            style: 'cancel'
          },
          this.state.perms != 'restricted'
            ? { text: 'OK', onPress: async ()=>{await this._requestPermission; resolve('OK');} }
            : { text: 'Open Settings', onPress: ()=>{console.log('access restricted... at "open settings button'); resolve('Open Settings');} }
        ],
        {cancelable: false}
      );//end alert
    });//end promise
  }//edn _alertForPerms

  async componentDidMount(){
    await Permissions.check('location').then(response =>{
      console.log({response});
      this.setState({perms: response});

      console.log(this.state);
    })

    await this._alertForPerms().then((blah)=>{
      try{
        console.log({blah});
        console.log('location: ' + this.location);
        const res = Geocoder.geocodePosition(this.location);
        console.log('here3');
        console.log({res});
      }
      catch(err){ console.log('ERROR:' , err)};
    })
    .catch(err => {console.log('ERROR:', err)});

    /*
    console.log('here');
    console.log(this.NY);
    try{
      const res = await Geocoder.geocodePosition(this.location);
      console.log({res});
    }
    catch(err){ console.log('ERROR:' , err)};
    */
    console.log('here2');

    /*getFinderData(url).then(
      ()=>{this.setState({ready: true});}
    );*/
  }//end componentDidMount()

  render(){
    if(!this.state.ready){
      return(
        <Text>Fetching Clinic Data... please wait!</Text>
      )
    }
    return(
      <View>
        <ScrollView>{clinicLst.map(this.makeList)}</ScrollView>
      </View>
    );
  }//end render

}//end class ScrollViewTEST

const styles = StyleSheet.create({
  rowStyle:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#111111',
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

  addrStyle:{
    color: '#bbbbbb'
  }
})//end styles

////////////////////////////////////////////////////////////
//FUNCTIONS//
////////////////////////////////////////////////////////////
async function getFinderData(url){
  ////GET NUM PAGES////
  //url = 'https://www.dialysisfinder.com/dialysis-centers/los-angeles/ca/90001';
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
    newClinicCIO.each((i, elem)=>{//for each location 'ul', extract info & add to clinicList
      //console.log({elem});

      tmpName = $('*', 'li:first-of-type > a:first-of-type', elem).text();//select text of child of first 'a'
      if(tmpName != ''){
        tmpAddr = $('li:first-of-type > p:first-of-type', elem).text();//select address text
        tmpSrvcStr = $('p', 'li:first-of-type > div', elem).text();//select general info string
        tmpSrvcStr = tmpSrvcStr.substring(tmpSrvcStr.indexOf(':')+1).replace(/\s/g, '');//extract service info
        
        //console.log({tmpName});
        //console.log({tmpAddr});
        //console.log({tmpSrvcStr});

        var newClinicOBJ = {'name': tmpName,
                            'addr': tmpAddr,
                            'srvcs': tmpSrvcStr,
                            'id': ++numClinics};
        //console.log({newClinicOBJ});

        clinicLst.push(newClinicOBJ);
      }
    });//select child of first 'a' within that 'ul'
    
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

  return numPages;
}//end getFinderData

function mapStateToProps(state) {
  return {
  fontProp: state.fontProps,
  themeProp: state.themeProps
  };
}

connect(mapStateToProps);
export default connect(mapStateToProps)(ScrollViewTEST);