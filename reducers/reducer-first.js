const initialState = {
    visited: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "VISITED_ONCE":
            return {
                ...state,
                visited: true
            };
            break;
        default:
            return state;
    }
}