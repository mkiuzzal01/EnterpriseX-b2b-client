"use client";

import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label: string;
  options?: Option[];
  required?: boolean;
  disabled?: boolean;
  freeSolo?: boolean;
  placeholder?: string;
}

export default function AutocompleteInput({
  name,
  label,
  options = [],
  required = false,
  disabled = false,
  freeSolo = false,
  placeholder,
}: Props) {
  const { control } = useFormContext();

  const valueToLabel = (val: string) => {
    const found = options.find((o) => o.value === val);
    return found ? found.label : val;
  };

  const labelToValue = (label: string) => {
    const found = options.find((o) => o.label === label);
    return found ? found.value : label;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      rules={{
        validate: (value) =>
          required && (!Array.isArray(value) || value.length === 0)
            ? `${label} is required`
            : true,
      }}
      render={({ field, fieldState }) => (
        <Autocomplete
          multiple
          freeSolo={freeSolo}
          disabled={disabled}
          options={options.map((o) => o.label)}
          value={(field.value ?? []).map(valueToLabel)}
          onChange={(_, newVal) => {
            if (!Array.isArray(newVal)) {
              field.onChange([]);
              return;
            }
            const newValues = newVal.map(labelToValue);
            field.onChange(newValues);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              required={required}
            />
          )}
        />
      )}
    />
  );
}
