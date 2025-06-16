import { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  useTheme,
  Typography,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { TImage } from "../../gallery/TGallery";
import { useDeleteImageMutation } from "../../../redux/features/gallery/image-api";
import { useToast } from "../tost-alert/ToastProvider";

type PropsType = {
  onClick?: (id: string) => void;
  refetch?: () => void;
  imagesData: TImage[];
};

const AllImage = ({ onClick, imagesData, refetch }: PropsType) => {
  const theme = useTheme();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { showToast } = useToast();
  const [deleteImage, { isLoading: isDeleting }] = useDeleteImageMutation();

  const toggleSelect = (id: string) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]
    );
    onClick?.(id);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteImage(id);
      if (res.data.success) {
        showToast({
          message: res.data.message || "Image deleted successfully!",
          type: "success",
          duration: 3000,
          position: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }
      refetch?.();
    } catch {
      showToast({
        message: "Image deletion failed!",
        type: "error",
        duration: 3000,
        position: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

  return (
    <Grid container spacing={2} sx={{ pt: 2 }}>
      {imagesData?.map((item) => {
        const isSelected = selectedImages.includes(item._id);

        return (
          <Grid
            size={{
              xs: 6,
              sm: 4,
              md: 3,
              lg: 2,
            }}
            key={item._id}
            onClick={() => toggleSelect(item._id)}
            sx={{ cursor: "pointer" }}
          >
            <Paper
              elevation={isSelected ? 4 : 1}
              sx={{
                position: "relative",
                border: "2px solid",
                borderColor: isSelected
                  ? theme.palette.primary.main
                  : "divider",
                borderRadius: 2,
                overflow: "hidden",
                transition: "0.3s",
              }}
            >
              {/* Image */}
              <Box sx={{ aspectRatio: "1 / 1", overflow: "hidden" }}>
                <img
                  src={item?.photo?.url}
                  alt={item?.photoName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Overlay on hover */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <IconButton size="large">
                  <CheckCircleIcon
                    sx={{
                      fontSize: 30,
                      color: isSelected ? theme.palette.success.main : "#fff",
                    }}
                  />
                </IconButton>

                {!onClick && (
                  <IconButton
                    size="large"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item._id);
                    }}
                  >
                    {isDeleting ? (
                      <CircularProgress size={24} />
                    ) : (
                      <DeleteIcon sx={{ color: theme.palette.error.light }} />
                    )}
                  </IconButton>
                )}
              </Box>

              {/* Optional title overlay */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  bgcolor: "rgba(0,0,0,0.6)",
                  px: 1,
                  py: 0.5,
                }}
              >
                <Typography
                  variant="caption"
                  color="white"
                  noWrap
                  title={item.photoName}
                >
                  {item.photoName}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AllImage;
