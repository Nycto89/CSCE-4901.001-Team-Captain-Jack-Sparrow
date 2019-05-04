import React from 'react';
import { Alert, Button, Dimensions, FlatList, Keyboard, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';
import BarcodeMask from 'react-native-barcode-mask';
import { RNCamera } from 'react-native-camera';
import Permissions from 'react-native-permissions';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';


// For future use, this is the link to app settings if user does not allow camera access
// Linking.openURL('app-settings:')

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const API_KEY = 'LzeIbgSBnewzVpdbt0GGDAOBmQNZDcvklWy2fERw';
const NUM_RESULTS = '25';


const DESIRED_RATIO = "16:9";

class Nutrition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      foodData: {},
      loading: false,
      methodBarCode: false,

      cameraOpen: false,
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

  //try to open settings on iOS
  openiOSSettings = () => {
    if (Permissions.canOpenSettings()) {
      Permissions.openSettings();
    }
    else {//else can't open settings
      Alert.alert(
        'We can\'t open the settings page for you...',
        'Please navigate to app settings and allow this app to access the camera',
        [{
          text: 'OK',
          onPress: () => { },
          style: 'cancel'
        }]
      );//end alert
    }//end else can't open settings
  }

  // Request permission to access photos
  requestPermission = () => {
    Permissions.request('camera').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ cameraPermission: response }, response => {
        if (response === 'authorized') {
          this.setState({ cameraOpen: true });
        } else {
          this.setState({ cameraOpen: false });
        }
      })
    })
  }

  alertForCameraPermission = () => {
    if (Platform.OS === 'ios' && this.state.cameraPermission === 'restricted') {
      Alert.alert(
        'The Camera permission has been disabled for this device',
        'Unable to use the camera',
        [{
          text: 'Cancel', style: 'cancel',
        }]
      )//end alert
    }//end if iOS restricted
    else if (Platform.OS === 'ios') {//else if iOS NOT restricted
      Alert.alert(
        'Can we access your camera?',
        'We need access to capture barcodes',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel'
          },

          (this.state.cameraPermission === 'undetermined')
            ? { text: 'OK', onPress: this.requestPermission }
            : { text: 'Open Settings', onPress: this.openiOSSettings },
        ],
        { cancelable: false }
      )//end alert
    } else if (Platform.OS === 'android') {
      Alert.alert(
        'Can we access your camera?',
        'We need access to capture barcodes',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel'
          },

          ((this.state.cameraPermission === 'undetermined') || (this.state.cameraPermission === 'denied'))
            ? { text: 'OK', onPress: this.requestPermission }
            : {
              text: 'Open Settings',
              onPress: () => {
                AndroidOpenSettings.appDetailsSettings();
                Actions.HomeScreen({ type: "reset" });
              }
            },
        ],
        { cancelable: false }
      )
    }//end else if android
  }//end alertForCameraPermission

  renderItem = ({ item, index }) => {
    if (item.phosphorus) {
      return (
        <View style={[styles.resultItemView, { backgroundColor: this.props.themeProp.backgroundColor, borderColor: this.props.themeProp.textColor }]}>
          <View style={[styles.resultDescView, { backgroundColor: this.props.themeProp.backgroundColor, borderColor: this.props.themeProp.borderColor }]}>
            <Text style={{
              color: this.props.themeProp.textColor,
              fontSize: this.props.fontProp.fontVal,
              paddingBottom: 15,
              paddingTop: 15,
              textAlignVertical: 'center',
              textAlign: 'center',
            }}
            >{item.name}</Text>
          </View>
          <View style={[styles.resultValueView, { backgroundColor: this.props.themeProp.backgroundColor, borderColor: this.props.themeProp.borderColor }]}>
            <Text style={{
              color: this.props.themeProp.textColor,
              fontSize: this.props.fontProp.fontVal,
              textAlignVertical: 'center',
              textAlign: 'center'
            }}
            >{item.phosphorus.value}</Text>
          </View>
        </View>
      )

    }
    else if (this.state.methodBarCode === true) {
      return (
        <View style={[styles.resultItemView, { backgroundColor: this.props.themeProp.backgroundColor, borderColor: this.props.themeProp.textColor }]}>
          <Text style={{
            color: this.props.themeProp.textColor,
            fontSize: this.props.fontProp.fontVal,
            textAlignVertical: 'center',
            textAlign: 'center',
          }}
          >{item.name} : Not listed</Text>
        </View>
      )
    }
  }

  _listEmptyComponent = () => {
    return (
      <View style={{ alignItems: 'center', marginBottom: 15 }}>
        <Text style={{
          textAlignVertical: 'center',
          textAlign: 'center',
          fontSize: 25,
          color: this.props.themeProp.textColor
        }}
        >Enter a search term or scan a barcode to get started!</Text>
      </View>
    )
  }

  renderHeader = () => {
    if (this.state.foodData.list != undefined)

    if (this.state.foodData.list && this.state.foodData.list.item && this.state.foodData.list.item.length > 0) {
      return (
        <View style={[styles.resultItemView, { backgroundColor: this.props.themeProp.backgroundColor, borderColor: this.props.themeProp.textColor }]}>
          <View style={styles.resultDescView}>
            <Text style={{
              color: this.props.themeProp.textColor,
              fontSize: this.props.fontProp.fontVal,
              textAlignVertical: 'center',
              textAlign: 'center',
            }}
            >Item Name</Text>
          </View>
          <View style={styles.resultValueView}>
            <Text style={{
              color: this.props.themeProp.textColor,
              fontSize: this.props.fontProp.fontVal,
              paddingBottom: 15,
              textAlignVertical: 'center',
              textAlign: 'center'
            }}
            >Phosphorus (mg)</Text>
          </View>
        </View>
      );
    }
  }

  prepareRatio = async () => {
    if (Platform.OS === 'android' && this.cam) {
      const ratios = await this.cam.getSupportedRatiosAsync();

      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];
      this.setState({ cameraRatio: ratio }, () => { });
    }
  }

  render() {
    return (
      <View style={[styles.mainContainer, { backgroundColor: this.props.themeProp.backgroundColor }]}>
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
                <BarcodeMask edgeColor={'#62B1F6'} width={300} height={300} />
                <View style={styles.cameraView}>
                  <Button onPress={() => this.setState({ cameraOpen: false })} title="Cancel"></Button>
                </View>

              </RNCamera>
            </View>
          </Modal>
        }
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
            clearTextOnFocus
            placeholder={'Search for a food item...'}
            placeholderColor={'grey'}
            onSubmitEditing={this.submitText}
          />
          <View style={styles.textButtonsView}>
            <TouchableOpacity style={[styles.textButton, { backgroundColor: this.props.themeProp.accentColor, borderColor: this.props.themeProp.accentColor }]} onPress={() => this.setState({ text: "" })}>
              <Text style={[styles.buttonText, { color: this.props.themeProp.backgroundColor, }]}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.textButton, { backgroundColor: this.props.themeProp.accentColor, borderColor: this.props.themeProp.accentColor }]} onPress={() => { Keyboard.dismiss(); this.submitText(); }}>
              <Text style={[styles.buttonText, { color: this.props.themeProp.backgroundColor, }]}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scanButtonView}>
            <TouchableOpacity style={[styles.scanButton, { backgroundColor: this.props.themeProp.accentColor, borderColor: this.props.themeProp.accentColor }]} onPress={() => {

              // console.warn( this.state.cameraPermission );
              if (this.state.cameraPermission === 'authorized') {
                this.setState({ cameraOpen: true })
              } else {
                this.alertForCameraPermission();
              }

            }}//end onPress()
            >
              <Text style={[styles.buttonText, { color: this.props.themeProp.backgroundColor, }]}>Scan Barcode</Text>
            </TouchableOpacity>
          </View>
          {/* <Button onPress={() => {console.log(JSON.stringify(this.state, null, 2))}  } title="Log State"/> */}
        </View>
        {this.renderHeader()}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {/*HEADER HERE!!!*/}
          <FlatList
            keyExtractor={(item) => item.ndbno}
            data={this.state.foodData.list ? this.state.foodData.list.item : []}
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
      await this.setState({ cameraOpen: false, methodBarCode: true });
      // console.warn(scanResult.type);
      if (scanResult.type != "org.gs1.EAN-13" && scanResult.type != "org.iso.Code128" && scanResult.type != "EAN_13" && scanResult.type != "CODE_128") {
        setTimeout(() => {
          Alert.alert(
            'Unsupported Barcode',
            'Only UPC-A, or GTIN are supported.',
            [
              { text: 'OK', onPress: () => {} },
            ],
            { cancelable: false },
          );
        }, 100)
      } else {
        // console.warn(scanResult.type);
        // console.warn(scanResult.data);
        // console.warn(scanResult.data.slice(1));

        await this.setState({ text: scanResult.data });

        let query;

        if (scanResult.type == "org.gs1.EAN-13" || scanResult.type == "EAN_13") {
          //Remove leading 0 from UPC-A
          query = scanResult.data.slice(1);
        } else if (scanResult.type == "org.iso.Code128" || scanResult == "CODE_128") {
          // console.warn(scanResult.data.length);
          //Make the GTIN 14 numbers, filling in beginning with 0s until length is 14
          let fill_num = scanResult.data.length < 14 ? 14 - scanResult.data.length : 0;
          let fill_string = "0".repeat(fill_num);
          query = fill_string.concat(scanResult.data);
          if (scanResult.data.length == 16) {
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
            { text: 'OK', onPress: () => {} },
          ],
          { cancelable: false },
        );
      }, 100)
    }
    return;
  }

  submitText = () => {

    this.setState({ methodBarCode: false }, () => this.getUSDAProductInfo(this.state.text));

  }

  getUSDAProductInfo(submittedText) {
    let url = 'https://api.nal.usda.gov/ndb/search/?format=json&q=';
    url += encodeURIComponent(submittedText);
    url += '&max=';
    url += NUM_RESULTS;
    url += '&offset=0&api_key=';
    url += API_KEY;

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        else {
          throw Error(`Search Request rejected with status ${response.status}`);
        }
      })
      .then(response => response.json())
      // .then(responseJson => { console.dir(responseJson); return responseJson })
      .then(responseJson => {
        if (responseJson.errors && responseJson.errors.error && responseJson.errors.error[0].status == 400) {
          Alert.alert(
            'No results',
            'Your search did not return any results. Please modify your search and try again.',
            [
              { text: 'OK' }
            ],
            { cancelable: true },
          );
          // console.warn(responseJson);
          return;
        } else if (responseJson.list) {
          this.getNutrients(responseJson)
        } else {
          Alert.alert(
            'Error',
            'There was an issue contacting the USDA database.',
            [
              { text: 'OK' }
            ],
            { cancelable: false })
        }
      })
      // .then(responseJson => { this.setState({ foodData : responseJson }, function() {this.getNutrients()})})
      .catch((error) => {
      });
  }

  getNutrients(foodDataCopy) {

    if (foodDataCopy) {
      const reqNDOs = foodDataCopy.list.item.map((item) => item.ndbno);

      let url = 'https://api.nal.usda.gov/ndb/V2/reports?';

      for (let i = 0; i < reqNDOs.length; i++) {
        url += 'ndbno=';
        url += reqNDOs[i];
        if (i < reqNDOs.length) {
          url += '&'
        }
      }
      url += 'type=b&format=json&api_key=';
      url += API_KEY;

      return fetch(url)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          else {
          }
        })
        .then(response => response.json())
        .then(responseJson => {
          foodDataCopy.list.item.forEach(food => {
            let match = responseJson.foods.find(res => res.food.desc.ndbno === food.ndbno);
            //The nutrient ID of phosphorus is 305
            food.phosphorus = match.food.nutrients.find(o => { return o.nutrient_id === '305' })
          })
        })
        .then(() => {
          this.setState({ foodData: foodDataCopy }, () => {
            this.checkReturn();
          })
        })
        .catch((error) => {
        });

    } else {
      // this.setState({ displayData : {} });
    }
  }

  checkReturn = () => {
    //Alert if the item ws found but had no phosphorus value
    if (this.state.methodBarCode === true &&
      this.state.foodData.list.item &&
      !this.state.foodData.list.item[0].phosphorus) {
      Alert.alert(
        'Value not listed',
        'The item scanned was found in the database, however no phosphorus value is provided. You may want to try a manual search for similiar items.',
        [
          { text: 'OK', onPress: () => {} },
          { text: 'Scan another item', onPress: () => { this.setState({ cameraOpen: true }) } }
        ],
        { cancelable: true },
      );
    }

    //Alert if there are no relevant results at all
    else if (this.state.foodData.list.item &&
      !this.state.foodData.list.item.find(item => item.phosphorus)) {
      Alert.alert(
        'No results',
        'Your search did not return any results. Please modify your search and try again. It may be helpful to be more specific.',
        [
          { text: 'OK' }
        ],
        { cancelable: true },
      );
    }
  }


}



const USDACredit = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 10, marginTop: 15 }}>
      <Text style={{ textAlignVertical: "center", textAlign: "center", color: props.textColor }}>U.S. Department of Agriculture, Agricultural Research Service. 20xx. USDA National Nutrient Database for Standard Reference, Release . Nutrient Data Laboratory Home Page, http://www.ars.usda.gov/nutrientdata</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  textInputContainer: {
    margin: 15,
  },

  textInput: {
    height: 45,
    borderColor: '#222222',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingLeft: 5

  },

  textButtonsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    paddingTop: 20
  },

  textButton: {
    backgroundColor: 'lightgray',
    height: 40,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 3,
  },

  buttonText: {
    fontSize: 24
  },

  scanButtonView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },

  scanButton: {
    backgroundColor: 'lightgray',
    height: 45,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 3
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
  cameraView: {
    marginBottom: 80,
  },
  resultItemView: {
    flexDirection: 'row',
    borderWidth: 1
  },
  resultDescView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultValueView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
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