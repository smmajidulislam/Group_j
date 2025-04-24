import { configureStore } from "@reduxjs/toolkit";
import authApi from "../features/api/loginSlice/loginApiSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
