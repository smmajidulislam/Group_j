"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const postApi = createApi({
  reducerPath: "postApi",

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

  tagTypes: ["Post"],

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (page) => `/posts?page=${page}`,
      providesTags: (result) =>
        result?.posts
          ? [
              ...result.posts.map((post) => ({
                type: "Post",
                id: post._id,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    getPostById: builder.query({
      query: (id) => `/posts/user/${id}`,
      providesTags: (result) =>
        result?.map
          ? [
              ...result.map((post) => ({
                type: "Post",
                id: post._id,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    postById: builder.query({
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
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Post", id },
        { type: "Post", id: "LIST" },
      ],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Post", id },
        { type: "Post", id: "LIST" },
      ],
    }),

    likePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Post", id },
        { type: "Post", id: "LIST" }, // ✅ এই লাইন গুরুত্বপূর্ণ
      ],
    }),

    dislikePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/dislike`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Post", id },
        { type: "Post", id: "LIST" }, // ✅ এই লাইন গুরুত্বপূর্ণ
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  usePostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
} = postApi;

export default postApi;
