import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {UserReducer} from './reducers/UserReducer';
import {firebaseDataRedux} from './reducers/MainReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const rootReducer = combineReducers({UserReducer,firebaseDataRedux});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['UserReducer'],
};


const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
let persistor = persistStore(store);

export {store, persistor};
