import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Event, EventsState } from '@types';

import { decrement, increment } from './counterReducer';

const initialState: EventsState = { list: [], state: 'idle' };

export const add = createAsyncThunk('events/addEvent', async (payload: Event, { dispatch }) => {
  // eslint-disable-next-line compat/compat
  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 4000);
  });

  dispatch(increment());

  return payload;
});

export const remove = createAsyncThunk(
  'events/removeEvent',
  async (payload: Event, { dispatch }) => {
    // eslint-disable-next-line compat/compat
    await new Promise((resolve) => {
      setTimeout(() => resolve(null), 4000);
    });

    dispatch(decrement());

    return payload.id;
  }
);

export const eventSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(add.pending, (state) => {
      state.state = 'pending';
    });

    builder.addCase(add.fulfilled, (state, action) => {
      state.list.push(action.payload);
      state.state = 'fulfilled';
    });

    builder.addCase(remove.pending, (state) => {
      state.state = 'pending';
    });

    builder.addCase(remove.fulfilled, (state, action) => {
      const indexToRemove = state.list.findIndex((el) => el.id === action.payload);

      if (indexToRemove !== -1) {
        state.list.splice(indexToRemove, 1);
      }

      state.state = 'fulfilled';
    });
  },
  initialState,
  name: 'events',
  reducers: {}
});
