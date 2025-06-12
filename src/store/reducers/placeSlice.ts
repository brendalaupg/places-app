import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const INITIAL_STATE: places.State = {
  searchHistory: [],
  suggestions: [],
  loading: false,
  error: undefined,
};

export const placeSlice = createSlice({
  name: "place",
  initialState: INITIAL_STATE,
  reducers: {
    addSearchHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = [action.payload].concat(state.searchHistory);
    },
    removeSearchHistory: (state, action: PayloadAction<number>) => {
      const indexToRemove = action.payload;
      const history = state.searchHistory;
      state.searchHistory = [
        ...history.slice(0, indexToRemove),
        ...history.slice(indexToRemove + 1),
      ];
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    startAutoComplete: (
      state,
      action: PayloadAction<places.AutocompleteRequestPayload>
    ) => {
      state.loading = true;
      state.error = null;
    },
    autocompleteSuccess: (
      state,
      action: PayloadAction<places.AutocompleteResponse>
    ) => {
      state.loading = false;
      state.suggestions = action.payload.suggestions;
      state.error = null;
    },
    autocompleteError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAutocomplete: (state) => {
      state.suggestions = [];
    },
  },
});

export const {
  addSearchHistory,
  removeSearchHistory,
  clearSearchHistory,
  startAutoComplete,
  autocompleteSuccess,
  autocompleteError,
  clearAutocomplete,
} = placeSlice.actions;
export const placeReducer = placeSlice.reducer;

export type PlacesActions =
  | ReturnType<typeof startAutoComplete>
  | ReturnType<typeof autocompleteSuccess>
  | ReturnType<typeof autocompleteError>;
