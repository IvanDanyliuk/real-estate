import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreatePropertyResponse, GetPropertiesQuery } from './types';
import { REQUEST_METHODS } from '../../../constants/requestMethods';


export const propertyApi = createApi({
  reducerPath: 'propertyApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000', 
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getProperties: builder.query<any, GetPropertiesQuery>({
      query: (params) => ({
        url: '/properties',
        params,
      }),
    }),
    getPropertyById: builder.query({
      query: (id) => `/properties/${id}`,
    }),
    getPopularProperties: builder.query({
      query: (params) => ({
        url: '/properties/popular',
        params,
      }),
    }),
    createProperty: builder.mutation<CreatePropertyResponse, FormData>({
      query: (newProperty) => ({
        url: '/properties',
        method: REQUEST_METHODS.post,
        body: newProperty,
      }),
    }),
    updateProperty: builder.mutation({
      query: (updatedProperty) => ({
        url: `/properties`,
        method: REQUEST_METHODS.patch,
        body: updatedProperty,
      }),
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: REQUEST_METHODS.delete,
      })
    }),
    getGeneralStats: builder.query({
      query: () => ({
        url: '/properties/stats/general'
      })
    }),
    getMonthlyPropertyStats: builder.query({
      query: (params) => ({
        url: '/properties/stats/monthly',
        params,
      })
    }),
    getPropertyStatsByRegion: builder.query({
      query: (params) => ({
        url: '/properties/stats/regions',
        params,
      })
    }),
    getMonthlyAveragePriceStats: builder.query({
      query: (params) => ({
        url: '/properties/stats/prices',
        params,
      })
    }),
  }),
});

export const { 
  useLazyGetPropertiesQuery, 
  useGetPropertyByIdQuery, 
  useGetPopularPropertiesQuery,
  useCreatePropertyMutation, 
  useUpdatePropertyMutation, 
  useDeletePropertyMutation, 
  useGetGeneralStatsQuery,
  useLazyGetMonthlyPropertyStatsQuery, 
  useLazyGetPropertyStatsByRegionQuery,
  useLazyGetMonthlyAveragePriceStatsQuery, 
} = propertyApi;