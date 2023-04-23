import { api } from '../store/query';

export type Count = number;

export interface CounterState {
  value: Count;
}

export interface Event {
  content: string;
  date: number;
  id: string | number;
  name: string;
}

export type EventsState = {
  list: Event[];
  state?: 'idle' | 'fulfilled' | 'rejected' | 'pending';
};

export interface CustomStore {
  [api.reducerPath]?: ReturnType<typeof api.reducer>;
  ongoings: { counter: CounterState; events: EventsState };
}

export enum CounterActionType {
  DECREMENT = 'DECREMENT',
  INCREMENT = 'INCREMENT'
}

export enum EventsActionType {
  ADD = 'ADD',
  REMOVE = 'REMOVE'
}

export interface Post {
  content?: string;
  id: string;
  name: string;
}
