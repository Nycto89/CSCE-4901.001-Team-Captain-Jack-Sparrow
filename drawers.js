import React, {Component} from 'react';
import {Animated, TouchableHighlight, Dimensions, 
Platform, StyleSheet, Text, 
View, Image, PanResponder } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Content, List, ListItem} from 'native-base';
import Transplant from './modalities/transplant';
import FontSlider from './modalityData/slider_container';

export default class DrawerMenu extends React.Component {

    render() {

        return (
            <View style={{flex: 1}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                </View>
                <View style={{flex: 2}}>
                    <Content>
                        <List>
                            <ListItem onPress={() => Actions.mainScreen()}>
                                <Text style={styles.homeText}>Return to Home</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.drawer1()}>
                                <Text>Kidney Transplant</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.drawer2()}>
                                <Text>Peritoneal Dialysis</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.drawer3()}> 
                                <Text>In-Center Hemodialysis</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.drawer4()}>
                                <Text>Nocturnal Dialysis</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.drawer5()}>
                                <Text>Home Hemodialysis</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.drawer6()}>
                                <Text>Conservative Therapy</Text>
                            </ListItem>
                        </List>
                        <Text style={{paddingLeft: 15, paddingTop: 15}}>Settings</Text>
                        <Text style={{color: 'red', paddingLeft: 15, paddingTop: 15}}>
                            Font Size</Text>
                        <FontSlider/>
                    </Content>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    homeText: {
      fontWeight: 'bold',
      color: 'red'
    }
});

