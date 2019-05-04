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
                console.log("CHANGE THEME TO DARK");
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
                console.log("CHANGE THEME TO LIGHT");
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