import {
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
  Reducer
} from '@reduxjs/toolkit';

import { CounterState, EventsState } from '@types';

import { counterSlice } from './counterReducer';
import { eventSlice } from './eventsReducer';
import { api } from './query';

export interface RootState {
  ongoings: CombinedState<{ counter: CounterState; events: EventsState }>;
  [api.reducerPath]: ReturnType<typeof api.reducer>;
}

const rootReducer: Reducer<RootState, AnyAction> = combineReducers({
  ongoings: combineReducers({ counter: counterSlice.reducer, events: eventSlice.reducer }),
  [api.reducerPath]: api.reducer
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
