import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface AutocompleteInputProps {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  name,
  label,
  options,
  required = false,
  disabled = false,
  defaultValue = "",
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Autocomplete
          freeSolo
          options={options}
          disabled={disabled}
          value={field.value ?? ""}
          onInputChange={(_, newValue) => field.onChange(newValue)}
          onChange={(_, newValue) => field.onChange(newValue ?? "")}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={required}
              disabled={disabled}
              error={!!fieldState.error}
              helperText={fieldState.error ? `${label} is required` : ""}
            />
          )}
        />
      )}
    />
  );
};

export default AutocompleteInput;
