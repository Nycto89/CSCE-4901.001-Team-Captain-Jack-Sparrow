const initialState = {
    dataError: false,
    clinicLst: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "LIST_READY":
            console.log('action.payload: ' + action.payload);
            console.log('printing strt storeState clinicLst...')
            for (i = 0; i < state.clinicLst.length; ++i) {
                tmp = state.clinicLst[i];
                console.log(JSON.stringify(tmp));
            }

            newState = {
                clinicLst: action.payload,
                dataError: false
            }
            console.log('printing end storeState clinicLst...')
            for (i = 0; i < newState.clinicLst.length; ++i) {
                tmp = newState.clinicLst[i];
                console.log(JSON.stringify(tmp));
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