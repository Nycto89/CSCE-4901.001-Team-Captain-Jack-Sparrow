import {combineReducers} from 'redux';
import fontReducer from './reducer-fontSize';

const allReducers = combineReducers({
   fontProps: fontReducer
});

export default allReducers;