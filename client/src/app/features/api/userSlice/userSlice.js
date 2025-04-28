"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define the userApi slice
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    prepareHeaders: (headers) => {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        try {
          const userData = JSON.parse(userCookie); // Parse cookie to get token
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
  tagTypes: ["User"], // Declare the tagTypes here
  endpoints: (builder) => ({
    // Fetch all users
    getUsers: builder.query({
      query: (page) => `/users?page=${page}&limit=${15}`,
      providesTags: (result) => {
        if (!result || !Array.isArray(result.users)) {
          // Handle cases where result is not an array or users data is missing
          return [{ type: "User", id: "LIST" }];
        }
        // Provide a tag for each user in the result
        return [
          { type: "User", id: "LIST" },
          ...result.users.map(({ _id }) => ({ type: "User", id: _id })),
        ];
      },
    }),

    // Fetch user by ID
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // Update user (protected)
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: userData,
      }),
      // Invalidates the cached list of users so it refetches after an update
      invalidatesTags: [
        { type: "User", id: "LIST" },
        { type: "User", id: "USER" },
      ],
    }),

    // Delete user (protected)
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      // Invalidates the cached list of users so it refetches after a deletion
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

// Exports for use in components
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;

export default userApi;
