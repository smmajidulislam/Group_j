import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  currentPage: 1,
  editingPost: null,
  deleteLoading: false,
};

const postSliceee = createSlice({
  name: "postManagement",
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
    resetEditingPost: (state) => {
      state.editingPost = null;
    },
    setDeleteLoading: (state, action) => {
      state.deleteLoading = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePostInList: (state, action) => {
      const updatedPost = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    },
    deletePostFromList: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post._id !== postId);
    },
  },
});

export const {
  setCurrentPage,
  setPosts,
  setEditingPost,
  resetEditingPost,
  setDeleteLoading,
  addPost,
  updatePostInList,
  deletePostFromList,
} = postSliceee.actions;

export default postSliceee.reducer;
