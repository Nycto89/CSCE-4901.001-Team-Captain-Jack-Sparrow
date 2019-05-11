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

//SET VISITED
export const setVisited = () => {
    return {
        type: "VISITED_ONCE"
    }
};

//GET CLINICS
export const getClinics = (loc = null) => {
    if(loc === null)
        return {
            type: "GET_CLINICS"
        }
    else
        return{
            type: "GET_CLINICS",
            loc: loc
        }
};