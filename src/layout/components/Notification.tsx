import { IconButton, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notification = () => {
  return (
    <Tooltip title="Notifications">
      <IconButton aria-label="notifications">
        <NotificationsIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Notification;
