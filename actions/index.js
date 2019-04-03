//Action Creator
export const changeFontSize = (value) => {
    return {
        type: "FONT_SIZE_CHANGED",
        payload: value
    }
};