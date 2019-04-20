import {combineReducers} from 'redux';
import fontReducer from './reducer-fontSize';
import themeReducer from './reducer-Theme';

const allReducers = combineReducers({
   fontProps: fontReducer,
   themeProps: themeReducer
});

export default allReducers;