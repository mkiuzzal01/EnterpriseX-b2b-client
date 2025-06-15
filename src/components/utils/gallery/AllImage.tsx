import { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  useTheme,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import image1 from "../../../assets/user-image.jpg"; // ✅ adjust path

type PropsType = {
  onClick?: (id: string) => void;
};

const images = Array.from({ length: 6 }, (_, idx) => ({
  id: (idx + 1).toString(),
  title: `Demo Image ${idx + 1}`,
  image: image1,
}));

const AllImage = ({ onClick }: PropsType) => {
  const theme = useTheme();

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageList, setImageList] = useState(images);

  const toggleSelect = (id: string) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]
    );
    onClick?.(id);
  };

  const handleDelete = (id: string) => {
    setImageList((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <Grid container spacing={2} sx={{ pt: 2 }}>
      {imageList.map((image) => {
        const isSelected = selectedImages.includes(image.id);

        return (
          <Grid
            size={{
              xs: 6,
              sm: 4,
              md: 3,
              lg: 2,
            }}
            key={image.id}
            onClick={() => toggleSelect(image.id)}
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
                  src={image.image ?? (image.image as unknown as string)}
                  alt={image.title}
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
                      handleDelete(image.id);
                    }}
                  >
                    <DeleteIcon sx={{ color: theme.palette.error.light }} />
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
                  title={image.title}
                >
                  {image.title}
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
