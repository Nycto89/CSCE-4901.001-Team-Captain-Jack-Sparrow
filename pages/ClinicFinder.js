import React, { Component } from 'react';
import { Text, Button, StyleSheet, ScrollView, View} from 'react-native';
import {createOpenLink} from 'react-native-open-maps';
import Icon from 'react-native-vector-icons/FontAwesome';//maybe delete?
import {IconButton, Colors} from 'react-native-paper';
import {clinicLst} from '../clinicData/clinicLookupData';

export default class ScrollViewTEST extends Component{
  makeList=(item)=>(
    <View key={item.id} style={styles.rowStyle}>
      <View style={styles.listStyle}>
        <Text style={styles.nameStyle}>{item.name}</Text>
        <Text style={styles.addrStyle}>{item.addr}</Text>
      </View>
      <View style={styles.buttonStyle}>
        <IconButton
          icon={"explore"}
          size={30}
          color={Colors.grey600}
          onPress={createOpenLink({query:(item.addr)})}
        />
      </View>
    </View>
  );

  render(){
    return(
      <View /*style={styles.mainViewStyle}*/>
        <ScrollView>{clinicLst.map(this.makeList)}</ScrollView>
      </View>
    );
  }
}//end class ScrollViewTEST

const styles = StyleSheet.create({
  rowStyle:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#111111',
    borderWidth: 1,
    backgroundColor: '#222222'
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
    //borderColor: '#2a4944',
    //borderWidth: 1,
    //backgroundColor: '#d2f7f1'
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
  }/*,

  <Button
          color={'#0077bb'}
          title="Map"
          onPress={createOpenLink({query:(item.addr)})}
        />

  mainViewStyle:{
    margin: 50, height: 5000
  }*/
})