
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import allReducers from './index';



const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['clinicDataProps'] // clinicDataProps will not be persisted
}

const persistedReducer = persistReducer(persistConfig, allReducers);

//   export default () => {
//     let store = createStore(persistedReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
//   }

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);