import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
  }),
});

setupListeners(store.dispatch);
export default store;