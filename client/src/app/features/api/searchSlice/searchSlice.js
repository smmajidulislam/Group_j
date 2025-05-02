// services/postApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchSlice = createApi({
  reducerPath: "searchSlice",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` }),
  endpoints: (builder) => ({
    searchPosts: builder.query({
      query: (searchTerm) => ({
        url: `/posts/search?q=${searchTerm}`,
      }),
    }),
  }),
});

export const { useSearchPostsQuery } = searchSlice;
export default searchSlice;
