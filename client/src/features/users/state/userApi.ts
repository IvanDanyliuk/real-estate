import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_ROUTES, USER_ROUTES } from '../../../constants/apiRoutePaths';
import { REQUEST_METHODS } from '../../../constants/requestMethods';
import { GetUsersQuery } from './types';
import { url } from 'inspector';

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000',
  credentials: 'include',
});

const customBaseQuery: BaseQueryFn = async (args, api, options) => {
  let result = await baseQuery(args, api, options);

  if(result.error && result.error.status === 401) {
    if(!isRefreshing) {
      isRefreshing = true;
      refreshPromise = Promise.resolve(
        baseQuery({ 
          url: `/auth${AUTH_ROUTES.refresh}`, 
          method: REQUEST_METHODS.get 
        }, api, options)
      ).then((refreshResult) => {
        return refreshResult.data || null;
      }).finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }

    const newToken = await refreshPromise;

    if(newToken) {
      result = await baseQuery(args, api, options);
    }
  }

  return result;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `/user${USER_ROUTES.getUser}`,
        method: REQUEST_METHODS.get,
      }),
    }),
    getUsers: builder.query<any, GetUsersQuery>({
      query: (params) => ({
        url: '/user/all',
        params,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/user',
        method: REQUEST_METHODS.patch,
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: REQUEST_METHODS.delete,
      }),
    }),
  }),
});

export const { 
  useGetUserQuery, 
  useLazyGetUsersQuery, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} = userApi;