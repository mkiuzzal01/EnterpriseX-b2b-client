"use client";
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  type SelectChangeEvent,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type SelectInputFieldProps = {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
  requiredMessage?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

const SelectInputField: React.FC<SelectInputFieldProps> = ({
  label,
  name,
  options,
  defaultValue = "",
  requiredMessage,
  disabled = false,
  onChange,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={requiredMessage ? { required: requiredMessage } : undefined}
      render={({ field, fieldState }) => (
        <FormControl fullWidth disabled={disabled} error={!!fieldState.error}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            label={label}
            value={field.value || ""}
            onChange={(event: SelectChangeEvent) => {
              const value = event.target.value as string;
              field.onChange(value);
              if (onChange) {
                onChange(value);
              }
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default SelectInputField;
