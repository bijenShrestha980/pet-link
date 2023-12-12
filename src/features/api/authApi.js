// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  reducerPath: "auth",
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
  // tagTypes: [],
  endpoints: (builder) => ({
    loginAuth: builder.mutation({
      query: (auth) => ({
        url: `/login`,
        method: "POST",
        body: auth,
      }),
    }),
    signupAuth: builder.mutation({
      query: (auth) => ({
        url: `/register`,
        method: "POST",
        body: auth,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (auth) => ({
        url: `/password/forgot-password`,
        method: "POST",
        body: auth,
      }),
    }),
    resetPassword: builder.mutation({
      query: (auth) => ({
        url: `/password/reset`,
        method: "POST",
        body: auth,
      }),
    }),
    verify: builder.query({
      query: ({ id }) => `/users/verify/${id}`,
    }),
    changePassword: builder.mutation({
      query: (auth) => ({
        url: `/password/change`,
        method: "POST",
        body: auth,
      }),
    }),
    setPin: builder.mutation({
      query: (auth) => ({
        url: `/users/set_pin`,
        method: "POST",
        body: auth,
      }),
    }),
  }),
});

export const {
  useLoginAuthMutation,
  useSignupAuthMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyQuery,
  useChangePasswordMutation,
  useSetPinMutation,
} = authApi;
