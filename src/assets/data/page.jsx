import {
  PageBioLinkIcon,
  PageBookIcon,
  PageFilesIcon,
  PageIframeIcon,
  PageImageIcon,
  PageLinkIcon,
  PageMenuIcon,
  PageUserIcon,
  PageVideoIcon,
} from "../../utils/icons";

const page = [
  {
    id: 1,
    icon: (
      <PageUserIcon
        className="mb-[12px] custom-transition group-hover:scale-105"
        color="#262626"
      />
    ),
    title: "profile",
    path: "profile",
    permission: 25,
  },
  {
    id: 2,
    icon: (
      <PageBioLinkIcon
        className="mb-[12px] custom-transition group-hover:scale-105"
        color="#262626"
      />
    ),
    title: "bio link",
    path: "bio-link",
    permission: 25,
  },
  {
    id: 3,
    icon: (
      <PageImageIcon
        className="mb-[12px] custom-transition group-hover:scale-105"
        color="#262626"
      />
    ),
    title: "image",
    path: "image",
    permission: 25,
  },
  {
    id: 4,
    icon: (
      <PageVideoIcon
        className="mb-[12px] custom-transition group-hover:scale-105"
        color="#262626"
      />
    ),
    title: "video",
    path: "video",
    permission: 25,
  },
  {
    id: 5,
    icon: (
      <PageBookIcon
        className="mb-[12px] custom-transition group-hover:scale-105"
        color="#262626"
      />
    ),
    title: "books",
    path: "books",
    permission: 25,
  },
  {
    id: 6,
    icon: (
      <PageFilesIcon
        className="mb-[12px] custom-transition group-hover:scale-105"
        color="#262626"
      />
    ),
    title: "file",
    path: "file",
    permission: 25,
  },
  {
    id: 7,
    icon: (
      <PageLinkIcon
        className="mb-[12px] custom-transition group-hover:scale-105"
        color="#262626"
      />
    ),
    title: "link",
    path: "links",
    permission: 25,
  },
  {
    id: 8,
    icon: (
      <PageIframeIcon
        className="mb-[12px] custom-transition group-hover:scale-105"
        color="#262626"
      />
    ),
    title: "iFrame",
    path: "iframe",
    permission: 25,
  },
  {
    id: 9,
    icon: (
      <PageMenuIcon
        className="mb-[12px] custom-transition group-hover:scale-105"
        color="#262626"
      />
    ),
    title: "menus",
    path: "menus",
    permission: 25,
  },
];

export { page };
