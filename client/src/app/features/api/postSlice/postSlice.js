import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` }),
  endpoints: (builder) => ({
    // Fetch all posts
    getPosts: builder.query({
      query: (page) => `/posts?page=${page}`,
    }),

    // Search posts
    searchPosts: builder.query({
      query: (searchTerm) => `/posts/search?query=${searchTerm}`,
    }),

    // Fetch posts by user ID
    getPostsByUser: builder.query({
      query: (userId) => `/posts/user/${userId}`,
    }),

    // Fetch post by ID
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
    }),

    // Create a new post (protected)
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
    }),

    // Update a post (protected)
    updatePost: builder.mutation({
      query: ({ id, postData }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: postData,
      }),
    }),

    // Delete a post (protected)
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
    }),

    // Like a post (protected)
    likePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "PUT",
      }),
    }),

    // Dislike a post (protected)
    dislikePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/dislike`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useSearchPostsQuery,
  useGetPostsByUserQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
} = postApi;

export default postApi;
