//Action Creators
//FONT SIZE
export const changeFontSize = (value) => {
    return {
        type: "FONT_SIZE_CHANGED",
        payload: value
    }
};

//SWITCH THEMES
export const switchThemes = () => {
    return {
        type: "SWITCH_THEME"
    }
};