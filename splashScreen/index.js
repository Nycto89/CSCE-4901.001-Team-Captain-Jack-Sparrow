import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, ImageBackground, Text, View, Image, Button} from 'react-native';

class SplashScreen extends Component {

    onPressLearnMore()
    {
    
    }

    render() {
        return (
            <View>
                <View>

                        <ImageBackground style={styles.container} source = {require('../images/testc.jpg')}>
                            <View>
                            <Text style={{textAlign: 'center'}}>BUTTON</Text>
                            </View>
                        </ImageBackground>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: 100,
        flex: 0.5,
        position: "absolute",
        justifyContent: 'space-evenly',
        alignItems: 'center'
        },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonTXT: {
        padding: 20,
        color: 'white'
    }
  });

export default SplashScreen;