import React, { Component } from 'react';
import { Text, Button, StyleSheet, ScrollView, View} from 'react-native';
import {createOpenLink} from 'react-native-open-maps';
import {IconButton, Colors} from 'react-native-paper';
import {clinicLst} from '../clinicData/clinicLookupData';
import {connect} from 'react-redux';

class ScrollViewTEST extends Component{
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
  );

  render(){
    return(
      <View>
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
})

function mapStateToProps(state) {
  return {
  fontProp: state.fontProps,
  themeProp: state.themeProps
  };
}

connect(mapStateToProps);
export default connect(mapStateToProps)(ScrollViewTEST);