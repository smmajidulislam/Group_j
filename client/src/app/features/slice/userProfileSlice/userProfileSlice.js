import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  previewProfileImage: "",
  uploadedImageUrl: "", // <-- new state added
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setPreviewProfileImage: (state, action) => {
      state.previewProfileImage = action.payload;
    },
    setUploadedImageUrl: (state, action) => {
      state.uploadedImageUrl = action.payload;
    },
    resetUserProfileState: (state) => {
      state.isModalOpen = false;
      state.previewProfileImage = "";
      state.uploadedImageUrl = ""; // <-- clear on reset
    },
  },
});

export const {
  setModalOpen,
  setPreviewProfileImage,
  setUploadedImageUrl,
  resetUserProfileState,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
