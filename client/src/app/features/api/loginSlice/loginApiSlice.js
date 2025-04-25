import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery } = authApi;
export default authApi;
