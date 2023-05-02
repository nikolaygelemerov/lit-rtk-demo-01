import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Id } from '@types';

export type FacilitiesSelected = Record<Id, boolean>;

export interface Facilities {
  selected: FacilitiesSelected;
}

const initialState: Facilities = {
  selected: {}
};

export const facilitiesSlice = createSlice({
  initialState,
  name: 'facilities',
  reducers: {
    selectFacility: (state, action: PayloadAction<Id>) => {
      state.selected[action.payload] = !state.selected[action.payload];
    }
  }
});

export const { selectFacility } = facilitiesSlice.actions;
