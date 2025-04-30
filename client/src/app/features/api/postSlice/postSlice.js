"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define the API
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`, // Base URL for API
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
  tagTypes: ["Post"], // Tag types for invalidating cache
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (page) => `/posts?page=${page}`,
      providesTags: (result, error, page) =>
        result ? [{ type: "Post", id: "ALL" }] : [], // Use "ALL" to invalidate all posts
    }),

    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result) =>
        result ? [{ type: "Post", id: result._id }] : [],
    }),

    createPost: builder.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Post"], // Invalidate all posts after creating a post
    }),

    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Post", id }, // Invalidating specific post cache
        { type: "Post", id: "ALL" }, // Invalidate all posts cache to refetch
      ],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    likePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),

    dislikePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/dislike`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
} = postApi;

export default postApi;
