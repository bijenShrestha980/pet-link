import { lazy } from "react";
import Forgot_password from "./pages/auth/forgot_password/forgot_password";
import Login from "./pages/auth/login/login";
import Reset_password from "./pages/auth/reset_password/reset_password";
import Signup from "./pages/auth/signup/signup";

const Comming_soon = lazy(() => import("./pages/comming_soon/comming_soon"));
const Account = lazy(() => import("./pages/dashboard/account/account"));
const Home = lazy(() => import("./pages/dashboard/home"));
const Bio_link = lazy(
  () => import("./pages/dashboard/my_page/bio_link/bio_link")
);
const EditBio_link = lazy(
  () => import("./pages/dashboard/my_page/bio_link/editBio_link")
);
const My_page = lazy(() => import("./pages/dashboard/my_page/my_page"));
const Settings = lazy(() => import("./pages/dashboard/settings/settings"));
const User = lazy(() => import("./pages/dashboard/users/user"));
const Users = lazy(() => import("./pages/dashboard/users/users"));

import {
  AnnouncementIcon,
  PageIcon,
  PageUsersIcon,
  SidebarMenuIcon,
  UserIcon,
} from "./utils/icons";

export const routes = [
  {
    layout: "dashboard",
    sidebar: true,
    pages: [
      {
        icon: <SidebarMenuIcon className={`icon`} color="#262626" />,
        iconActive: <SidebarMenuIcon className={`icon`} color="#FFFFFF" />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        sidebar: true,
        permission: 25,
      },
      {
        icon: <PageIcon className={`icon`} color="#262626" />,
        iconActive: <PageIcon className={`icon`} color="#FFFFFF" />,
        name: "my link",
        path: "/my_link",
        element: <My_page />,
        sidebar: true,
        permission: 25,
      },
      {
        icon: <PageUsersIcon className={`icon`} color="#262626" />,
        iconActive: <PageUsersIcon className={`icon`} color="#FFFFFF" />,
        name: "users",
        path: "/users",
        element: <Users />,
        sidebar: true,
        permission: 25,
      },
      {
        icon: <UserIcon className={`icon`} color="#262626" />,
        iconActive: <UserIcon className={`icon`} color="#FFFFFF" />,
        name: "account",
        path: "/account",
        element: <Account />,
        sidebar: true,
        permission: 25,
      },
      {
        icon: <AnnouncementIcon className={`icon`} color="#262626" />,
        iconActive: <AnnouncementIcon className={`icon`} color="#FFFFFF" />,
        name: "announcement",
        path: "/announcement",
        element: <Comming_soon title={"Announcement"} />,
        sidebar: true,
        permission: 25,
      },
      {
        icon: <></>,
        iconActive: <></>,
        name: "settings",
        path: "/settings",
        element: <Settings />,
        sidebar: false,
        permission: 25,
      },
      {
        icon: <></>,
        iconActive: <></>,
        name: "users",
        path: "/users/:id",
        element: <User />,
        sidebar: false,
        permission: 25,
      },

      {
        icon: <></>,
        iconActive: <></>,
        name: "pet link",
        path: "/my_link/pet-link",
        element: <Bio_link />,
        sidebar: false,
        permission: 25,
      },
      {
        icon: <></>,
        iconActive: <></>,
        name: "edit pet Link",
        path: "/my_link/pet-link/:id",
        element: <EditBio_link />,
        sidebar: false,
        permission: 25,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    sidebar: false,
    pages: [
      {
        icon: <></>,
        name: "Login",
        path: "/login",
        element: <Login />,
        sidebar: false,
      },
      {
        icon: <></>,
        name: "Sign Up",
        path: "/signup",
        element: <Signup />,
        sidebar: false,
      },
      {
        icon: <></>,
        name: "Forgot Password",
        path: "/forgot_password",
        element: <Forgot_password />,
        sidebar: false,
      },
      {
        icon: <></>,
        name: "Reset_password",
        path: "/password/:id",
        element: <Reset_password />,
        sidebar: false,
      },
    ],
  },
];
