import { combineReducers } from 'redux';
import clinicDataReducer from './reducer-clinicData';
import visitReducer from './reducer-first';
import fontReducer from './reducer-fontSize';
import themeReducer from './reducer-Theme';

const allReducers = combineReducers({
   fontProps: fontReducer,
   themeProps: themeReducer,
   visitProps: visitReducer,
   clinicDataProps: clinicDataReducer
});

export default allReducers;