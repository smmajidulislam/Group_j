import { configureStore } from "@reduxjs/toolkit";
import authApi from "../features/api/loginSlice/loginApiSlice";
import commentApi from "../features/api/commentSlice/commentSlice";
import postApi from "../features/api/postSlice/postSlice";
import userApi from "../features/api/userSlice/userSlice";
import imageApi from "../features/api/imageuoloadoncloud/img";
import postUIStateSlice from "@/app/features/slice/postUiState/postUiStateSlice";
import userUIReducer from "@/app/features/slice/userUiSlice/userUiSlice";
import postSlice from "@/app/features/slice/createPostSlice/createPostSlice";
import userProfileSlice from "@/app/features/slice/userProfileSlice/userProfileSlice";
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    postUIState: postUIStateSlice,
    userUI: userUIReducer,
    createPost: postSlice,
    userProfile: userProfileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(commentApi.middleware)
      .concat(postApi.middleware)
      .concat(userApi.middleware)
      .concat(imageApi.middleware),
});

export default store;
