import React, {Component} from 'react';
import {Animated, TouchableHighlight, Dimensions, 
Platform, StyleSheet, Text, 
View, Image, PanResponder } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Content, List, ListItem} from 'native-base';
import {connect} from 'react-redux';

class DrawerMenu extends React.Component {

    // componentDidMount() { Actions.refresh({key: 'Drawer', ref: this.refs.navigation}); }

    render() {

        return (
                <View style={[styles.drawerStyle, {backgroundColor: this.props.themeProp.backgroundColor}]}>
                    <Content>
                        <List>
                            <ListItem onPress={() => Actions.HomeScreen({type : "reset" })}>
                                <Text style={[styles.homeText, {color: this.props.themeProp.accentColor}]}>Return to Home</Text>
                            </ListItem>
                            {/*<ListItem onPress={() => Actions.CalendarPage()}>
                                <Text style={{color: this.props.themeProp.textColor}}>Appointments</Text>
                            </ListItem>*/}
                            <ListItem onPress={() => Actions.ClinicFinder()}>
                                <Text style={{color: this.props.themeProp.textColor}}>Find a clinic</Text>
                            </ListItem>
                            {/*<ListItem onPress={() => Actions.InfoPage()}>
                                <Text style={{color: this.props.themeProp.textColor}}>Kidney Information</Text>
                            </ListItem>*/}
                            <ListItem onPress={() => Actions.ModalityMainScreen()}>
                                <Text style={{color: this.props.themeProp.textColor}}>Modalities</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.KidneyTransplant()}>
                                <Text style={{color: this.props.themeProp.textColor}}>   Kidney Transplant</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.PeritonealDialysis()}>
                                <Text style={{color: this.props.themeProp.textColor}}>   Peritoneal Dialysis</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.InCenterHemodialysis()}> 
                                <Text style={{color: this.props.themeProp.textColor}}>   In-Center Hemodialysis</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.NocturnalDialysis()}>
                                <Text style={{color: this.props.themeProp.textColor}}>   Nocturnal Dialysis</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.HomeHemodialysis()}>
                                <Text style={{color: this.props.themeProp.textColor}}>   Home Hemodialysis</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.ConservativeTherapy()}>
                                <Text style={{color: this.props.themeProp.textColor}}>   Conservative Therapy</Text>
                            </ListItem>
                            <ListItem onPress={() => Actions.SettingsLightbox()}>
                                <Text style={{color: this.props.themeProp.textColor}}>Settings</Text>
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
        ...Platform.select({ ios: { top: 0, paddingTop: 64}, android: { top: 40, } }),
        },
    homeText: {
      fontWeight: 'bold'
    }
});

function mapStateToProps(state) {
    return {
    themeProp: state.themeProps
    };
  }

  export default connect(mapStateToProps)(DrawerMenu);


