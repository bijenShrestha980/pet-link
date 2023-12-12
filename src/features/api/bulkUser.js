// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import Cookies from 'js-cookie'
import { baseApi } from "./baseApi";

export const bulkUserApi = baseApi.injectEndpoints({
  reducerPath: "bulkUser",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `${import.meta.env.VITE_BASE_URL}/api/`,
  //   prepareHeaders: (headers) => {
  //     const token = Cookies.get('affix_token')
  //     // If we have a token set in state, let's assume that we should be passing it.
  //     if (token) {
  //       headers.set('authorization', `Bearer ${token}`)
  //     }
  //     return headers
  //   },
  // }),
  endpoints: (builder) => ({
    postBulkUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
    }),
    postBulkUserByCsv: builder.mutation({
      query: (data) => ({
        url: `/users/bulk`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostBulkUserMutation, usePostBulkUserByCsvMutation } =
  bulkUserApi;
