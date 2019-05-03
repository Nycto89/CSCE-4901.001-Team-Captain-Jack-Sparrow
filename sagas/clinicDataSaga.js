//redux-saga imports
import {takeLeading, call, put} from 'redux-saga/effects'

//clinicFinder imports
import {Platform, Alert} from 'react-native';
import Permissions from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings'
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import cheerio from 'cheerio-without-node-native';


////////////////////////////////////////////////////////////////////////////
//GLOBAL VARS//
////////////////////////////////////////////////////////////////////////////
_state = {};
_clinicLst = [];
_location = {};

////////////////////////////////////////////////////////////////////////////
/////////////ASYNC FUNCTIONS TO HANDLE PERMS && GET CLINIC DATA/////////////
////////////////////////////////////////////////////////////////////////////
_requestPermission = async () => new Promise((resolve, reject) => {
    console.log('making request...');
    console.log(_location);
    Permissions.request('location').then(async (response) => {
        console.log('got response');
        if(response === 'authorized'){
        console.log('access authorized...');
        _state.perms = 'authorized';

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
                
                ((_state.perms == ('undetermined'))|| (_state.perms == ('denied')))
                    ? { text: 'OK', onPress: ()=>{resolve('OK');} }
                    : { text: 'Open Settings', onPress: ()=>{resolve('settings');} }
            ],
            {cancelable: false}
        );//end alert
    }//end if android
    else if(Platform.OS == 'ios'){
        if(_state.perms != 'restricted'){
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
                    
                    (_state.perms == ('undetermined'))
                    ? { text: 'OK', onPress: ()=>{resolve('OK');} }
                    : { text: 'Open Settings', onPress: ()=>{resolve('settings');} }
                ],
                {cancelable: false}
            );//end alert
        }//end if perms != 'restricted'
        else{//else iOS restricted
            Alert.alert(
                'The Location Permission has been disabled on your device',
                'The app will default to the Dallas Area...',
                [{
                    text: 'Cancel',
                    onPress: () => {console.log('Cancel pressed...'); resolve('cancel');},
                    style: 'cancel'
                }]
            );//end alert
        }//end else iOS restricted
    }//end else if iOS
});//end alertForPerms promise

getCoords = async () => new Promise(async (resolve, reject) => {
    console.log('getting Coords...');
    await Geolocation.getCurrentPosition(
        (position) => {
        console.log({position});
        _location = {lat: position.coords.latitude,
                    lng: position.coords.longitude};
        console.log(_location);
        resolve(_location);
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
    console.log('lat: '+_location.lat);
    console.log('lng: '+_location.lng);
    try{
        const res = await Geocoder.geocodePosition(_location);
        _location = {
        lat: _location.lat,
        lng: _location.lng,
        city: res[0].locality,
        state: res[0].adminArea,
        zipCode: res[0].postalCode
        };
        console.log('location: ' + _location);
        console.log('lat: '+_location.lat);
        console.log('lng: '+_location.lng);
        console.log('city: ' + _location.city);
        console.log('state: ' + _location.state);
        console.log('zipCode: ' + _location.zipCode);

        resolve(_location);
    }//end try
    catch(err){
        console.log('ERROR:' , err);
        reject(err);
    };
});//end doPhoneGeoCode promise

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
                numClinics++;
                /*
                console.log('about to addrGeoCode');
                console.log({tmpAddr});
                console.log({numClinics});
                //PROBABLY NEED TRY/CATCH BLOCK
                res = await doAddrGeoCode(tmpAddr, numClinics++);
                tmpLatLng = res[0];
                clinicLst[res[1]].coords = tmpLatLng;
                console.log('done addrGeoCode');
                console.log({tmpAddr});
                console.log({numClinics});
                */
                /*//PROBABLY NEED TRY/CATCH BLOCK
                .catch(err => {
                console.log(err);
                });//end doAddrGeoCode.catch()
                */


                //console.log('here2')
            }//end if valid name
            //console.log('sucks to suck');
            //console.log('')
            console.log('about to loop back to begin of each()');
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

    let i;
    for(i = 0; i < numClinics; ++i){
        tmpAddr = clinicLst[i].addr;
        console.log('about to addrGeoCode');
        console.log({tmpAddr});
        console.log({i});
        //PROBABLY NEED TRY/CATCH BLOCK
        res = await doAddrGeoCode(tmpAddr, i);
        tmpLatLng = res[0];
        clinicLst[res[1]].coords = tmpLatLng;
        console.log('done addrGeoCode');
        console.log({tmpAddr});
        console.log({i});
    }
    return clinicLst;
}//end getFinderData

export function* mkeClinicLst(){
    _state.perms = yield Permissions.check('location');
  
    //if not already authorized, tell why you want auth
    if(_state.perms != 'authorized'){
        response = yield _alertForPerms();
        console.log({response});
        
        //if not cancel... formal request for perms
        if(response == 'OK'){
            perms = yield _requestPermission();
            console.log('after request...');

            //if now authorized
            if(perms == 'authorized'){
                try{
                    yield getCoords();
                    response = yield doPhoneGeoCode();
                    console.log('doPhoneGeoCode response: '+ response);
                    lst = yield getFinderData(response, _clinicLst);
                    _clinicLst = lst;

                    console.log('done making clinicLst... push to store');
                    //this.setState({ready: true});
                    action = {type: "LIST_READY", payload: _clinicLst};
                    console.log({action});
                    return action;
                }
                catch(error){
                    console.log("ERROR: " + error);
                    action = {type: "DATA_ERROR"};
                    console.log({action});
                    return action;
                }//end .catch()
            }//end if authed
        }//end requestPermission.then()
        else if(response == 'settings'){//else user wants to open settings...        
            if(Platform.OS == 'android') AndroidOpenSettings.appDetailsSettings();
            else if(Platform.OS == 'ios'){
                if(Permissions.canOpenSettings()){
                    Permissions.openSettings();
                }
                else{//else can't open settings
                    Alert.alert(
                        'We can\'t open the settings page for you...',
                        'Please open settings on your phone, and allow this app to acces your location... Then reload clinicFinder',
                        [{
                            text: 'OK',
                            onPress: () => {console.log('OK pressed...');},
                        }]
                    );//end alert
                }//end else can't open settings
            }//ense else if iOS


            //this.setState({reload: true});
        }//end else if 'settings'
    }//end ifPerms NOT ALREADY authorized --> alertForPerms.then()
    else{//already authorized
        try{
            yield getCoords();
            response = yield doPhoneGeoCode();
            console.log('doPhoneGeoCode response: '+ response);
            lst = yield getFinderData(response, _clinicLst);
            _clinicLst = lst;

            console.log('done making clinicLst... push to store');
            //this.setState({ready: true});
            action = {type: "LIST_READY", payload: _clinicLst};
            console.log({action});
            return action;
        }
        catch(error){
            console.log("ERROR: " + error);
            action = {type: "DATA_ERROR"};
            console.log({action});
            return action;
        }//end .catch()
    }//end already authorized

    //check perms again... if authed, we already did stuff... if not go to default loc
    _state.perms = yield Permissions.check('location');
    //if still not authed... go to default location
    if(response != 'authorized'){
        _location = {lat: 32.780907, lng: -96.797766};//set location to Dallas
        
        response = yield doPhoneGeoCode();
        console.log('doPhoneGeoCode response: '+ response);
        lst = yield getFinderData(response, _clinicLst);
        _clinicLst = lst;

        console.log('done making clinicLst... push to store');
        //this.setState({ready: true});
        action = {type: "LIST_READY", payload: _clinicLst};
        console.log({action});
        return action;
    }//end if still not authorized

    console.log('after alert');
}//end mkeClinicLst



////////////////////////////////////////////////////////////////////////////
///////////////////////////////SAGA FUNCTIONS///////////////////////////////
////////////////////////////////////////////////////////////////////////////
export function* requestClinics(){
    console.log('in requestClinics... b4 mkeClinicLst');
    res = yield call(mkeClinicLst);
    //res = 15;
    yield console.log('after mkeClinicLst');
    yield console.log({res});
    
    yield put(res);
}

export default function* watchRequestClinics() {
    console.log('in saga');
    yield takeLeading("GET_CLINICS", requestClinics);
  }