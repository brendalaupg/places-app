import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { placeReducer, PlacesActions } from "./store/reducers/placeSlice";
import { combineEpics } from "redux-observable";
import { placesEpics } from "./epics/placesEpic";
import { createEpicMiddleware } from "redux-observable";

export interface RootState {
  place: ReturnType<typeof placeReducer>;
}

// Middleware
const epicMiddleware = createEpicMiddleware<
  PlacesActions,
  PlacesActions,
  RootState
>();
const rootEpic = combineEpics(...placesEpics);

// Root store
const rootStore = configureStore({
  reducer: {
    place: placeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export default rootStore;

export type AppDispatch = typeof rootStore.dispatch;
