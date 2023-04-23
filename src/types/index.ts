import { api } from '../store/api';

export type Count = number;

export interface CounterState {
  value: Count;
}

export interface RootState {
  counter: CounterState;
  [api.reducerPath]: ReturnType<typeof api.reducer>;
}

export interface Post {
  body: string;
  id: string;
  title: string;
  userId: string;
}
