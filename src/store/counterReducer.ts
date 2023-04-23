import { createSlice } from '@reduxjs/toolkit';

import { CounterState } from '@types';

const initialState: CounterState = {
  value: 0
};

export const counterSlice = createSlice({
  initialState,
  name: 'counter',
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
    increment: (state) => {
      state.value += 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { decrement, increment, incrementByAmount } = counterSlice.actions;
