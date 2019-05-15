import { Platform, StatusBar } from 'react-native';

const initialState = {
    themeType: false,
    backgroundColor: 'white',
    borderColor: 'default',
    textColor: '#222222',
    sliderColor: 'black',
    accentColor: 'blue',
    circleColor: '#AACCFF',
}

export default function (state = initialState, action) {
    switch (action.type) {
        //case "SWITCH_THEME":
        case "SWITCH_THEME":
            if (state.themeType === false) {
                if(Platform.OS == 'ios') StatusBar.setBarStyle('light-content', true);
                return {
                    themeType: true,
                    backgroundColor: '#222222',
                    borderColor: '#111111',
                    textColor: 'white',
                    sliderColor: 'white',
                    accentColor: '#AACCFF',
                    circleColor: '#222222'
                }
            }
            else {
                if(Platform.OS == 'ios') StatusBar.setBarStyle('dark-content', true);
                return {
                    themeType: false,
                    backgroundColor: 'white',
                    bordercolor: 'default',
                    textColor: '#222222',
                    sliderColor: 'black',
                    accentColor: 'blue',
                    circleColor: '#AACCFF'
                }
            }
            break;
    }
    return state;
}