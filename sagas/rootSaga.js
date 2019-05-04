//this file serves as entry point for all sagas...

//define each saga either as a separate listener generator funcstions within this file
//or in separate files then import them to this file (ex in this file: watchRequestClincs)

import { all } from 'redux-saga/effects';
import watchRequestClinics from './clinicDataSaga';

//the single entry-point saga to be started in configureStore.js
export default function* rootSaga() {
    yield all([watchRequestClinics()]);
}