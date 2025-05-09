import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreatePostResponse, GetPostsQuery } from "./types";
import { REQUEST_METHODS } from "../../../constants/requestMethods";


export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000', 
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<any, GetPostsQuery>({
      query: (params) => ({
        url: '/blog',
        params,
      }),
    }),
    getPost: builder.query({
      query: (id) => `/blog/${id}`,
    }),
    createPost: builder.mutation<CreatePostResponse, any>({
      query: (postData) => ({
        url: '/blog',
        method: REQUEST_METHODS.post,
        body: postData,
      }),
    }),
    updatePost: builder.mutation({
      query: (postToUpdate) => ({
        url: '/blog',
        method: REQUEST_METHODS.patch,
        body: postToUpdate,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: REQUEST_METHODS.delete,
      }),
    }),
  }),
});

export const {
  useLazyGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = blogApi;