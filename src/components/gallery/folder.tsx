"use client";
import { useState } from "react";
import image1 from "../../assets/mount-a-folder-as-a-drive.webp";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type PropsType = {
  onDelete?: (id: string) => void;
  onSelect?: (id: string) => void;
  selectedImages?: string[];
};

const imagesData = Array.from({ length: 6 }, (_, idx) => ({
  id: (idx + 1).toString(),
  title: `Folder ${idx + 1}`,
  image: image1,
}));

const Folder = ({
  onDelete = () => {},
  onSelect = () => {},
  selectedImages = [],
}: PropsType) => {
  const [images, setImages] = useState(imagesData);

  const handleDelete = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
    onDelete(id);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative group cursor-pointer border rounded-lg overflow-hidden"
          onClick={() => onSelect(image.id)}
        >
          {/* Image */}
          <div>
            <h3 className="font-bold text-xl text-center">{image?.title}</h3>
            <div className="relative aspect-[3/3]">
              <img src={image.image} alt={image.title} />
            </div>
          </div>

          {/* Hover Actions */}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50  gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Select Icon */}
            <IconButton color="success">
              <CheckCircleIcon
                sx={{
                  color: selectedImages.includes(image.id)
                    ? "#4caf50"
                    : "white",
                }}
              />
            </IconButton>

            {/* Delete Icon */}
            <IconButton
              color="error"
              onClick={(e) => {
                e?.stopPropagation();
                handleDelete(image.id);
              }}
            >
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Folder;
