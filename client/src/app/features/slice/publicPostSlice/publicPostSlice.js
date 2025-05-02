import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  comments: [],
  likes: 0,
  dislikes: 0,
  hasLiked: false,
  hasDisliked: false,
};

const postSlice = createSlice({
  name: "publicPost",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
      state.likes = action.payload.likes || 0;
      state.dislikes = action.payload.dislikes || 0;
    },
    likePost: (state) => {
      if (!state.hasLiked) {
        state.likes += 1;
        if (state.hasDisliked) {
          state.dislikes = Math.max(0, state.dislikes - 1);
          state.hasDisliked = false;
        }
        state.hasLiked = true;
      }
    },
    dislikePost: (state) => {
      if (!state.hasDisliked) {
        state.dislikes += 1;
        if (state.hasLiked) {
          state.likes = Math.max(0, state.likes - 1);
          state.hasLiked = false;
        }
        state.hasDisliked = true;
      }
    },
    resetReactions: (state) => {
      state.hasLiked = false;
      state.hasDisliked = false;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const {
  setPost,
  likePost,
  dislikePost,
  resetReactions,
  addComment,
  setComments,
} = postSlice.actions;

export default postSlice.reducer;
