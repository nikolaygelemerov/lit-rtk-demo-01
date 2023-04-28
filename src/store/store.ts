import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

import { api } from './api';
import { facilitiesSlice } from './slices';
import { RootState } from './types';

const rootReducer: Reducer<RootState, AnyAction> = combineReducers({
  facilities: facilitiesSlice.reducer,
  [api.reducerPath]: api.reducer
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
