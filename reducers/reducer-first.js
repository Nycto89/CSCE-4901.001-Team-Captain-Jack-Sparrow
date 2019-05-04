const initialState = {
    visited: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "VISITED_ONCE":
            console.log("Visited Once ");
            return {
                ...state,
                visited: true
            };
            break;
        default:
            return state;
    }
}