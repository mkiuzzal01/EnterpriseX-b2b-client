import { useState } from "react";
import {
  Box,
  Paper,
  Grid,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Search } from "lucide-react";
import ReusableForm from "../../shared/ReusableFrom";
import TextInput from "../utils/input-fields/TextInput";
import image1 from "../../assets/mount-a-folder-as-a-drive.webp";
import type { FieldValue } from "react-hook-form";
import {
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useGetFoldersQuery,
  // useUpdateFolderMutation,
} from "../../redux/features/gallery/folder-api";
import { useToast } from "../utils/tost-alert/ToastProvider";
import Loader from "../../shared/Loader";
import Empty from "../../shared/Empty";

type FolderItem = {
  _id: string;
  name: string;
  image: typeof image1;
};

const Folders = () => {
  const [search, setSearch] = useState("");
  const {
    data: foldersData,
    isFetching,
    refetch,
  } = useGetFoldersQuery({ search: search || "" });
  const [createFolder, { isLoading }] = useCreateFolderMutation();
  const [deleteFolder, { isLoading: isDeleting }] = useDeleteFolderMutation();
  // const [updateFolder, { isLoading: isUpdating }] = useUpdateFolderMutation();
  const { showToast } = useToast();
  const theme = useTheme();

  console.log(foldersData);
  console.log(search);

  // Handle folder deletion:
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteFolder(id);
      if (res.data.success) {
        showToast({
          message: res.data?.message,
          duration: 2000,
          position: {
            horizontal: "right",
            vertical: "top",
          },
          type: "success",
        });
        refetch();
      }
    } catch {
      showToast({
        message: "Failed to delete folder",
        duration: 2000,
        position: {
          horizontal: "right",
          vertical: "top",
        },
        type: "error",
      });
    }
  };

  // Handle folder creation:
  const handleCreate = async (data: FieldValue<any>) => {
    try {
      const res = await createFolder({ name: data.folderName });
      if (res.data.success) {
        showToast({
          message: res?.data?.message,
          duration: 2000,
          position: {
            horizontal: "right",
            vertical: "top",
          },
          type: "success",
        });
        refetch();
      }
    } catch {
      showToast({
        message: "Failed to create folder",
        duration: 2000,
        position: {
          horizontal: "right",
          vertical: "top",
        },
        type: "error",
      });
    }
  };

  // Show loader while creating folder
  // if (isFetching) return <Loader />;

  return (
    <Paper sx={{ p: 2, marginY: 2 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Search */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <OutlinedInput
            fullWidth
            placeholder="Search folders"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <Search size={18} />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>

        {/* Create Folder Form */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <ReusableForm onSubmit={handleCreate}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 8, md: 10 }}>
                <TextInput
                  name="folderName"
                  label="Folder Name"
                  placeholder="Enter folder name"
                  required
                />
              </Grid>
              <Grid size={{ xs: 4, md: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </ReusableForm>
        </Grid>
      </Grid>

      <Box sx={{ my: 2, borderBottom: `1px solid ${theme.palette.divider}` }} />
      {/* Folder Grid */}
      {foldersData?.data?.result?.length ? (
        <Grid container spacing={2}>
          {foldersData.data.result.map((folder: FolderItem) => (
            <Grid size={{ xs: 6, sm: 6, md: 2 }} key={folder._id}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <img
                  src={image1}
                  alt={folder?.name}
                  style={{ width: "100%", height: "auto" }}
                />
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {folder.name}
                </Typography>
                <IconButton
                  onClick={() => handleDelete(folder._id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: theme.palette.error.main,
                  }}
                >
                  {isDeleting ? <Loader /> : <DeleteIcon />}
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Empty heading=" No folders found." refetch={refetch} />
      )}
    </Paper>
  );
};

export default Folders;
