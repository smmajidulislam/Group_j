import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  comments: [],
  likes: 0,
  dislikes: 0,
  hasLiked: false,
  hasDisliked: false,
  editingPost: false, // New state for editing post
  editingCommentId: null, // New state for editing comment
  editCommentText: "", // New state for comment text
  editForm: {
    title: "",
    content: "",
    imageUrl: "",
  },
};

const publicPostSlice = createSlice({
  name: "publicPost",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
      state.likes = action.payload.likes || 0;
      state.dislikes = action.payload.dislikes || 0;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },
    updateCommentInState: (state, action) => {
      const { id, updatedComment } = action.payload;
      const index = state.comments.findIndex((c) => c._id === id);
      if (index !== -1) {
        state.comments[index] = updatedComment;
      }
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

    // New actions for editing post
    setEditingPost: (state, action) => {
      state.editingPost = action.payload;
    },
    setEditForm: (state, action) => {
      state.editForm = action.payload;
    },
    setEditingCommentId: (state, action) => {
      state.editingCommentId = action.payload;
    },
    setEditCommentText: (state, action) => {
      state.editCommentText = action.payload;
    },

    // Action to update a post in the state
    updatePostInState: (state, action) => {
      const { title, content, imageUrl } = action.payload;
      if (state.post) {
        state.post.title = title;
        state.post.content = content;
        state.post.imageUrl = imageUrl;
      }
    },
  },
});

export const {
  setPost,
  setComments,
  addComment,
  updateCommentInState,
  likePost,
  dislikePost,
  resetReactions,
  setEditingPost,
  setEditForm,
  setEditingCommentId,
  setEditCommentText,
  updatePostInState,
} = publicPostSlice.actions;

export default publicPostSlice.reducer;
