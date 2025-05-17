/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import { Controller } from "react-hook-form";

type TextInputProps = {
  name: string;
  label?: string;
  control: any;
  defaultValue?: string;
  variant?: "outlined" | "standard" | "filled";
  type?: string;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
};

const TextInput = ({
  name,
  label,
  control,
  variant = "outlined",
  type = "text",
  defaultValue = "",
  placeholder,
  required = false,
  fullWidth = true,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const isPasswordType = type === "password";

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          defaultValue={defaultValue}
          variant={variant}
          type={isPasswordType && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          fullWidth={fullWidth}
          error={!!fieldState.error}
          helperText={fieldState.error ? "This field is required" : ""}
          margin="normal"
          InputProps={{
            endAdornment: isPasswordType && (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
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
