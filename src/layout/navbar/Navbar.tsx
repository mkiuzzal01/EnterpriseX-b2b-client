import {
  IoMdClose,
  IoMdLogOut,
  IoMdMenu,
  IoMdNotificationsOutline,
  IoMdPerson,
} from "react-icons/io";
import MenuItems from "../../components/utils/MenuItems";
import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
type NavbarProps = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
};
const Navbar = ({ setSidebarOpen, isSidebarOpen }: NavbarProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navLinks = [
    {
      name: "Notifications",
      route: "/notifications",
      icon: <IoMdNotificationsOutline size={20} />,
    },
  ];

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="bg-[#213448] p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <h1 className="text-white text-2xl font-bold">
            Enterprise<span className="text-yellow-400">X</span>
          </h1>
        </div>

        {/* Navigation Icons & User Menu */}
        <div className="flex items-center space-x-4">
          {navLinks.map((link) => (
            <MenuItems
              key={link.name}
              route={link.route}
              icon={link.icon}
              name=""
            />
          ))}

          {/* User Icon with Menu */}
          <Button
            sx={{
              minWidth: "0",
              padding: "0",
              color: "white",
              "&:hover": {
                color: "#fbbf24",
              },
            }}
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <IoMdPerson size={22} />
          </Button>

          {/* Dropdown menu for profile/logout */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link
                to="/profile"
                className="flex items-center space-x-2 hover:text-[#274963] transition"
              >
                <IoMdPerson size={18} className="text-gray-600" />
                <span>Profile</span>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to="/logout"
                className="flex items-center space-x-2 hover:text-[#c0392b] transition"
              >
                <IoMdLogOut size={18} className="text-gray-600" />
                <Link to={"/login"}>Logout</Link>
              </Link>
            </MenuItem>
          </Menu>
          <div className="block lg:hidden">
            <Button onClick={() => setSidebarOpen((prev) => !prev)}>
              {isSidebarOpen ? (
                <IoMdClose size={22} className="text-white" />
              ) : (
                <IoMdMenu size={22} className="text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
