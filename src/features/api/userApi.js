// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  reducerPath: "user",
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
  // tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users`,
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: ({ id }) => `/users/${id}`,
      providesTags: (result) =>
        result
          ? [
              { type: "User", id: result.data.id },
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: `/users/info`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "User" }] : [{ type: "User", id: "LIST" }],
    }),
    updateActiveStatus: builder.mutation({
      query: (data) => ({
        url: `/users/updateStatus/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "User" }] : [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateActiveStatusMutation,
} = userApi;
