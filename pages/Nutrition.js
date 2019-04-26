import React from 'react';
import { StyleSheet, 
        Text, 
        View, 
        Button, 
        TextInput, 
        Keyboard,
        TouchableWithoutFeedback,
        FlatList,
        TouchableOpacity,
        Dimensions,
        Modal,
        Platform,
        Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';

import  { RNCamera }  from 'react-native-camera';
import Permissions from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings'

// For future use, this is the link to app settings if user does not allow camera access
// Linking.openURL('app-settings:')

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const API_KEY = 'LzeIbgSBnewzVpdbt0GGDAOBmQNZDcvklWy2fERw';
const NUM_RESULTS = '25';


const DESIRED_RATIO = "16:9";

class Nutrition extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text : '',
      foodData : {},
      loading : false,
      methodBarCode : false,

      cameraOpen : false,
      cameraType: RNCamera.Constants.Type.back,
      flashMode: RNCamera.Constants.FlashMode.auto,
      barcodeFinderVisible: true,
      cameraRatio: DESIRED_RATIO
    }
  }

  // Check the status of a single permission
  componentDidMount() {
    Permissions.check('camera').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ cameraPermission: response }, () => {
        // console.warn( response );
      })
    })
  }

    // Request permission to access photos
    requestPermission = () => {
      Permissions.request('camera').then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        this.setState({ photoPermission: response }, response => {
          if( response === 'denied'){
            this.setState({ cameraOpen : false });
          }
        })
      })
    }

    alertForCameraPermission = () => {
      if(Platform.OS === 'ios' && this.state.cameraPermission === 'restricted'){
        Alert.alert(
          'The Camera permission has been disabled for this device',
          'Unable to use the camera',
          [
            {
              text: 'Ok', style: 'cancel',
            }
          ]
        )
      }
      else if(Platform.OS === 'ios'){
        if(Permissions.canOpenSettings()){
          Alert.alert(
            'Can we access your camera?',
            'We need access to capture barcodes',
            [
              {
                text: 'Deny', onPress: () => console.log('Permission denied'), style: 'cancel',
              },
              this.state.cameraPermission === 'undetermined' 
                ? { text: 'OK', onPress: this.requestPermission }
                : { text: 'Open Settings', onPress: () => { Permissions.openSettings(); }},
            ],
          )
        } else if( this.state.cameraPermission === 'denied' ){
          Alert.alert(
            'Camera access required',
            'Please navigate to app settings and allow this app to access the camera',
            [
              {
                text: 'Ok', style: 'cancel',
              },
            ],
          )
        }
      }else if (Platform.OS === 'android'){
        Alert.alert(
          'Can we access your camera?',
          'We need access to capture barcodes',
          [
            {
              text: 'Deny', onPress: () => console.log('Permission denied'), style: 'cancel',
            },
            this.state.cameraPermission === 'undetermined' || this.state.cameraPermission === 'denied'
              ? { text: 'OK', onPress: this.requestPermission }
              : { text: 'Open Settings', onPress: () => {
                AndroidOpenSettings.appDetailsSettings();
                Actions.HomeScreen({ type : "reset" });
              }},
          ],
        )
      }

      Alert.alert(
        'Can we access your camera?',
        'We need access to capture barcodes',
        [
          {
            text: 'Deny', onPress: () => console.log('Permission denied'), style: 'cancel',
          },
          this.state.cameraPermission == 'undetermined'
            ? { text: 'OK', onPress: this.requestPermission }
            : { text: 'Open Settings', onPress: () => {
              if( Platform.OS == 'ios'){
                Permissions.openSettings()
              } else if (Platform.OS == 'android'){
                AndroidOpenSettings.appDetailsSettings()
              }
              Actions.HomeScreen({ type : "reset" });
            }},
        ],
      )
    }

  renderItem = ({item, index}) => {
    // console.log(item);
    if( item.phosphorus ){
        return (
          <View style={[styles.resultItemView, {
            backgroundColor : index % 2 === 0 ? '#C0C0C0' : '#D3D3D3'
          }]}>
            <View style={styles.resultDescView}>
              <Text style={{ fontSize : this.props.fontProp.fontVal,
                    textAlignVertical : 'center', 
                            textAlign : 'center' , }}
                            >{item.name}</Text>
            </View>
            <View style={styles.resultValueView}>
              <Text style={{ fontSize : this.props.fontProp.fontVal,
                    textAlignVertical : 'center', 
                            textAlign : 'center' }}
                            >{item.phosphorus.value}mg</Text>
            </View>         
          </View>
        )
        
    } 
    else if( this.state.methodBarCode === true) {
      return (
        <View style={[styles.resultItemView, {
            backgroundColor : '#C0C0C0'  
        }]}>
          <Text style={{ fontSize : this.props.fontProp.fontVal,
                textAlignVertical : 'center', 
                        textAlign : 'center',
                        }}
                        >{item.name} : Not listed</Text>
        </View>
      ) 
    }
  }

  _listEmptyComponent = () => {
    return (
        <View style={{ alignItems : 'center',  marginBottom : 15 }}>
            <Text style={{ textAlignVertical : 'center', 
                            textAlign : 'center' ,
                            fontSize : 25,
                            color : this.props.themeProp.textColor }}
                            >Enter a search term or scan a barcode to get started!</Text>
        </View>
    )
  }

  

  prepareRatio = async () => {
    console.log('Preparing ratio...');
    console.log(this.cam);
    if (Platform.OS === 'android' && this.cam) {
         const ratios = await this.cam.getSupportedRatiosAsync();

         // See if the current device has your desired ratio, otherwise get the maximum supported one
         // Usually the last element of "ratios" is the maximum supported ratio
         const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];
         this.setState({ cameraRatio : ratio }, () => {console.log(JSON.stringify(this.state, null, 2))});
    }
}

  render() {
    return (
      <View style={[styles.mainContainer, {backgroundColor : this.props.themeProp.backgroundColor}]}>
        {this.state.cameraOpen && this.state.cameraPermission === 'authorized' &&
          <Modal>
            <View style={{ flex: 1, backgroundColor: "black", opacity: 0.9999 }}>
              <RNCamera
                      ref={cam => { this.cam = cam; }}
                      // onCameraReady={this.prepareRatio}
                      ratio={this.state.cameraRatio}
                      style={styles.preview}
                      type={this.state.cameraType}
                      flashMode={this.state.flashMode}
                      // permissionDialogTitle={'Permission to use camera'}
                      // permissionDialogMessage={'We need your permission to use your camera'}
                      captureAudio={false}
                      onBarCodeRead={this.onBarCodeRead}
                      barcodeFinderVisible={this.state.barcodeFinderVisible}
                      barcodeFinderWidth={280}
                      barcodeFinderHeight={220}
                      barcodeFinderBorderColor="white"
                      barcodeFinderBorderWidth={2}
                      defaultTouchToFocus
                    >
                  <View style={styles.cameraView}>
                    <Button onPress={ () => this.setState({ cameraOpen : false })} title="Cancel"></Button>
                  </View>
                </RNCamera>
              </View>
          </Modal>
        }
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    clearTextOnFocus
                    placeholder={'Search for a food item...'}
                    placeholderColor={'gray'}

                    onSubmitEditing={this.submitText}
                    />
          <View style={styles.textButtonsView}>
            <TouchableOpacity style={styles.textButton} onPress={() => this.setState({text: ""})}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textButton} onPress={() => { Keyboard.dismiss(); this.submitText(); }}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scanButtonView}>
            <TouchableOpacity style={styles.scanButton} onPress={() => {

              // console.warn( this.state.cameraPermission );
              if( this.state.cameraPermission === 'authorized' ){
                this.setState({ cameraOpen : true })
              } else {
                this.alertForCameraPermission();
              }
    
              }}>
              <Text style={styles.buttonText}>Scan Barcode</Text>
            </TouchableOpacity>
          </View>
          {/* <Button onPress={() => {console.log(JSON.stringify(this.state, null, 2))}  } title="Log State"/> */}
        </View>
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
              <FlatList
                keyExtractor={ (item) => item.ndbno }
                data={ this.state.foodData.list ? this.state.foodData.list.item : [] }
                renderItem={this.renderItem}
                ListEmptyComponent={this._listEmptyComponent}
                contentContainerStyle={styles.list}
                initialNumToRender={this.state.foodData.length}
                ListFooterComponent={USDACredit(this.props.themeProp)}
                removeClippedSubviews
              />
        </TouchableWithoutFeedback>
      </View>
    );
  }

  onBarCodeRead = async (scanResult) => {
    if (scanResult.data != null) {
      await this.setState({ cameraOpen : false , methodBarCode : true });
      console.warn(scanResult.type);
      if(scanResult.type != "org.gs1.EAN-13" && scanResult.type != "org.iso.Code128"){
        setTimeout(() => {
          Alert.alert(
            'Unsupported Barcode',
            'Only UPC-A, or GTIN are supported.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        }, 100)
      } else {
            // console.warn(scanResult.type);
            // console.warn(scanResult.data);
            // console.warn(scanResult.data.slice(1));

            await this.setState({ text : scanResult.data });

            let query;

            if(scanResult.type == "org.gs1.EAN-13"){
              //Remove leading 0 from UPC-A
              query = scanResult.data.slice(1);
            } else if( scanResult.type == "org.iso.Code128"){
              // console.warn(scanResult.data.length);
              //Make the GTIN 14 numbers, filling in beginning with 0s until length is 14
              let fill_num = scanResult.data.length < 14 ? 14 - scanResult.data.length : 0;
              let fill_string = "0".repeat(fill_num);
              query = fill_string.concat(scanResult.data);
              if(scanResult.data.length == 16){
                query = scanResult.data.slice(2);
              }
              
            }

            this.getUSDAProductInfo(query);
      }
    } else {
      setTimeout(() => {
          Alert.alert(
            'Read Error',
            'Unable to read the barcode. Please try again or search manually.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        }, 100)
    }
    return;
  }

  submitText = () => {

    this.setState({ methodBarCode : false } , () => this.getUSDAProductInfo(this.state.text));

  }

  getUSDAProductInfo(submittedText){
    let url = 'https://api.nal.usda.gov/ndb/search/?format=json&q=';
    url += encodeURIComponent(submittedText);
    url += '&max=';
    url += NUM_RESULTS;
    url += '&offset=0&api_key=';
    url += API_KEY;

    console.log('URL produced: ' + url);
    return fetch(url)
      .then((response) => {
        if(response.ok){
          console.log('USDA Response1: ' + JSON.stringify(response, null, 2));
          return response;
        }
        else{
          console.log(`Request rejected with status ${response.status}`);
          throw Error(`Search Request rejected with status ${response.status}`);
        }
        })
      .then(response => response.json())
      // .then(responseJson => { console.dir(responseJson); return responseJson })
      .then( responseJson => {
        if( responseJson.errors && responseJson.errors.error && responseJson.errors.error[0].status == 400 ){
          Alert.alert(
            'No results',
            'Your search did not return any results. Please modify your search and try again.',
            [
              {text: 'OK'}
            ],
            {cancelable: true},
          );
          // console.warn(responseJson);
          return;
        } else if ( responseJson.list ){
          this.getNutrients(responseJson)
        } else {
          Alert.alert(
            'Error',
            'There was an issue contacting the USDA database.',
            [
              {text: 'OK'}
            ],
            {cancelable: false})
        }
      })
      // .then(responseJson => { this.setState({ foodData : responseJson }, function() {this.getNutrients()})})
      .catch((error) => {
        console.log(error);
      });
  }

  getNutrients(foodDataCopy){
    console.log("Getting Nutrients...");
    // console.log('Current state in getNutrients : ');
    // console.log(JSON.stringify(this.state.foodData, null, 2));

      if(foodDataCopy){
        const reqNDOs = foodDataCopy.list.item.map( (item) => item.ndbno );
        console.log("NDBnos : " + reqNDOs);

        let url = 'https://api.nal.usda.gov/ndb/V2/reports?';

        for(let i = 0; i < reqNDOs.length; i++){
          url += 'ndbno=';
          url += reqNDOs[i];
          if(i < reqNDOs.length){
            url += '&'
          }
        }
        url += 'type=b&format=json&api_key=';
        url += API_KEY; 

        console.log('url created : ' + url);
        return fetch(url)
          .then((response) => {
            if(response.ok){
              console.log('USDA Response2: ' + JSON.stringify(response, null, 2));
              return response;
            }
            else{
              console.log(`Nutrition Request rejected with status ${response.status}`);
              // throw Error(`Request rejected with status ${response.status}`);
            }
            })
          .then(response => response.json())
          .then(responseJson => { 
            foodDataCopy.list.item.forEach( food => {
              let match = responseJson.foods.find( res => res.food.desc.ndbno === food.ndbno );
              //The nutrient ID of phosphorus is 305
              food.phosphorus = match.food.nutrients.find( o => { return o.nutrient_id === '305' })
            })
           })
          .then( () => { this.setState({ foodData : foodDataCopy }, () => { 
                console.log('Updating state...');
                console.log(JSON.stringify(this.state.foodData, null, 2)); 
                this.checkReturn(); } )})
          .catch((error) => {
            console.log(error);
          });

      } else {
        // this.setState({ displayData : {} });
      }
  }

  checkReturn = () => {
    //Alert if the item ws found but had no phosphorus value
    if( this.state.methodBarCode === true && 
        this.state.foodData.list.item && 
        !this.state.foodData.list.item[0].phosphorus){
          Alert.alert(
            'Value not listed',
            'The item scanned was found in the database, however no phosphorus value is provided. You may want to try a manual search for similiar items.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
              {text: 'Scan another item', onPress: () => {this.setState( { cameraOpen : true })}}
            ],
            {cancelable: true},
          );
        }

    //Alert if there are no relevant results at all
    else if( this.state.foodData.list.item &&
        !this.state.foodData.list.item.find( item => item.phosphorus )){
      Alert.alert(
        'No results',
        'Your search did not return any results. Please modify your search and try again. It may be helpful to be more specific.',
        [
          {text: 'OK'}
        ],
        {cancelable: true},
      );
    }
  }

    
}



const USDACredit = (props) => {
  return (
    <View style={{flex:1,justifyContent: "center",alignItems: "center", margin : 10, marginTop: 15}}>
      <Text style={{textAlignVertical: "center",textAlign: "center", color: props.textColor}}>U.S. Department of Agriculture, Agricultural Research Service. 20xx. USDA National Nutrient Database for Standard Reference, Release . Nutrient Data Laboratory Home Page, http://www.ars.usda.gov/nutrientdata</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  textInputContainer: {
    margin : 15
  },

  textInput: {
    height: 45, 
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor : 'white',
    paddingLeft : 5

  },

  textButtonsView: {
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center',
    margin : 10,
  },

  textButton:{
    backgroundColor : 'lightgray',
    height : 40,
    width : 140,
    justifyContent : 'center',
    alignItems : 'center'
  },

  buttonText:{
    fontSize : 24
  },

  scanButtonView: {
    justifyContent : 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
    margin : 10
  },

  scanButton:{
    backgroundColor : 'lightgray',
    height : 45,
    width : 300,
    justifyContent : 'center',
    alignItems : 'center'
  },
  list: {

  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: Width,
    height: Height,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  cameraView : {
    marginBottom : 80,
  },
  resultItemView: {
    flexDirection : 'row',
  },
  resultDescView: {
    flex : 3,
    alignItems : 'center',
    justifyContent : 'center'
  },
  resultValueView: {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    // backgroundColor : 'pink'
  }

});

function mapStateToProps(state) {
  return {
    themeProp: state.themeProps,
    fontProp: state.fontProps
  };
}


export default connect(mapStateToProps)(Nutrition);