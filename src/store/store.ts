import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

import { RootState } from '@types';

import { api } from './api';
import { counterSlice } from './slices/counter';

const rootReducer: Reducer<RootState, AnyAction> = combineReducers({
  counter: counterSlice.reducer,
  [api.reducerPath]: api.reducer
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
