const initialState = {
    themeType: false,
    backgroundColor: 'white',
    textColor: '#222222',
    sliderColor: 'black',
    accentColor: 'blue'
}

export default function(state = initialState, action) {
    switch(action.type)
    {
        case "SWITCH_THEME":
            if (state.themeType === false)
            {
                console.log("CHANGE THEME TO DARK");
                return {
                    themeType: true,
                    backgroundColor: '#222222',
                    textColor: 'white',
                    sliderColor: 'white',
                    accentColor: '#AACCFF'
                }
            }
            else {
                console.log("CHANGE THEME TO LIGHT");
                return {
                    themeType: false,
                    backgroundColor: 'white',
                    textColor: '#222222',
                    sliderColor: 'black',
                    accentColor: 'blue'
                }
            }
            break;
    }
    return state;
}