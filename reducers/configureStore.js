
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import allReducers from './index';

const persistConfig = {
    key: 'root',
    storage,
    // blacklist: ['navigation'] // navigation will not be persisted
  }

  const persistedReducer = persistReducer(persistConfig, allReducers);

//   export default () => {
//     let store = createStore(persistedReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
//   }

  export const store = createStore(persistedReducer);
  export const persistor = persistStore(store);