import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: places.State = {
  searchHistory: [],
};

export const placeSlice = createSlice({
  name: "placeSlice",
  initialState,
  reducers: {
    addSearchHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = [action.payload].concat(state.searchHistory);
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
  },
});

export const { addSearchHistory, clearSearchHistory } = placeSlice.actions;
export const placeReducer = placeSlice.reducer;
