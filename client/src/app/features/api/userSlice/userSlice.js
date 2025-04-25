import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` }), // Adjust base URL if necessary
  endpoints: (builder) => ({
    // Fetch all users
    getUsers: builder.query({
      query: () => "/users/",
    }),

    // Fetch user by ID
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),

    // Update user (protected)
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),

    // Delete user (protected)
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;

export default userApi;
