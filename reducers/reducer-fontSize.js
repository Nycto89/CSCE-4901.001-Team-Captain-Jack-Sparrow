const initialState = {
    fontVal: 30
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "FONT_SIZE_CHANGED":
            return {
                fontVal: action.payload
            };
            break;
    }
    return state;
}