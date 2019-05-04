import { Content, List, ListItem } from 'native-base';
import React from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class DrawerMenu extends React.Component {
    state = { isCollapsed: true };
    spinVal = new Animated.Value(0);
    spin() {
        this.spinVal.setValue(0);
        Animated.timing(
            this.spinVal,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.bezier(.66, 0, .17, 1.52),
                useNativeDriver: true
            }
        ).start();
    }

    toggleCollapse() {
        console.log('toggle');
        console.log('isCollapsed: ' + this.state.isCollapsed);
        this.spin();
        if (this.state.isCollapsed) this.setState({ isCollapsed: false });
        else this.setState({ isCollapsed: true });
        console.log('done toggling...');
    }

    componentDidMount() { Actions.refresh({ key: 'Drawer', ref: this.refs.navigation }); }

    render() {
        let spin;
        if (this.state.isCollapsed)
            spin = this.spinVal.interpolate({ inputRange: [0, 1], outputRange: ["360deg", "0deg"] });
        else
            spin = this.spinVal.interpolate({ inputRange: [0, 1], outputRange: ["45deg", "360deg"] });
        return (
            <View style={[styles.drawerStyle, { backgroundColor: this.props.themeProp.backgroundColor }]}>
                <Content style={{ width: "100%" }}>
                    <List style={{ width: "100%" }}>
                        <ListItem onPress={() => Actions.HomeScreen({ type: "reset" })}>
                            <Text style={[styles.homeText, { color: this.props.themeProp.accentColor }]}>Return to Home</Text>
                        </ListItem>
                        {/*<ListItem onPress={() => Actions.CalendarPage()}>
                                <Text style={{color: this.props.themeProp.textColor}}>Appointments</Text>
                            </ListItem>*/}
                        <ListItem onPress={() => Actions.ClinicFinder()}>
                            <Text style={{ color: this.props.themeProp.textColor }}>Find a Clinic</Text>
                        </ListItem>
                        <ListItem onPress={() => Actions.Nutrition()}>
                            <Text style={{ color: this.props.themeProp.textColor }}>Phosphorus Search</Text>
                        </ListItem>
                        <ListItem style={{ width: "100%", flexDirection: "column", alignItems: "center" }} onPress={() => Actions.ModalityMainScreen()}>
                            <View style={{ width: "100%", flexDirection: "row", alignSelf: "flex-start", alignItems: "center" }}>
                                <View>
                                    <Text style={{ color: this.props.themeProp.textColor }}>Modalities</Text>
                                </View>
                                <View style={{ width: "30%", marginRight: "30%" }}>
                                    <TouchableWithoutFeedback style={{ width: "100%" }} onPress={() => this.toggleCollapse()}>
                                        <View style={{ width: "100%", justifyContent: "flex-start", alignItems: "center" }}>
                                            <Animated.Text style={{
                                                fontSize: 17,
                                                color: this.props.themeProp.textColor,
                                                transform: [{ rotate: spin }]
                                            }}
                                            >
                                                +
                                                </Animated.Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <Collapsible collapsed={this.state.isCollapsed}>
                                <ListItem onPress={() => Actions.KidneyTransplant()}>
                                    <Text style={{ color: this.props.themeProp.textColor }}>   Kidney Transplant</Text>
                                </ListItem>
                                <ListItem onPress={() => Actions.PeritonealDialysis()}>
                                    <Text style={{ color: this.props.themeProp.textColor }}>   Peritoneal Dialysis</Text>
                                </ListItem>
                                <ListItem onPress={() => Actions.InCenterHemodialysis()}>
                                    <Text style={{ color: this.props.themeProp.textColor }}>   In-Center Hemodialysis</Text>
                                </ListItem>
                                <ListItem onPress={() => Actions.NocturnalDialysis()}>
                                    <Text style={{ color: this.props.themeProp.textColor }}>   Nocturnal Dialysis</Text>
                                </ListItem>
                                <ListItem onPress={() => Actions.HomeHemodialysis()}>
                                    <Text style={{ color: this.props.themeProp.textColor }}>   Home Hemodialysis</Text>
                                </ListItem>
                                <ListItem onPress={() => Actions.ConservativeTherapy()}>
                                    <Text style={{ color: this.props.themeProp.textColor }}>   Conservative Therapy</Text>
                                </ListItem>
                            </Collapsible>
                        </ListItem>
                        <ListItem onPress={() => Actions.SettingsLightbox()}>
                            <Text style={{ color: this.props.themeProp.textColor }}>Settings</Text>
                        </ListItem>
                        <ListItem onPress={() => Actions.Tutorial()}>
                            <Text style={{ color: this.props.themeProp.textColor }}>Tutorial</Text>
                        </ListItem>
                    </List>
                </Content>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    drawerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
        ...Platform.select({ ios: { top: 0, paddingTop: 64 }, android: { paddingTop: 20, paddingBottom: 30 } }),
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


