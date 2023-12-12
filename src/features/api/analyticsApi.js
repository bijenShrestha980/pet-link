// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";
import { baseApi } from "./baseApi";

export const analyticsApi = baseApi.injectEndpoints({
  reducerPath: "analytics",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `${import.meta.env.VITE_BASE_URL}/api/`,
  //   prepareHeaders: (headers) => {
  //     const token = Cookies.get("affix_token");
  //     // If we have a token set in state, let's assume that we should be passing it.
  //     if (token) {
  //       headers.set("authorization", `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
  // }),
  // tagTypes: ["Analytics"],
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => "/getAnalytics",
      providesTags: ["Analytics"],
    }),
    getAnalyticsById: builder.query({
      query: ({ id }) => `/getAnalyticsByUserId/${id}`,
      providesTags: (result) =>
        result
          ? [
              { type: "Analytic", id: result.data.id },
              { type: "Analytic", id: "LIST" },
            ]
          : [{ type: "Analytic", id: "LIST" }],
    }),
  }),
});

export const { useGetAnalyticsQuery, useGetAnalyticsByIdQuery } = analyticsApi;
