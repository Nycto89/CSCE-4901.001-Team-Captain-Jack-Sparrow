const initialState = {
    dataError: false,
    clinicLst: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "LIST_READY":
            for (i = 0; i < state.clinicLst.length; ++i) {
                tmp = state.clinicLst[i];
            }

            newState = {
                clinicLst: action.payload,
                dataError: false
            }
            for (i = 0; i < newState.clinicLst.length; ++i) {
                tmp = newState.clinicLst[i];
            }
            return newState;
            break;

        case "DATA_ERROR":
            newState = {
                dataError: true,
                clinicLst: []
            }

            return newState;
            break;
    }//end switch(action.type)

    return state;
}