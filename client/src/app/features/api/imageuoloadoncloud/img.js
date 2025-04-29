import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image`,
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (img) => ({
        url: "/upload",
        method: "POST",
        body: img,
      }),
    }),
  }),
});

// Log the environment variable to check if it's loaded correctly

export const { useUploadImageMutation } = imageApi;

export default imageApi;
