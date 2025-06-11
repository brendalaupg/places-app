import { configureStore } from "@reduxjs/toolkit";
import { placeReducer } from "./store/reducers/placeSlice";

export const rootStore = configureStore({
  reducer: {
    place: placeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;
