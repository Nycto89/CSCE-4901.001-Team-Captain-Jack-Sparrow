import React, { Component } from 'react';
import { Text, Button, StyleSheet, ScrollView, View} from 'react-native';
import {createOpenLink} from 'react-native-open-maps';
import {clinicLst} from '../clinicData/clinicLookupData';

export default class ScrollViewTEST extends Component{
  makeList=(item)=>(
    <View key={item.id} style={styles.rowStyle}>
      <View style={styles.listStyle}>
        <Text style={styles.nameStyle}>{item.name}</Text>
        <Text>{item.addr}</Text>
      </View>
      <View style={styles.buttonStyle}>
        <Button
          color={'#0000ff'}
          title="Map"
          onPress={createOpenLink({query:(item.addr)})}
        />
      </View>
    </View>
  );

  render(){
    return(
      <View /*style={styles.mainViewStyle}*/>
        <Text>Dallas Clinic List</Text>
        <ScrollView>{clinicLst.map(this.makeList)}</ScrollView>
      </View>
    );
  }
}//end class ScrollViewTEST

const styles = StyleSheet.create({
  rowStyle:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1'
  },
  
  listStyle:{
    alignSelf: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 2
    //borderColor: '#2a4944',
    //borderWidth: 1,
    //backgroundColor: '#d2f7f1'
  },

  buttonStyle:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 2,
    width: 100,
    height: 100
  },
  
  nameStyle:{
    fontWeight: 'bold'
  }/*,

  mainViewStyle:{
    margin: 50, height: 5000
  }*/
})