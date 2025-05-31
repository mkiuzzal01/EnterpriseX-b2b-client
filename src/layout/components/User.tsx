import React, { useState } from "react";
import type { MouseEvent } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { useToast } from "../../components/utils/tost-alert/ToastProvider";

const User: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    showToast({
      message: "You are logout successfully!.",
      type: "warning",
      duration: 2000,
      position: {
        vertical: "top",
        horizontal: "right",
      },
    });

    dispatch(logout());
  };

  const user = {
    name: "John Doe",
    email: "demo@gmail.com",
    avatarUrl: "https://avatars.githubusercontent.com/u/19550456",
  };

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        size="small"
        aria-controls={anchorEl ? "user-menu" : undefined}
        aria-haspopup="true"
        sx={{ ml: 1 }}
      >
        <Avatar
          src={user.avatarUrl}
          alt={user.name}
          sx={{ width: 32, height: 32 }}
        />
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: 200,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Typography sx={{ px: 2, pt: 1, fontWeight: "bold" }}>
          {user.name}
        </Typography>
        <Typography
          sx={{ px: 2, pb: 1, color: "text.secondary", fontSize: 13 }}
        >
          {user.email}
        </Typography>
        <Divider />
        <MenuItem onClick={() => handleNavigate("/profile")}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default User;
