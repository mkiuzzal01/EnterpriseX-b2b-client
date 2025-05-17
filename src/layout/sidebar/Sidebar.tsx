import { BsGraphUpArrow } from "react-icons/bs";
import MenuItems from "../../components/utils/MenuItems";
import {IoMdPerson } from "react-icons/io";

const Sidebar = () => {
  const navLinks = [
    {
      name: "Overview",
      route: "/",
      icon: <BsGraphUpArrow />,
    },
    {
      name: "Profile",
      route: "/profile",
      icon: <IoMdPerson />,
    },
  ];
  return (
    <nav className="p-4">
      <ul className="space-y-2">
        <li>
          {navLinks.map((link) => (
            <MenuItems name={link.name} route={link.route} icon={link.icon} />
          ))}
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
