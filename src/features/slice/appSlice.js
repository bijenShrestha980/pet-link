import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: {
      affix_token: Cookies.get("affix_token"),
      affix_projectId: Cookies.get("affix_projectId"),
      affix_projectName: Cookies.get("affix_projectName"),
      affix_userId: Cookies.get("affix_userId"),
    },
    super_admin: false,
  },
  reducers: {
    clearState: (state) => {
      return {
        ...state,
      };
    },
    login: (state, { payload }) => {
      Cookies.set("affix_token", payload.token, {
        expires: parseInt(payload.expires),
        path: "",
      });
      Cookies.set("affix_projectId", payload.project_id, {
        expires: parseInt(payload.expires),
        path: "",
      });
      Cookies.set("affix_projectName", payload.project_name, {
        expires: parseInt(payload.expires),
        path: "",
      });
      Cookies.set("affix_userId", payload.user_id, {
        expires: parseInt(payload.expires),
        path: "",
      });

      //  set login state
      state.token.affix_token = payload.token;
      state.token.affix_projectId = payload.project_id;
      state.token.affix_projectName = payload.project_name;
      state.token.affix_userId = payload.user_id;
    },
    logout: (state) => {
      Cookies.remove("affix_token");
      Cookies.remove("affix_projectId");
      Cookies.remove("affix_projectName");
      Cookies.remove("affix_userId");

      state.token.affix_token = null;
      state.token.affix_projectId = null;
      state.token.affix_projectName = null;
      state.token.affix_userId = null;
    },
    setRoles: (state, { payload }) => {
      payload === true
        ? (state.super_admin = true)
        : (state.super_admin = false);
    },
  },
});

export const { clearState, login, logout, setRoles } = appSlice.actions;
export const appSelector = (state) => state.app;
