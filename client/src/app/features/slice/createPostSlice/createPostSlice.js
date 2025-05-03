import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openPostModal: false,
  image: "",
  previewImage: "",
  isLoading: false,
  isSuccessImage: false,
  isErrorImage: false,
  errorImage: null,
};

const postSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    setOpenPostModal: (state, action) => {
      state.openPostModal = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },

    setPreviewImage: (state, action) => {
      state.previewImage = action.payload;
    },
    resetPostData: (state) => {
      state.image = "";
      state.previewImage = "";
      state.openPostModal = false;
      state.isLoading = false;
      state.isSuccessImage = false;
      state.isErrorImage = false;
      state.errorImage = null;
      state.preImage = null;
    },
    setImageLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setImageUploadStatus: (state, action) => {
      state.isSuccessImage = action.payload.isSuccess;
      state.isErrorImage = action.payload.isError;
      state.errorImage = action.payload.error;
    },
  },
});

export const {
  setOpenPostModal,
  setImage,
  setPreviewImage,
  resetPostData,
  setImageLoading,
  setImageUploadStatus,
} = postSlice.actions;

export default postSlice.reducer;
