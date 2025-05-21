import {
  FaArrowTrendUp,
  FaList,
  FaPaypal,
  FaPerson,
  FaPlus,
  FaProductHunt,
  FaStore,
  FaUserGroup,
} from "react-icons/fa6";
import { FaUsersCog } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { MdFeedback } from "react-icons/md";
import { MdOutlineBorderColor } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { RiGalleryFill } from "react-icons/ri";
import { FaFolderOpen } from "react-icons/fa";

export const NavLinks = [
  {
    name: "Overview",
    icon: <FaArrowTrendUp />,
    children: [{ name: "Activities", icon: <FaArrowTrendUp />, route: "/" }],
  },
  {
    name: "Profile",
    icon: <FaPerson />,
    children: [
      {
        name: "View Profile",
        icon: <FaPerson />,
        route: "/profile",
      },
    ],
  },
  {
    name: "Users",
    icon: <FaUsersCog />,
    children: [
      {
        name: "Create users",
        icon: <FaPerson />,
        route: "/create-user",
      },
      {
        name: "All users",
        icon: <FaUserGroup />,
        route: "/all-users",
      },
    ],
  },
  {
    name: "Stroke ",
    icon: <FaStore />,
    children: [
      {
        name: "All Product",
        icon: <FaProductHunt />,
        route: "/all-product",
      },
    ],
  },
  {
    name: "Product",
    icon: <FaProductHunt />,
    children: [
      {
        name: "Add Product",
        icon: <FaPlus />,
        route: "/create-product",
      },
      {
        name: "All products",
        icon: <FaList />,
        route: "/all-product",
      },
      {
        name: "Add variant",
        icon: <FaPlus />,
        route: "/create-variant",
      },
      {
        name: "All Variant",
        icon: <FaList />,
        route: "/all-variant",
      },
      {
        name: "Add category",
        icon: <FaPlus />,
        route: "/create-category",
      },
      {
        name: "All category",
        icon: <FaList />,
        route: "/all-category",
      },
    ],
  },
  {
    name: "Order",
    icon: <MdOutlineBorderColor />,
    children: [
      {
        name: "Add order",
        icon: <FaPlus />,
        route: "/create-order",
      },
      {
        name: "All order",
        icon: <FaList />,
        route: "/all-order",
      },
      {
        name: "Seller Pay",
        icon: <FaPaypal />,
        route: "/seller-pay",
      },
    ],
  },
  {
    name: "Notice",
    icon: <IoIosNotifications />,
    children: [
      {
        name: "Add notice",
        icon: <FaPlus />,
        route: "/create-notice",
      },
      {
        name: "All notice",
        icon: <FaList />,
        route: "/all-notice",
      },
    ],
  },
  {
    name: "Requisition",
    icon: <BsChatSquareQuoteFill />,
    children: [
      {
        name: "Add requisition",
        icon: <FaPlus />,
        route: "/add-requisition",
      },
      {
        name: "All requisition",
        icon: <FaList />,
        route: "/all-requisition",
      },
    ],
  },
  {
    name: "Feedback",
    icon: <MdFeedback />,
    children: [
      {
        name: "Add Feedback",
        icon: <FaPlus />,
        route: "/add-feedback",
      },
      {
        name: "All feedback",
        icon: <FaList />,
        route: "/all-feedback",
      },
    ],
  },
  {
    name: "Gallery",
    icon: <GrGallery />,
    children: [
      {
        name: "All Photo",
        icon: <RiGalleryFill />,
        route: "/All-Photo",
      },
      {
        name: "All feedback",
        icon: <FaFolderOpen />,
        route: "/all-folder",
      },
    ],
  },
];
