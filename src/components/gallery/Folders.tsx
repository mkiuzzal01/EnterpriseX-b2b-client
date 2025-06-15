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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Search } from "lucide-react";
import ReusableForm from "../../shared/ReusableFrom";
import TextInput from "../utils/input-fields/TextInput";
import image1 from "../../assets/mount-a-folder-as-a-drive.webp";
import type { FieldValue } from "react-hook-form";

type FolderItem = {
  id: string;
  title: string;
  image: typeof image1;
};

const initialFolders: FolderItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: (i + 1).toString(),
  title: `Folder ${i + 1}`,
  image: image1,
}));

const Folders = () => {
  const theme = useTheme();
  const [folders, setFolders] = useState<FolderItem[]>(initialFolders);
  const [search, setSearch] = useState("");

  const handleDelete = (id: string) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  };

  const handleCreate = (data: FieldValue<any>) => {
    console.log(data);
  };

  const filteredFolders = folders.filter((folder) =>
    folder.title.toLowerCase().includes(search.toLowerCase())
  );

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
      <Grid container spacing={2}>
        {filteredFolders.map((folder) => (
          <Grid
            size={{
              xs: 6,
              sm: 4,
              md: 3,
              lg: 2,
            }}
            key={folder.id}
          >
            <Box
              sx={{
                position: "relative",
                border: "1px solid",
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                transition: "border-color 0.3s",
              }}
            >
              <Box
                sx={{
                  aspectRatio: "1 / 1",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "grey.100",
                }}
              >
                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{ py: 1, fontWeight: 600 }}
                >
                  {folder.title}
                </Typography>
                <Box
                  component="img"
                  src={folder.image ?? (folder.image as unknown as string)}
                  alt={folder.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    flexGrow: 1,
                  }}
                />
              </Box>

              {/* Hover Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  opacity: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <IconButton size="medium">
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  size="medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(folder.id);
                  }}
                >
                  <DeleteIcon
                    titleAccess="Delete Folder"
                    sx={{
                      fontSize: 28,
                      color: theme.palette.error.main,
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Folders;
