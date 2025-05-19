import { BsGraphUpArrow } from "react-icons/bs";
import { IoMdPerson, IoMdPersonAdd } from "react-icons/io";

export const NavLinks = [
  {
    name: "Overview",
    icon: <BsGraphUpArrow />,
    children: [{ name: "Activities", icon: <BsGraphUpArrow />, route: "/" }],
  },
  {
    name: "Profile",
    icon: <IoMdPerson />,
    children: [
      {
        name: "View Profile",
        icon: <IoMdPerson />,
        route: "/profile",
      },
    ],
  },
  {
    name: "Users",
    icon: <IoMdPersonAdd />,
    children: [
      {
        name: "Create users",
        icon: <IoMdPersonAdd />,
        route: "/create-user",
      },
    ],
  },
];
