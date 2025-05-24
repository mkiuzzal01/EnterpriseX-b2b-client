import React, { useState, useRef } from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
import { Upload } from "@mui/icons-material";

const AddImage: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setFile(null);
      setPreview("");
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      console.log("Uploading file:", file);
      // Upload logic here
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ Width: 600, mx: "auto", p: 2 }}
    >
      <Box
        sx={{
          border: "2px dashed",
          borderRadius: 2,
          p: 2,
          textAlign: "center",
          bgcolor: dragActive ? "primary.light" : "background.default",
          position: "relative",
          height: preview ? 250 : 200,
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={handleChange}
        />
        {preview ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={preview} alt={preview} />

            <Button onClick={onButtonClick} color="primary" size="small">
              Choose different image
            </Button>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton sx={{ bgcolor: "grey.100", p: 2 }}>
              <Upload fontSize="large" />
            </IconButton>
            <Typography variant="body1">
              Drag and drop your image here
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
            <Button onClick={onButtonClick} color="primary">
              Browse files
            </Button>
            <Typography variant="caption" color="text.secondary">
              Supports: JPG, PNG, GIF (Max 10MB)
            </Typography>
          </Box>
        )}
      </Box>
      <Box mt={2} display="flex" justifyContent="end">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!file}
          startIcon={<Upload fontSize="small" />}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default AddImage;
