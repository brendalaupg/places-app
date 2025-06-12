import { createSelector } from "@reduxjs/toolkit";
import rootStore, { RootState } from "../../root";

const state = (state: RootState) => state.place;

const searchHistory = createSelector(state, (state) => state.searchHistory);

const suggestions = createSelector(state, (state) => state.suggestions);

const loading = createSelector(state, (state) => state.loading);

const places = createSelector(state, (state) => state.places);

export const PlaceSelectors = {
  suggestions,
  searchHistory,
  loading,
  places,
};
