import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_ROUTES } from '../../../constants/apiRoutePaths';
import { REQUEST_METHODS } from '../../../constants/requestMethods';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000', 
    credentials: 'include', 
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `/user${USER_ROUTES.getUser}`,
        method: REQUEST_METHODS.get,
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;