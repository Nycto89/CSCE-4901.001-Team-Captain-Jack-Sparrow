const initialState = {
    index: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "CHANGE_INDEX":
            console.log(state.index);
            break;
    }
    return state;
}