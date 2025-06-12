import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const INITIAL_STATE: places.State = {
  searchHistory: [],
  suggestions: [],
  loading: false,
  error: undefined,
  places: [],
};

export const placeSlice = createSlice({
  name: "place",
  initialState: INITIAL_STATE,
  reducers: {
    // search history
    addSearchHistory: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (!query) return;

      // Remove existing query (if present)
      state.searchHistory = state.searchHistory.filter((q) => q !== query);
      state.searchHistory.unshift(query);

      // Limit to 10
      if (state.searchHistory.length > 10) {
        state.searchHistory = state.searchHistory.slice(0, 10);
      }
    },
    removeSearchHistory: (state, action: PayloadAction<number>) => {
      const indexToRemove = action.payload;
      if (indexToRemove >= 0 && indexToRemove < state.searchHistory.length) {
        state.searchHistory.splice(indexToRemove, 1);
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    // auto complete
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
    // search places
    startSearchPlace: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    searchPlaceSuccess: (state, action: PayloadAction<places.Place[]>) => {
      state.loading = false;
      state.places = action.payload;
      state.error = null;
    },
    searchPlaceError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
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
  startSearchPlace,
  searchPlaceSuccess,
  searchPlaceError,
} = placeSlice.actions;
export const placeReducer = placeSlice.reducer;

export type PlacesActions =
  | ReturnType<typeof startAutoComplete>
  | ReturnType<typeof autocompleteSuccess>
  | ReturnType<typeof autocompleteError>
  | ReturnType<typeof startSearchPlace>
  | ReturnType<typeof searchPlaceSuccess>
  | ReturnType<typeof searchPlaceError>;
