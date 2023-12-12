// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";
import { baseApi } from "./baseApi";

export const pageApi = baseApi.injectEndpoints({
  reducerPath: "page",
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
  // tagTypes: ["Page"],
  endpoints: (builder) => ({
    getPages: builder.query({
      query: () => "/pages",
      providesTags: ["Page"],
    }),
    getPageId: builder.query({
      query: ({ id }) => `/pages/${id}`,
      providesTags: (result) =>
        result
          ? [
              { type: "Page", id: result.data.id },
              { type: "Page", id: "LIST" },
            ]
          : [{ type: "Page", id: "LIST" }],
    }),
    addPage: builder.mutation({
      query: (data) => ({
        url: `/pages`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Page" }] : [{ type: "Page", id: "LIST" }],
    }),
    updatePage: builder.mutation({
      query: (data) => ({
        url: `/pages/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Page" }] : [{ type: "Page", id: "LIST" }],
    }),
    deletePage: builder.mutation({
      query: (data) => ({
        url: `/pages/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Page" }] : [{ type: "Page", id: "LIST" }],
    }),
    managePage: builder.mutation({
      query: (data) => ({
        url: `/pages/manage`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) =>
        result
          ? [{ type: "Page" }, { type: "User" }]
          : [
              { type: "Page", id: "LIST" },
              { type: "User", id: "LIST" },
            ],
    }),
    updateActivePage: builder.mutation({
      query: (data) => ({
        url: `/pages/updateActive`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Page" }] : [{ type: "Page", id: "LIST" }],
    }),
    addtIcon: builder.mutation({
      query: (data) => ({
        url: `/icons`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: "Page", id: result.data.id },
              { type: "Page", id: "LIST" },
            ]
          : [{ type: "Page", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPagesQuery,
  useGetPageIdQuery,
  useAddPageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
  useManagePageMutation,
  useUpdateActivePageMutation,
  useAddtIconMutation,
} = pageApi;
