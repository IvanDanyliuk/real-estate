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
    refreshToken: builder.query({
      query: () => ({
        url: AUTH_ROUTES.refresh,
        method: REQUEST_METHODS.post,
      }),
    }),
  }),
});

export const { 
  useSignUpMutation, 
  useLoginMutation, 
  useRefreshTokenQuery 
} = authApi;