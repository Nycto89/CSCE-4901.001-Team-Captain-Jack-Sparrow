const initialState = {
    id: "idle"
}

export default function(state = initialState, action) {
    switch(action.type)
    {
        case "ACCORDION":
            console.log("ID =" + state.id);
            break;
    }
    return state;
}