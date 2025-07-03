import React from "react";
import {
  Autocomplete,
  TextField,
  type AutocompleteRenderInputParams,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export interface Option {
  label: string;
  value: string;
}

interface AutocompleteInputProps {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  freeSolo?: boolean;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  name,
  label,
  options,
  required = false,
  disabled = false,
  multiple = false,
  freeSolo = false,
}) => {
  const { control } = useFormContext();

  const labels = options.map((opt) => opt.label);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : ""}
      rules={{
        required: required ? `${label} is required` : false,
        validate: (value) => {
          if (!required) return true;
          if (multiple) {
            return (
              (Array.isArray(value) &&
                value.length > 0 &&
                value.every((v) => typeof v === "string" && v.trim() !== "")) ||
              `${label} is required`
            );
          } else {
            return (
              (typeof value === "string" && value.trim() !== "") ||
              `${label} is required`
            );
          }
        },
      }}
      render={({ field, fieldState }) => (
        <Autocomplete
          multiple={multiple}
          freeSolo={freeSolo}
          disabled={disabled}
          options={labels}
          value={field.value || (multiple ? [] : "")}
          onChange={(_, newValue) => {
            field.onChange(newValue);
          }}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField
              {...params}
              label={label}
              required={required}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              disabled={disabled}
            />
          )}
        />
      )}
    />
  );
};

export default AutocompleteInput;
