"use client";
import { useState } from "react";
import { ModalClose } from "@mui/joy";
import {
  Box,
  Card,
  DialogTitle,
  Drawer,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Fab,
  useMediaQuery,
  IconButton,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Search } from "@mui/icons-material";
import AddImage from "../utils/gallery/AddImage";
import AllImage from "../utils/gallery/AllImage";

type PropsType = {
  onClick?: (id: string) => void;
};

const Images = ({ onClick }: PropsType) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ padding: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
          borderBottom: "1px solid #ccc",
          pb: 2,
        }}
      >
        <Select value={filter} sx={{ minWidth: 150 }} displayEmpty>
          <MenuItem value="">Select Folder</MenuItem>
          <MenuItem value={10}>Folder_1</MenuItem>
          <MenuItem value={20}>Folder_2</MenuItem>
          <MenuItem value={30}>Folder_3</MenuItem>
        </Select>
        <OutlinedInput
          type="text"
          placeholder="Search"
          sx={{ flexGrow: 1, minWidth: 200 }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
        <Fab
          sx={{ zIndex: 0 }}
          title="Add image"
          color="primary"
          aria-label="add"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* Drawer for Image Selection */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": { width: isSmallScreen ? "80%" : "30%", p: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DialogTitle>Upload Image</DialogTitle>
          <ModalClose onClick={() => setOpen(false)} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ width: "100%" }}
            displayEmpty
          >
            <MenuItem value="">Select Folder</MenuItem>
            <MenuItem value="image_1">Image_1</MenuItem>
            <MenuItem value="image_2">Image_2</MenuItem>
            <MenuItem value="image_3">Image_3</MenuItem>
          </Select>

          <AddImage />
        </Box>
      </Drawer>
      <Box sx={{ mt: 2 }}>
        <AllImage onClick={onClick} />
      </Box>
    </Card>
  );
};

export default Images;
