import {
  Drawer,
  DialogTitle,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import AddImage from "./AddImage";
import { useCallback, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => boolean;
  refetch?: () => void;
};

export default function SideDrawer({ open, onClose, refetch }: Props) {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerRef = useRef<HTMLDivElement>(null);
  const handleDrawerClose = useCallback(() => onClose(), [onClose]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleDrawerClose}
      ref={drawerRef}
      sx={{
        zIndex: theme.zIndex.drawer + 5,
        "& .MuiDrawer-paper": {
          width: isSmDown ? "80%" : "30%",
          p: 2,
          zIndex: theme.zIndex.modal + 5,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <DialogTitle>Upload Image</DialogTitle>
        <IconButton
          sx={{ color: theme.palette.grey[600] }}
          aria-label="close"
          size="large"
          edge="end"
          onClick={handleDrawerClose}
        >
          <GridCloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ mt: 3 }}>
        <AddImage onClose={onClose} refetch={refetch} />
      </Box>
    </Drawer>
  );
}
