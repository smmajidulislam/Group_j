import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  deletionStatus: {},
  editMode: {},
  editData: {},
};

const userSlice = createSlice({
  name: "userMangement",
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
      const { id, value } = action.payload;
      state.editMode[id] = value;
    },
    setEditData: (state, action) => {
      state.editData = action.payload;
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
} = userSlice.actions;

export default userSlice.reducer;
