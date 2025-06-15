import { useRef, useState } from "react";
import {
  Box,
  DialogTitle,
  Drawer,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  useMediaQuery,
  IconButton,
  useTheme,
  Paper,
  Grid,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Search } from "@mui/icons-material";
import { GridCloseIcon } from "@mui/x-data-grid";
import AddImage from "../utils/gallery/AddImage";
import AllImage from "../utils/gallery/AllImage";

type PropsType = {
  onClick?: (id: string) => void;
};

const Images = ({ onClick }: PropsType) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const drawerRef = useRef<HTMLDivElement>(null);

  return (
    <Paper sx={{ p: 2, marginY: 2 }}>
      {/* Top Control Panel */}
      <Grid container spacing={2} alignItems="center">
        {/* Folder Selector */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
            displayEmpty
            MenuProps={{
              PaperProps: {
                sx: {
                  zIndex: theme.zIndex.modal + 1,
                },
              },
            }}
          >
            <MenuItem value="">Select Folder</MenuItem>
            <MenuItem value="folder_1">Folder 1</MenuItem>
            <MenuItem value="folder_2">Folder 2</MenuItem>
            <MenuItem value="folder_3">Folder 3</MenuItem>
          </Select>
        </Grid>

        {/* Search Input */}
        <Grid size={{ xs: 10, sm: 6 }}>
          <OutlinedInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            placeholder="Search"
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>

        {/* Add Image FAB */}
        <Grid size={{ xs: 2, sm: 2 }}>
          <IconButton
            onClick={() => setOpen(true)}
            aria-label="Add Image"
            size="large"
            color="primary"
            sx={{
              borderRadius: "50%",
              backgroundColor: theme.palette.grey[300],
            }}
          >
            <AddPhotoAlternateIcon fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>

      {/* Drawer for Image Upload */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        ref={drawerRef}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          "& .MuiDrawer-paper": {
            width: isSmallScreen ? "80%" : "30%",
            p: 2,
            zIndex: theme.zIndex.modal + 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <DialogTitle>Upload Image</DialogTitle>
          <IconButton onClick={() => setOpen(false)}>
            <GridCloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
            displayEmpty
            MenuProps={{
              container: drawerRef.current,
              disablePortal: true,
              PaperProps: {
                sx: {
                  zIndex: theme.zIndex.modal + 3,
                },
              },
            }}
          >
            <MenuItem value="">Select Folder</MenuItem>
            <MenuItem value="image_1">Image 1</MenuItem>
            <MenuItem value="image_2">Image 2</MenuItem>
            <MenuItem value="image_3">Image 3</MenuItem>
          </Select>

          <AddImage />
        </Box>
      </Drawer>

      <Box sx={{ my: 2, borderBottom: `1px solid ${theme.palette.divider}` }} />

      {/* Image Gallery */}
      <Box sx={{ mt: 4 }}>
        <AllImage onClick={onClick} />
      </Box>
    </Paper>
  );
};

export default Images;
