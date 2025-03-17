import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REQUEST_METHODS } from '../../constants/requestMethods';
import { AUTH_ROUTES } from '../../constants/apiRoutePaths';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (newUser) => ({
        url: AUTH_ROUTES.register,
        method: REQUEST_METHODS.post,
        body: newUser,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: AUTH_ROUTES.login,
        method: REQUEST_METHODS.post,
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;