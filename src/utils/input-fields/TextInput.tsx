"use client";
import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useFormContext } from "react-hook-form";

type TextInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  variant?: "outlined" | "standard" | "filled";
  required?: boolean;
  defaultValue?: string;
  fullWidth?: boolean;
};

const TextInput = ({
  name,
  label,
  placeholder,
  type = "text",
  variant = "outlined",
  required = false,
  defaultValue = "",
  fullWidth = true,
}: TextInputProps) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          placeholder={placeholder}
          type={isPassword && !showPassword ? "password" : "text"}
          variant={variant}
          fullWidth={fullWidth}
          margin="normal"
          error={!!fieldState.error}
          helperText={fieldState.error ? `${label} is required` : ""}
          InputProps={{
            endAdornment: isPassword && (
              <InputAdornment position="end">
                <IconButton onClick={toggleVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default TextInput;
