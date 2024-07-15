import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rtkQueryLogger } from '../middleware';
import storage from 'redux-persist/lib/storage';

//api
// import { authApi } from '~/services/auth/auth.services';

//slice api
// import authSlice from '~/services/auth/auth.slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'history']
};

const rootReducer = combineReducers({
//   [authApi.reducerPath]: authApi.reducer,
//   auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(
    //   authApi.middleware,
      rtkQueryLogger
    ),
  devTools: import.meta.env.MODE !== 'production'
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default { store, persistor };