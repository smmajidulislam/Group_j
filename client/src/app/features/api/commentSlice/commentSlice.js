import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` }), // Adjust base URL if necessary
  endpoints: (builder) => ({
    // Fetch comments by post ID
    getCommentsByPost: builder.query({
      query: (postId) => `/comments/${postId}`,
    }),

    // Create a new comment (protected)
    createComment: builder.mutation({
      query: (commentData) => ({
        url: "/comments/",
        method: "POST",
        body: commentData,
      }),
    }),

    // Update a comment (protected)
    updateComment: builder.mutation({
      query: ({ id, commentData }) => ({
        url: `/comments/${id}`,
        method: "PUT",
        body: commentData,
      }),
    }),

    // Delete a comment (protected)
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCommentsByPostQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;

export default commentApi;
