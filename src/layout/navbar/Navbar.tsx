import { IoMdNotificationsOutline, IoMdPerson } from "react-icons/io";
import MenuItems from "../../components/utils/MenuItems";

const Navbar = () => {
  const navLinks = [
    {
      name: "Notifications",
      route: "/notifications",
      icon: <IoMdNotificationsOutline size={20} />,
    },
    {
      name: "Profile",
      route: "/profile",
      icon: <IoMdPerson size={20} />,
    },
  ];
  return (
    <nav className="bg-[#213448] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-white text-2xl font-bold">
            Enterprise<span className="text-yellow-400">X</span>
          </h1>
        </div>
        <div className="flex">
          {navLinks.map((link) => (
            <MenuItems key={link.name} route={link.route} icon={link.icon} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
