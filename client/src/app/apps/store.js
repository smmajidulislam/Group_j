import { configureStore } from "@reduxjs/toolkit";
import authApi from "../features/api/loginSlice/loginApiSlice";
import commentApi from "../features/api/commentSlice/commentSlice";
import postApi from "../features/api/postSlice/postSlice";
import userApi from "../features/api/userSlice/userSlice";
import registerSlice from "../features/Slice/loginSlice/loginSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    registerUser: registerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(commentApi.middleware)
      .concat(postApi.middleware)
      .concat(userApi.middleware),
});

export default store;
