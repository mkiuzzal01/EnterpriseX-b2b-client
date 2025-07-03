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

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : null}
      rules={{
        required: required ? `${label} is required` : false,
        validate: (value) => {
          if (!required) return true;
          if (multiple) {
            return (
              (Array.isArray(value) &&
                value.length > 0 &&
                value.every(
                  (v) => typeof v === "object" && v?.label?.trim()
                )) ||
              `${label} is required`
            );
          } else {
            return (
              (typeof value === "object" &&
                value !== null &&
                value?.label?.trim()) ||
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
          options={options}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.label
          }
          isOptionEqualToValue={(option, value) => {
            if (freeSolo) return option.label === value.label;
            return option.value === value?.value;
          }}
          value={
            field.value ??
            (multiple ? [] : freeSolo ? { label: "", value: "" } : null)
          }
          onChange={(_, newValue) => {
            // Handle single vs multiple
            if (multiple) {
              field.onChange(
                Array.isArray(newValue)
                  ? newValue.filter((v) => v && v.label)
                  : []
              );
            } else {
              field.onChange(
                typeof newValue === "string"
                  ? { label: newValue, value: newValue }
                  : newValue
              );
            }
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
