import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REQUEST_METHODS } from '../../../constants/requestMethods';
import { AUTH_ROUTES } from '../../../constants/apiRoutePaths';
import { LoginDataType, RegisterDataType } from '../data-models';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000', 
    credentials: 'include', 
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<RegisterDataType, FormData>({
      query: (newUser) => ({
        url: `/auth${AUTH_ROUTES.register}`,
        method: REQUEST_METHODS.post,
        body: newUser,
      }),
    }),
    login: builder.mutation<LoginDataType, FormData>({
      query: (credentials) => ({
        url: `/auth${AUTH_ROUTES.login}`,
        method: REQUEST_METHODS.post,
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/auth${AUTH_ROUTES.logout}`,
        method: REQUEST_METHODS.post,
      }),
    }),
    refreshToken: builder.query({
      query: () => ({
        url: `/auth${AUTH_ROUTES.refresh}`,
        method: REQUEST_METHODS.post,
      }),
    }),
  }),
});

export const { 
  useSignUpMutation, 
  useLoginMutation, 
  useLogoutMutation,
  useRefreshTokenQuery 
} = authApi;