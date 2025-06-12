import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { placeReducer } from "./store/reducers/placeSlice";
import { combineEpics } from "redux-observable";
import { placesEpics } from "./epics/placesEpic";
import { createEpicMiddleware } from "redux-observable";

// Middleware
const epicMiddleware = createEpicMiddleware();
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

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
