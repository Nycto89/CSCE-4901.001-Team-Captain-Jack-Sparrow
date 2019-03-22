import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, View} from 'react-native';
import {clinicLst} from '../clinicData/clinicLookupData';

export default class ScrollViewTEST extends Component{
  constructor(){
    super()
    this.state={
      firstVar:'',
      listValue:[
        {'name': 'list1', 'id': 1},
        {'name': 'list2', 'id': 2},
        {'name': 'list3', 'id': 3},
        {'name': 'list4', 'id': 4},
        {'name': 'list5', 'id': 5},
        {'name': 'list6', 'id': 6},
        {'name': 'list7', 'id': 7},
        {'name': 'list8', 'id': 8},
        {'name': 'list9', 'id': 9},
        {'name': 'list10', 'id': 10},
        {'name': 'list11', 'id': 11},
        {'name': 'list12', 'id': 12}
      ]
    }
  }

  makeList=(item)=>(
    <View key={item.id} style={styles.listStyle}>
      <Text style={styles.nameStyle}>{item.name}</Text>
      <Text>{item.addr}</Text>
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
  listStyle:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1'
  },
  
  nameStyle:{
    fontWeight: 'bold'
  }/*,

  mainViewStyle:{
    margin: 50, height: 5000
  }*/
})