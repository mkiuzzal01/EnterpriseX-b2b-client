import { useState } from "react";
import image1 from "../../../assets/user-image.jpg";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type PropsType = {
  onClick?: (id: string) => void;
};

const images = Array?.from({ length: 6 }, (_, idx) => ({
  id: (idx + 1).toString(),
  title: `Demo Image ${idx + 1}`,
  image: image1,
}));

const AllImage = ({ onClick }: PropsType) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageList, setImageList] = useState(images);

  const toggleSelect = (id: string) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: string) => {
    setImageList(imageList.filter((img) => img.id !== id));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 pt-2">
      {imageList.map((image, idx) => (
        <div
          key={idx}
          className={`relative group cursor-pointer border-2 rounded-lg overflow-hidden ${
            selectedImages.includes(image?.id)
              ? "border-blue-500"
              : "border-gray-300"
          }`}
          onClick={() => {
            toggleSelect(image?.id);
            onClick?.(image?.id);
          }}
        >
          {/* Image */}
          <img src={image1} alt="" />

          <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <IconButton size="large" color="success">
              <CheckCircleIcon
                sx={{
                  color: selectedImages.includes(image.id)
                    ? "#4caf50"
                    : "white",
                }}
              />
            </IconButton>

            {/* Show Delete Icon only if onClick is not provided */}
            {!onClick && (
              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(image.id);
                }}
              >
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllImage;
