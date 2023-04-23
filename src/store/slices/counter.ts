import { createSlice } from '@reduxjs/toolkit';

import { CounterState } from '@types';

const initialState: CounterState = {
  value: 0
};

export const counterSlice = createSlice({
  initialState,
  name: 'counter',
  reducers: {
    decrementCounter: (state) => {
      state.value -= 1;
    },
    incrementCounter: (state) => {
      state.value += 1;
    }
  }
});

// Action creators are generated for each case reducer function
export const { decrementCounter, incrementCounter } = counterSlice.actions;
