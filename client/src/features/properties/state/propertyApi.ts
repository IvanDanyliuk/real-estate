import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { PropertyDataType } from "../../admin/data-models";
import { CreatePropertyResponse } from "./types";
import { REQUEST_METHODS } from "../../../constants/requestMethods";


export const propertyApi = createApi({
  reducerPath: 'propertyApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000', 
    credentials: 'include' 
  }),
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => '/properties',
    }),
    getPropertyById: builder.query({
      query: (id) => `/properties/${id}`,
    }),
    createProperty: builder.mutation<CreatePropertyResponse, FormData>({
      query: (newProperty) => ({
        url: '/properties',
        method: REQUEST_METHODS.post,
        body: newProperty,
      }),
    }),
    updateProperty: builder.mutation({
      query: ({ updatedProperty, id }) => ({
        url: `/properties/${id}`,
        method: REQUEST_METHODS.patch,
        body: updatedProperty,
      }),
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: REQUEST_METHODS.delete,
      })
    })
  }),
});

export const { 
  useGetPropertiesQuery, 
  useGetPropertyByIdQuery, 
  useCreatePropertyMutation, 
  useUpdatePropertyMutation, 
  useDeletePropertyMutation 
} = propertyApi;