import { useState } from "react";
import {
  Box,
  Paper,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Fab,
  useTheme,
  Grid,
} from "@mui/material";
import { Search, AddPhotoAlternate } from "@mui/icons-material";
import AllImage from "../utils/gallery/AllImage";
import { useGetFoldersQuery } from "../../redux/features/gallery/folder-api";
import Loader from "../../shared/Loader";
import type { TFolder } from "./TGallery";
import SideDrawer from "../utils/gallery/SideDrawer";
import { useGetImagesQuery } from "../../redux/features/gallery/image-api";

type Props = {
  onClick?: (id: string) => void;
};

export default function Images({ onClick }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { data: foldersData, isFetching } = useGetFoldersQuery({});
  const [folderId, setFolderId] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const {
    data: imagesData,
    isLoading,
    refetch,
  } = useGetImagesQuery({
    folderId: folderId || "",
    search: search || "",
  });
  const theme = useTheme();
  const handleFolderChange = (id: string) => setFolderId(id);

  //show loader:
  if (isFetching || isLoading) return <Loader />;

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
            {foldersData.data?.result?.map((folder: TFolder) => (
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

      {/* side drawer for uploading images */}
      <SideDrawer
        open={open}
        refetch={refetch}
        onClose={() => {
          setOpen(false);
          return true;
        }}
      />

      <Box sx={{ my: 3, borderBottom: `1px solid ${theme.palette.divider}` }} />

      {/* load all image  from database  */}
      <AllImage
        refetch={refetch}
        onClick={onClick}
        imagesData={imagesData?.data?.result}
      />
    </Paper>
  );
}
