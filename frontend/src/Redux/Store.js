import { configureStore } from "@reduxjs/toolkit";
import UserAuthenticationSlice from "./Slices/UserAuthenticationSlice";
import DriverAuthenticationSlice from "./Slices/DriverAuthenticationSlice";

export const store = configureStore({
  reducer: {
    userAuth: UserAuthenticationSlice,
    driverAuth: DriverAuthenticationSlice,
  },
});
