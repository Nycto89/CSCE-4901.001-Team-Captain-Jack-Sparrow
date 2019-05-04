//redux-saga imports
import cheerio from 'cheerio-without-node-native';
//clinicFinder imports
import { Alert, Platform } from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';
import Permissions from 'react-native-permissions';
import { call, put, takeLeading } from 'redux-saga/effects';



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
    Permissions.request('location').then(async (response) => {
        if (response === 'authorized') {
            _state.perms = 'authorized';

            resolve('authorized');
        }//end if
        else {
            resolve('denied');
        }
    })//end then()
});//end request permissions promise

_alertForPerms = async () => new Promise((resolve, reject) => {
    if (Platform.OS == 'android') {
        Alert.alert(
            'Can we have access to your location?',
            'We need access to give you relevant clinic locations',
            [
                {
                    text: 'Cancel',
                    onPress: () => { resolve('cancel'); },
                    style: 'cancel'
                },

                ((_state.perms == ('undetermined')) || (_state.perms == ('denied')))
                    ? { text: 'OK', onPress: () => { resolve('OK'); } }
                    : { text: 'Open Settings', onPress: () => { resolve('settings'); } }
            ],
            { cancelable: false }
        );//end alert
    }//end if android
    else if (Platform.OS == 'ios') {
        if (_state.perms != 'restricted') {
            Alert.alert(
                'Can we have access to your location?',
                'We need access to give you relevant clinic locations',
                [
                    {
                        text: 'Cancel',
                        onPress: () => { resolve('cancel'); },
                        style: 'cancel'
                    },

                    (_state.perms == ('undetermined'))
                        ? { text: 'OK', onPress: () => { resolve('OK'); } }
                        : { text: 'Open Settings', onPress: () => { resolve('settings'); } }
                ],
                { cancelable: false }
            );//end alert
        }//end if perms != 'restricted'
        else {//else iOS restricted
            Alert.alert(
                'The Location Permission has been disabled on your device',
                'The app will default to the Dallas Area...',
                [{
                    text: 'Cancel',
                    onPress: () => { resolve('cancel'); },
                    style: 'cancel'
                }]
            );//end alert
        }//end else iOS restricted
    }//end else if iOS
});//end alertForPerms promise

getCoords = async () => new Promise(async (resolve, reject) => {
    await Geolocation.getCurrentPosition(
        (position) => {
            _location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            resolve(_location);
        },
        (error) => {
            // See error code charts below.
            reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );//end Geolocation
});//end getCoords promise

doPhoneGeoCode = async () => new Promise(async (resolve, reject) => {
    try {
        const res = await Geocoder.geocodePosition(_location);
        _location = {
            lat: _location.lat,
            lng: _location.lng,
            city: res[0].locality,
            state: res[0].adminArea,
            zipCode: res[0].postalCode
        };

        resolve(_location);
    }//end try
    catch (err) {
        reject(err);
    };
});//end doPhoneGeoCode promise

doAddrGeoCode = async (addr, i) => new Promise(async (resolve, reject) => {
    try {
        const res = await Geocoder.geocodeAddress(addr);
        rtnCoords = [{
            latitude: res[0].position.lat,
            longitude: res[0].position.lng
        }, i]

        resolve(rtnCoords);
    }//end try
    catch (err) {
        reject(err);
    };
});//end doAddrGeoCode promise

async function getFinderData(location, clinicLst) {
    //clear the list... maybe change this later to allow to skip getting clinic data if list already populated
    clinicLst = [];

    ////GET NUM PAGES////
    url = 'https://www.dialysisfinder.com/dialysis-centers/' + location.city + '/' + location.state + '/' + location.zipCode;
    const htmlStr = await fetch(url)//request HTML page
        .then(
            response => (response.text())
        )
        .catch(
            error => { }
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
        newClinicCIO.each(async (i, elem) => {//for each location 'ul', extract info & add to clinicList

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
                    'id': (numClinics + 1)
                };

                clinicLst.push(newClinicOBJ);
                //get location coords
                tmpLatLng = {};
                numClinics++;
            }//end if valid name
        });//select child of first 'a' within that 'ul' end .each()


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

    let i;
    for (i = 0; i < numClinics; ++i) {
        tmpAddr = clinicLst[i].addr;

        //PROBABLY NEED TRY/CATCH BLOCK
        res = await doAddrGeoCode(tmpAddr, i);
        tmpLatLng = res[0];
        clinicLst[res[1]].coords = tmpLatLng;
    }
    return clinicLst;
}//end getFinderData

export function* mkeClinicLst() {
    _state.perms = yield Permissions.check('location');

    //if not already authorized, tell why you want auth
    if (_state.perms != 'authorized') {
        response = yield _alertForPerms();

        //if not cancel... formal request for perms
        if (response == 'OK') {
            perms = yield _requestPermission();

            //if now authorized
            if (perms == 'authorized') {
                try {
                    yield getCoords();
                    response = yield doPhoneGeoCode();
                    lst = yield getFinderData(response, _clinicLst);
                    _clinicLst = lst;

                    //this.setState({ready: true});
                    action = { type: "LIST_READY", payload: _clinicLst };
                    return action;
                }
                catch (error) {
                    action = { type: "DATA_ERROR" };
                    return action;
                }//end .catch()
            }//end if authed
        }//end requestPermission.then()
        else if (response == 'settings') {//else user wants to open settings...        
            if (Platform.OS == 'android') AndroidOpenSettings.appDetailsSettings();
            else if (Platform.OS == 'ios') {
                if (Permissions.canOpenSettings()) {
                    Permissions.openSettings();
                }
                else {//else can't open settings
                    Alert.alert(
                        'We can\'t open the settings page for you...',
                        'Please open settings on your phone, and allow this app to acces your location... Then reload clinicFinder',
                        [{
                            text: 'OK',
                            onPress: () => {  },
                        }]
                    );//end alert
                }//end else can't open settings
            }//ense else if iOS


            //this.setState({reload: true});
        }//end else if 'settings'
    }//end ifPerms NOT ALREADY authorized --> alertForPerms.then()
    else {//already authorized
        try {
            yield getCoords();
            response = yield doPhoneGeoCode();
            lst = yield getFinderData(response, _clinicLst);
            _clinicLst = lst;

            //this.setState({ready: true});
            action = { type: "LIST_READY", payload: _clinicLst };
            return action;
        }
        catch (error) {
            action = { type: "DATA_ERROR" };
            return action;
        }//end .catch()
    }//end already authorized

    //check perms again... if authed, we already did stuff... if not go to default loc
    _state.perms = yield Permissions.check('location');
    //if still not authed... go to default location
    if (response != 'authorized') {
        _location = { lat: 32.780907, lng: -96.797766 };//set location to Dallas

        response = yield doPhoneGeoCode();
        lst = yield getFinderData(response, _clinicLst);
        _clinicLst = lst;

        //this.setState({ready: true});
        action = { type: "LIST_READY", payload: _clinicLst };
        return action;
    }//end if still not authorized
}//end mkeClinicLst



////////////////////////////////////////////////////////////////////////////
///////////////////////////////SAGA FUNCTIONS///////////////////////////////
////////////////////////////////////////////////////////////////////////////
export function* requestClinics() {
    res = yield call(mkeClinicLst);

    yield put(res);
}

export default function* watchRequestClinics() {
    yield takeLeading("GET_CLINICS", requestClinics);
}