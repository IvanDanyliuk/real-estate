import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REQUEST_METHODS } from '../../../constants/requestMethods';
import { AUTH_ROUTES } from '../../../constants/apiRoutePaths';
import { RegisterDataType } from '../data-models';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    signUp: builder.mutation<RegisterDataType, Partial<RegisterDataType>>({
      query: (newUser) => ({
        url: `/auth${AUTH_ROUTES.register}`,
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

export const { useSignUpMutation, useLoginMutation } = authApi;