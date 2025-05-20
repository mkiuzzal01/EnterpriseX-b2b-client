"use client";
import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useFormContext } from "react-hook-form";

type TextInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "password" | "email" | "tel";
  variant?: "outlined" | "standard" | "filled";
  required?: boolean;
  defaultValue?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  row?: number;
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
  multiline = false,
  row = 1,
}: TextInputProps) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isMultiline = type === "text" && multiline;

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
          variant={variant}
          fullWidth={fullWidth}
          margin="normal"
          error={!!fieldState.error}
          helperText={fieldState.error ? `${label} is required` : ""}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          multiline={isMultiline}
          rows={isMultiline ? row : undefined}
          InputProps={{
            endAdornment: isPassword ? (
              <InputAdornment position="end">
                <IconButton onClick={toggleVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : undefined,
            inputProps: {
              inputMode: type === "number" ? "numeric" : undefined,
              pattern: type === "number" ? "[0-9]*" : undefined,
            },
          }}
        />
      )}
    />
  );
};

export default TextInput;
