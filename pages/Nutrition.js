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
        Platform } from 'react-native';
// import { List, ListItem } from 'react-native-elements'
import { ActionSheet } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import  { RNCamera }  from 'react-native-camera';

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

      cameraOpen : false,
      cameraType: RNCamera.Constants.Type.back,
      flashMode: RNCamera.Constants.FlashMode.auto,
      barcodeFinderVisible: true,
      cameraRatio: DESIRED_RATIO
    }
  }

  toggleCamera(){
    this.setState({ cameraOpen : !cameraOpen });
  }

  renderItem({item}){
    // console.log(item);
    if( item.phosphorus ){
        return (
          // <ListItem
          //   title={item.item.name}
          //   titleStyle={{ color: 'black' }}
          //   badge={{ value : item.item.phosphorus.value, textStyle: { color: 'blue' } }}
          // />
          <Text>{item.name} : {item.phosphorus.value}mg</Text>

        )
        
    } 
    // else {
    //   return <Text>{item.item.nbdno} : Not listed</Text>
    // }
  }

  _listEmptyComponent = () => {
    return (
        <View>
            <Text>No results.</Text>
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
        {this.state.cameraOpen && 
          <Modal>
            <View style={{ flex: 1, backgroundColor: "black", opacity: 0.9999 }}>
              <RNCamera
                          ref={cam => {
                            this.cam = cam;
                          }}
                          // onCameraReady={this.prepareRatio}
                          ratio={this.state.cameraRatio}
                          style={styles.preview}
                          type={this.state.cameraType}
                          flashMode={this.state.flashMode}
                          permissionDialogTitle={'Permission to use camera'}
                          permissionDialogMessage={'We need your permission to use your camera'}
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
            <TouchableOpacity style={styles.scanButton} onPress={() => this.setState( { cameraOpen : true })}>
              <Text style={styles.buttonText}>Scan Barcode</Text>
            </TouchableOpacity>
          </View>
          {/* <Button onPress={() => {console.log(JSON.stringify(this.state, null, 2))}  } title="Log State"/> */}
        </View>
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
          <View style={{flex : 1}}>
            {/* <List> */}
              <FlatList
                keyExtractor={ (item) => item.ndbno }
                data={ this.state.foodData.list ? this.state.foodData.list.item : [] }
                renderItem={this.renderItem}
                ListEmptyComponent={this._listEmptyComponent}
                contentContainerStyle={styles.list}
                ListFooterComponent={USDACredit()}
              />
            {/* </List> */}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  onBarCodeRead = (scanResult) => {
    console.warn(scanResult.type);
    console.warn(scanResult.data);
    console.warn(scanResult.data.slice(1));
    const UPC = scanResult.data.slice(1);
    // this.setState({ cameraOpen : false, text : UPC }, this.submitText());
    this.setState({ cameraOpen : false});
    this.getUSDAProductInfo(UPC);

    // if (scanResult.data != null) {
    //   if (!this.barcodeCodes.includes(scanResult.data)) {
    //       this.barcodeCodes.push(scanResult.data);
    //       console.warn('onBarCodeRead call');
    //     }
    // }
    return;
  }

  submitText = () => {

    this.getUSDAProductInfo(this.state.text);

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
      .then( responseJson => this.getNutrients(responseJson))
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

      // if(this.state.foodData){
      //   let foodDataCopy = cloneDeep(this.state.foodData);
        // console.log(' COPY : ');
        // console.log(JSON.stringify(foodDataCopy, null, 2));

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
              food.phosphorus = match.food.nutrients.find( o => { return o.nutrient_id === '305' })
            })
           })
          .then( () => { this.setState({ foodData : foodDataCopy }, () => { 
                console.log('Updating state...');
                console.log(JSON.stringify(this.state.foodData, null, 2)) } )})
          .catch((error) => {
            console.log(error);
          });

      } else {
        // this.setState({ displayData : {} });
      }
  }

}

const USDACredit = () => {
  return (
    <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
      <Text style={{textAlignVertical: "center",textAlign: "center",}}>U.S. Department of Agriculture, Agricultural Research Service. 20xx. USDA National Nutrient Database for Standard Reference, Release . Nutrient Data Laboratory Home Page, http://www.ars.usda.gov/nutrientdata</Text>
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
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor : 'white'

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
    width : 120,
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
  }

});

function mapStateToProps(state) {
  return {
    themeProp: state.themeProps,
    fontProp: state.fontProps
  };
}


export default connect(mapStateToProps)(Nutrition);