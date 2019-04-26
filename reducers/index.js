import {combineReducers} from 'redux';
import fontReducer from './reducer-fontSize';
import themeReducer from './reducer-Theme';
import visitReducer from './reducer-first';

const allReducers = combineReducers({
   fontProps: fontReducer,
   themeProps: themeReducer,
   visitProps: visitReducer
});

export default allReducers;