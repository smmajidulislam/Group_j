// app/features/userUI/userUISlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  deletionStatus: {},
  editMode: {},
  editData: {},
};

const userUISlice = createSlice({
  name: "userUI",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setDeletionStatus: (state, action) => {
      const { id, status } = action.payload;
      state.deletionStatus[id] = status;
    },
    setEditMode: (state, action) => {
      const { id, mode } = action.payload;
      state.editMode[id] = mode;
    },
    setEditData: (state, action) => {
      state.editData = { ...state.editData, ...action.payload };
    },
    resetEditData: (state) => {
      state.editData = {};
    },
  },
});

export const {
  setCurrentPage,
  setDeletionStatus,
  setEditMode,
  setEditData,
  resetEditData,
} = userUISlice.actions;

export default userUISlice.reducer;
