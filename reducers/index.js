import {combineReducers} from 'redux';
import fontReducer from './reducer-fontSize';
import themeReducer from './reducer-Theme';
import visitReducer from './reducer-first';
import clinicDataReducer from './reducer-clinicData';

const allReducers = combineReducers({
   fontProps: fontReducer,
   themeProps: themeReducer,
   visitProps: visitReducer,
   clinicDataProps: clinicDataReducer
});

export default allReducers;