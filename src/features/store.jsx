import { configureStore } from "@reduxjs/toolkit";
// SLICES
import { appSlice } from "./slice/appSlice";
// API
import { baseApi } from "./api/baseApi";
// import { authApi } from "./api/authApi";
// import { userApi } from "./api/userApi";
// import { pageApi } from "./api/pageApi";
// import { analyticsApi } from "./api/analyticsApi";
// import { bulkNotificationApi } from "./api/bulkNotificationApi";
// import { bulkUserApi } from "./api/bulkUser";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,

    // [authApi.reducerPath]: authApi.reducer,
    // [userApi.reducerPath]: userApi.reducer,
    // [pageApi.reducerPath]: pageApi.reducer,
    // [analyticsApi.reducerPath]: analyticsApi.reducer,
    // [bulkNotificationApi.reducerPath]: bulkNotificationApi.reducer,
    // [bulkUserApi.reducerPath]: bulkUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware
      // authApi.middleware,
      // userApi.middleware,
      // pageApi.middleware,
      // analyticsApi.middleware,
      // bulkNotificationApi.middleware
    ),
});
