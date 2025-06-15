import { useRef, useState, useCallback } from "react";
import {
  Box,
  Paper,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Fab,
  Drawer,
  DialogTitle,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { Search, AddPhotoAlternate } from "@mui/icons-material";
import { GridCloseIcon } from "@mui/x-data-grid";
import AddImage from "../utils/gallery/AddImage";
import AllImage from "../utils/gallery/AllImage";
import { useGetFoldersQuery } from "../../redux/features/gallery/folder-api";
import Loader from "../pages/Loader";
import type { TFolder } from "./TFolder";

type Props = {
  onClick?: (id: string) => void;
};

export default function Images({ onClick }: Props) {
  const [open, setOpen] = useState(false);
  const [folderId, setFolderId] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { data: foldersData, isFetching } = useGetFoldersQuery({});

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleDrawerClose = useCallback(() => setOpen(false), []);
  const handleFolderChange = (id: string) => setFolderId(id);

  if (isFetching) return <Loader />;

  return (
    <Paper sx={{ p: 3, my: 3 }}>
      <Grid container spacing={2} alignItems="center">
        {/* folder select */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Select
            value={folderId}
            onChange={(e) => handleFolderChange(e.target.value)}
            fullWidth
            displayEmpty
            MenuProps={{
              PaperProps: { sx: { zIndex: theme.zIndex.modal + 1 } },
            }}
          >
            <MenuItem value="">
              <em>Select folder</em>
            </MenuItem>
            {foldersData.data.map((folder: TFolder) => (
              <MenuItem key={folder._id} value={folder._id}>
                {folder.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* search */}
        <Grid size={{ xs: 10, md: 6 }}>
          <OutlinedInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            placeholder="Search images"
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>

        {/* add‑image fab */}
        <Grid size={{ xs: 2, md: 2 }}>
          <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
            <AddPhotoAlternate />
          </Fab>
        </Grid>
      </Grid>

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
          <IconButton onClick={handleDrawerClose}>
            <GridCloseIcon />
          </IconButton>
        </Box>

        <Select
          value={folderId}
          onChange={(e) => handleFolderChange(e.target.value)}
          fullWidth
          displayEmpty
          MenuProps={{
            container: drawerRef.current,
            disablePortal: true,
            PaperProps: {
              sx: { zIndex: theme.zIndex.modal + 10 },
            },
          }}
        >
          <MenuItem value="">
            <em>Select folder</em>
          </MenuItem>
          {foldersData.data.map((folder: TFolder) => (
            <MenuItem key={folder._id} value={folder._id}>
              {folder.name}
            </MenuItem>
          ))}
        </Select>

        <Box sx={{ mt: 3 }}>
          <AddImage />
        </Box>
      </Drawer>

      <Box sx={{ my: 3, borderBottom: `1px solid ${theme.palette.divider}` }} />

      <AllImage onClick={onClick} />
    </Paper>
  );
}
