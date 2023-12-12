// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import Cookies from 'js-cookie'
import { baseApi } from "./baseApi";

export const bulkNotificationApi = baseApi.injectEndpoints({
  reducerPath: "bulkNotification",
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
    postBulkNotification: builder.mutation({
      query: (data) => ({
        url: `/notifications`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostBulkNotificationMutation } = bulkNotificationApi;
