import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Id } from '@types';

export type SelectedFacilitiesMap = Record<Id, boolean>;

export interface Facilities {
  selectedMap: SelectedFacilitiesMap;
}

const initialState: Facilities = {
  selectedMap: {}
};

export const facilitiesSlice = createSlice({
  initialState,
  name: 'facilities',
  reducers: {
    selectFacility: (state, action: PayloadAction<Id>) => {
      state.selectedMap[action.payload] = !state.selectedMap[action.payload];
    }
  }
});

export const { selectFacility } = facilitiesSlice.actions;
