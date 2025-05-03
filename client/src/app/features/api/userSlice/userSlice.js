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
  tagTypes: ["User"],

  endpoints: (builder) => ({
    // ✅ Get all users
    getUsers: builder.query({
      query: (page) => `/users?page=${page}&limit=15`,
      providesTags: (result) => {
        if (!result || !Array.isArray(result.users)) {
          return [{ type: "User", id: "LIST" }];
        }
        return [
          { type: "User", id: "LIST" },
          ...result.users.map(({ _id }) => ({ type: "User", id: _id })),
        ];
      },
    }),

    // ✅ Get single user
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // ✅ Update user
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id: "LIST" },
        { type: "User", id },
      ],
    }),

    // ✅ Delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    // ✅ Suspend / Unsuspend user
    suspendUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/suspend`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id: "LIST" },
        { type: "User", id },
      ],
    }),
  }),
});

// ✅ Export hooks for use in components
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSuspendUserMutation,
} = userApi;

export default userApi;
