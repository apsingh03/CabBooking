import { configureStore } from "@reduxjs/toolkit";
import UserAuthenticationSlice from "./Slices/UserAuthenticationSlice";

export const store = configureStore({
  reducer: {
    auth: UserAuthenticationSlice,
  },
});
