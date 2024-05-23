import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import authReducer from './reducers/authSlice';
import userReducer from './reducers/userSlice';
import loadingReducer from './reducers/loadingSlice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedReducer,
  user: userReducer,
  loading: loadingReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
export const persistor = persistStore(store);
