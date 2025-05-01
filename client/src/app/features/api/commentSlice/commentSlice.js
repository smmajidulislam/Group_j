"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    prepareHeaders: (headers) => {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        try {
          const userData = JSON.parse(userCookie);
          if (userData?.token) {
            headers.set("authorization", `Bearer ${userData.token}`);
          }
        } catch (error) {
          console.error("Error parsing user cookie:", error);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Comment"], // ✅ tagTypes added
  endpoints: (builder) => ({
    // ✅ Get comments for a post with providesTags
    getCommentsByPost: builder.query({
      query: (postId) => `/comments/${postId}`,
      providesTags: (result, error, postId) => [
        { type: "Comment", id: postId },
      ],
    }),

    // ✅ Create comment and invalidate that post's comments
    createComment: builder.mutation({
      query: (commentData) => ({
        url: "/comments/",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comment", id: postId },
      ],
    }),

    // ✅ Update comment and invalidate post comments
    updateComment: builder.mutation({
      query: ({ id, commentData }) => ({
        url: `/comments/${id}`,
        method: "PUT",
        body: commentData,
      }),
      invalidatesTags: (result, error, { commentData }) => [
        { type: "Comment", id: commentData?.postId },
      ],
    }),

    // ✅ Delete comment and invalidate post comments
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      // Assuming postId comes from `arg`
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comment", id: postId },
      ],
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
