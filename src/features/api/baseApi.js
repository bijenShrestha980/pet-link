// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("affix_token");
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Page", "Analytics", "Analytic", "User"],
  endpoints: () => ({}),
});
