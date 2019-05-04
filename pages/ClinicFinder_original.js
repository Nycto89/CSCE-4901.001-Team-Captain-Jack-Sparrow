import cheerio from 'cheerio-without-node-native';
import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';
import { createOpenLink } from 'react-native-open-maps';
import { IconButton } from 'react-native-paper';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import { clinicLst } from '../clinicData/clinicLookupData';

class clinicFinder extends Component {
  state = { ready: false };
  location = {};

  ////////////////////////////////////////////////////////
  //FUNCTIONS//
  ////////////////////////////////////////////////////////
  makeList = (item) => (
    <View key={item.id} style={[styles.rowStyle, { backgroundColor: this.props.themeProp.backgroundColor, borderColor: this.props.themeProp.borderColor }]}>
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
  );//end makeList

  _requestPermission = async () => new Promise((resolve, reject) => {
    Permissions.request('location',
    ).then(async (response) => {
      if (response === 'authorized') {
        this.state.perms = 'authorized';

        resolve('authorized');
      }//end if
      else {
        resolve('denied');
      }
    })//end then()
  });//end request permissions promise

  _alertForPerms = async () => new Promise((resolve, reject) => {
    Alert.alert(
      'Can we have access to your location?',
      'We need access to give you relevant clinic locations',
      [
        {
          text: 'Cancel',
          onPress: () => { resolve('cancel'); },
          style: 'cancel'
        },
        ((this.state.perms == ('undetermined')) || (this.state.perms == ('denied')))
          ? { text: 'OK', onPress: () => { resolve('OK'); } }
          : { text: 'Open Settings', onPress: () => { resolve('settings'); } }
      ],
      { cancelable: false }
    );//end alert
  });//end alertForPerms promise

  getCoords = async () => new Promise(async (resolve, reject) => {
    await Geolocation.getCurrentPosition(
      (position) => {
        this.location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        resolve(this.location);
      },
      (error) => {
        // See error code charts below.
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );//end Geolocation
  });//end getCoords promise

  doGeoCode = async () => new Promise(async (resolve, reject) => {
    try {
      const res = await Geocoder.geocodePosition(this.location);
      this.location = {
        city: res[0].locality,
        state: res[0].adminArea,
        zipCode: res[0].postalCode
      };

      resolve(this.location);
    }//end try
    catch (err) {
      reject(err);
    };

  });//end doGeoCode promise
  ////////////////////////////////////////////////////////
  //END FUNCTIONS//
  ////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  /////////////////COMPONENT DID MOUNT////////////////////
  /////////////////////////////////////////////////////////
  async componentDidMount() {
    //check if authorized
    await Permissions.check('location').then(response => {
      this.setState({ perms: response });
    })

    //if not already authorized, tell why you want auth
    if (this.state.perms != 'authorized') await this._alertForPerms().then(async (response) => {

      //if not cancel... formal request for perms
      if (response == 'OK') await this._requestPermission().then(async (perms) => {

        //if now authorized
        if (perms == 'authorized') {
          await this.getCoords().then(async () => {
            await this.doGeoCode().then(async (response) => {
              await getFinderData(response).then(() => {
                this.setState({ ready: true });
              });//end getFinderData.then()
            });//end doGeoCode.then()
          })//end getCoords.then()
            .catch(error => {  });
        }//end if authed
      });//end requestPermission.then()
      else if (response == 'settings') {//else user wants to open settings...        
        this.setState({ reload: true });
      }//end else if 'settings'
    });//end ifPerms NOT ALREADY authorized --> alertForPerms.then()
    else {//already authorized
      await this.getCoords().then(async () => {
        await this.doGeoCode().then(async (response) => {
          await getFinderData(response).then(() => {
            this.setState({ ready: true });
          });//end getFinderData.then()
        });//end doGeoCode.then()
      })//end getCoords.then()
        .catch(error => {  });
    }//end already authorized

    //check perms again... if authed, we already did stuff... if not go to default loc
    await Permissions.check('location').then(async (response) => {
      this.state.perms = response;

      //if still not authed... go to default location
      if (response != 'authorized') {
        this.location = { lat: 32.780907, lng: -96.797766 };//set location to Dallas

        await this.doGeoCode().then(async (response) => {
          await getFinderData(response).then(() => {
            this.setState({ ready: true });
          });//end getFinderData.then()
        });//end doGeoCode.then()
      }//end if still not authorized
    })//end permission check.then()
  }
  ////////////////////////////////////////////////////////
  /////////////////end componentDidMount()////////////////
  ////////////////////////////////////////////////////////

  //////RENDER//////
  render() {
    if (this.state.reload) {
      AndroidOpenSettings.appDetailsSettings();
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 30 }}>Please restart clinicFinder for permission changes to take affect...</Text>
        </View>
      )
    }
    if (!this.state.ready) {
      return (
        <Text>Fetching Clinic Data... please wait!</Text>
      )
    }
    return (
      <View>
        <ScrollView>{clinicLst.map(this.makeList)}</ScrollView>
      </View>
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

////////////////////////////////////////////////////////////
//FUNCTIONS//
////////////////////////////////////////////////////////////
async function getFinderData(location) {
  ////GET NUM PAGES////
  url = 'https://www.dialysisfinder.com/dialysis-centers/' + location.city + '/' + location.state + '/' + location.zipCode;
  const htmlStr = await fetch(url)//request HTML page
    .then(
      response => (response.text())
    )
    .catch(
      error => {  }
    )

  //parse HTML response into a string
  $ = cheerio.load(htmlStr);
  pageCheerioObj = $('div.pagination').last().children();//select 'ul' within last div.pagination element
  pageCheerioObj = $('a', pageCheerioObj);//select all 'a' elements within that 'ul'
  const numPages = pageCheerioObj.length - 1;
  ////FINISH GET NUM PAGES////

  ////GET CLINIC DATA////
  var pageNum = 1;//current page
  var numClinics = 0;//num clinics added to list
  do {
    newClinicCIO = $('ul:first-of-type', 'div.all-dva-center-mobile');//select first 'ul' from each locatin div
    newClinicCIO.each((i, elem) => {//for each location 'ul', extract info & add to clinicList

      tmpName = $('*', 'li:first-of-type > a:first-of-type', elem).text();//select name text
      if (tmpName != '') {
        tmpAddr = $('li:first-of-type > p:first-of-type', elem).text();//select address text
        tmpSrvcLst = [];
        newSrvcCIO = $('ul', '*.all-serv-bar ~ div');//select lists on services from service divs
        const numPerPage = $(newSrvcCIO).length;
        newSrvcCIO = newSrvcCIO.eq(numClinics % numPerPage);
        newSrvcCIO = $('li', newSrvcCIO);
        newSrvcCIO.each((j, elem) => {
          tmpSrvcLst.push($(elem).text());
        })

        var newClinicOBJ = {
          'name': tmpName,
          'addr': tmpAddr,
          'srvcs': tmpSrvcLst,
          'id': ++numClinics
        };

        clinicLst.push(newClinicOBJ);
      }
    });//select child of first 'a' within that 'ul'

    //finished getting clinics on this page, get next page
    var n = url.lastIndexOf("page");
    if (n == -1) {
      url += "/page/" + (++pageNum);
    }
    else {
      url = url.replace(/page.*/, "page/");
      url += (++pageNum);
    }

    const htmlStr = await fetch(url)//request HTML page
      .then(
        response => (response.text())
      )
      .catch(
        error => {  }
      )

    //parse HTML response into a string
    $ = cheerio.load(htmlStr);
  } while (pageNum <= numPages);

  return numPages;
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

connect(mapStateToProps)
export default connect(mapStateToProps)(clinicFinder);