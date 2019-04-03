import React, {Component} from 'react';
import {Animated, TouchableHighlight, Dimensions, 
Platform, StyleSheet, Text, 
View, Image, PanResponder } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Content, List, ListItem} from 'native-base';

export default class DrawerMenu extends React.Component {

    // componentDidMount() { Actions.refresh({key: 'Drawer', ref: this.refs.navigation}); }

    render() {

        return (
                <View style={styles.drawerStyle}>
                    <Content>
                        <List>
                            <ListItem onPress={() => Actions.HomeScreen({type : "reset" })}>
                                <Text style={styles.homeText}>Return to Home</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.CalendarPage()}>
                                <Text>Appointments</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.ClinicFinder()}>
                                <Text>Find a clinic</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.InfoPage()}>
                                <Text>Kidney Information</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.ModalityMainScreen()}>
                                <Text>Modalities</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.KidneyTransplant()}>
                                <Text>   Kidney Transplant</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.PeritonealDialysis()}>
                                <Text>   Peritoneal Dialysis</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.InCenterHemodialysis()}> 
                                <Text>   In-Center Hemodialysis</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.NocturnalDialysis()}>
                                <Text>   Overnight Dialysis</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.HomeHemodialysis()}>
                                <Text>   Home Hemodialysis</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.ConservativeTherapy()}>
                                <Text>   Conservative Therapy</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.SettingsLightbox()}>
                                <Text>Settings</Text>
                            </ListItem>
                        </List>
                    </Content>
                </View>
        )
    }

}

const styles = StyleSheet.create({
    drawerStyle : {
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        paddingLeft : 10,
        ...Platform.select({ ios: { top: 64, }, android: { top: 54, } }),
        },
    homeText: {
      fontWeight: 'bold',
      color: 'blue'
    }
});


