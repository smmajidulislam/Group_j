import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  posts: [],
  editingPost: null,
  editTitle: "",
  editContent: "",
  deleteLoading: false,
};

const postUIStateSlice = createSlice({
  name: "postUIState",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setEditingPost: (state, action) => {
      state.editingPost = action.payload;
    },
    setEditTitle: (state, action) => {
      state.editTitle = action.payload;
    },
    setEditContent: (state, action) => {
      state.editContent = action.payload;
    },
    setDeleteLoading: (state, action) => {
      state.deleteLoading = action.payload;
    },
    resetEditFields: (state) => {
      state.editingPost = null;
      state.editTitle = "";
      state.editContent = "";
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

export const {
  setCurrentPage,
  setPosts,
  setEditingPost,
  setEditTitle,
  setEditContent,
  setDeleteLoading,
  resetEditFields,
  removePost,
} = postUIStateSlice.actions;

export default postUIStateSlice.reducer;
