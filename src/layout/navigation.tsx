import {
  FaArrowTrendUp,
  FaList,
  FaPaypal,
  FaPerson,
  FaPlus,
  FaUserGroup,
  FaFolderOpen,
} from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { MdFeedback } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";
import type { Navigation } from "@toolpad/core/AppProvider";

export const navigation: Navigation = [
  {
    title: "overview",
    icon: <FaArrowTrendUp />,
    children: [{ segment: "dashboard", icon: <FaArrowTrendUp /> }],
  },

  {
    title: "profile",
    icon: <FaPerson />,
    children: [{ segment: "profile", icon: <FaPerson /> }],
  },
  {
    title: "users",
    icon: <FaUserGroup />,
    children: [
      { segment: "create-user", icon: <FaPlus /> },
      { segment: "all-users", icon: <FaUserGroup /> },
    ],
  },
  {
    title: "products",
    icon: <FaList />,
    children: [
      { segment: "create-product", icon: <FaPlus /> },
      { segment: "all-product", icon: <FaList /> },
      { segment: "create-variant", icon: <FaPlus /> },
      { segment: "all-variant", icon: <FaList /> },
      { segment: "create-category", icon: <FaPlus /> },
      { segment: "all-category", icon: <FaList /> },
    ],
  },
  {
    title: "orders",
    icon: <FaPaypal />,
    children: [
      { segment: "create-order", icon: <FaPlus /> },
      { segment: "all-order", icon: <FaList /> },
      { segment: "seller-pay", icon: <FaPaypal /> },
    ],
  },
  {
    title: "notices",
    icon: <IoIosNotifications />,
    children: [
      { segment: "create-notice", icon: <FaPlus /> },
      { segment: "notifications", icon: <IoIosNotifications /> },
    ],
  },
  {
    title: "requisitions",
    icon: <BsChatSquareQuoteFill />,
    children: [
      { segment: "create-requisition", icon: <FaPlus /> },
      { segment: "all-requisition", icon: <BsChatSquareQuoteFill /> },
    ],
  },
  {
    title: "feedback",
    icon: <MdFeedback />,
    children: [
      { segment: "create-feedback", icon: <FaPlus /> },
      { segment: "all-feedback", icon: <MdFeedback /> },
    ],
  },
  {
    title: "gallery",
    icon: <RiGalleryFill />,
    children: [
      { segment: "images", icon: <RiGalleryFill /> },
      { segment: "folders", icon: <FaFolderOpen /> },
    ],
  },
];
