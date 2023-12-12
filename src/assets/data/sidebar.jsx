import {
  AnnouncementIcon,
  PageIcon,
  PageUsersIcon,
  SidebarMenuIcon,
  UserIcon,
} from "../../utils/icons";

const sidebar = [
  {
    id: 1,
    icon: (
      <SidebarMenuIcon
        className={`h-5 w-5 md:mr-2 md:ml-2 transition-all ease-in-out duration-300 group-hover:scale-110`}
        color="#262626"
      />
    ),
    iconActive: (
      <SidebarMenuIcon
        className={`h-5 w-5 md:mr-2 md:ml-2 transition-all ease-in-out duration-300 group-hover:scale-110`}
        color="#FFFFFF"
      />
    ),
    title: "dashboard",
    path: "/dashboard",
    permission: 25,
  },
  {
    id: 2,
    icon: (
      <PageIcon
        className={`h-5 w-5 md:mr-2 md:ml-2 transition-all ease-in-out duration-300 group-hover:scale-110`}
        color="#262626"
      />
    ),
    iconActive: (
      <PageIcon
        className={`h-5 w-5 md:mr-2 md:ml-2 transition-all ease-in-out duration-300 group-hover:scale-110`}
        color="#FFFFFF"
      />
    ),
    title: "my page",
    path: "/dashboard/my_page",
    permission: 25,
  },
  {
    id: 3,
    icon: (
      <PageUsersIcon
        className={`h-5 w-5 md:mr-2 md:ml-2 transition-all ease-in-out duration-300 group-hover:scale-110`}
        color="#262626"
      />
    ),
    iconActive: (
      <PageUsersIcon
        className={`h-5 w-5 md:mr-2 md:ml-2 transition-all ease-in-out duration-300 group-hover:scale-110`}
        color="#FFFFFF"
      />
    ),
    title: "users",
    path: "/dashboard/users",
    permission: 25,
  },
  {
    id: 4,
    icon: (
      <UserIcon
        className={`h-5 w-5 md:mr-2 md:ml-2 transition-all ease-in-out duration-300 group-hover:scale-110`}
        color="#262626"
      />
    ),
    iconActive: (
      <UserIcon
        className={`h-5 w-5 md:mr-2 md:ml-2 transition-all ease-in-out duration-300 group-hover:scale-110`}
        color="#FFFFFF"
      />
    ),
    title: "account",
    path: "/dashboard/account",
    permission: 25,
  },
  {
    id: 5,
    icon: (
      <AnnouncementIcon
        className={`h-5 w-5 md:mr-2 md:ml-2 transition-all ease-in-out duration-300 group-hover:scale-110`}
        color="#262626"
      />
    ),
    iconActive: (
      <AnnouncementIcon
        className={`h-5 w-5 md:mr-2 md:ml-2 transition-all ease-in-out duration-300 group-hover:scale-110`}
        color="#FFFFFF"
      />
    ),
    title: "announcement",
    path: "/dashboard/announcement",
    permission: 25,
  },
];

export { sidebar };
