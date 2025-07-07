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
  multiple?: boolean;
  placeholder?: string;
}

export default function AutocompleteInput({
  name,
  label,
  options = [],
  required = false,
  disabled = false,
  freeSolo = false,
  multiple = false,
  placeholder,
}: Props) {
  const { control } = useFormContext();

  const valueToLabel = (val: string) => {
    const found = options?.find((o) => o.value === val);
    return found ? found.label : val;
  };

  const labelToValue = (label: string) => {
    const found = options?.find((o) => o.label === label);
    return found ? found.value : label;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : ""}
      rules={{
        validate: (value) =>
          required &&
          ((multiple && (!Array?.isArray(value) || value?.length === 0)) ||
            (!multiple && !value))
            ? `${label} is required`
            : true,
      }}
      render={({ field, fieldState }) => (
        <Autocomplete
          multiple={multiple}
          freeSolo={freeSolo}
          disabled={disabled}
          options={options?.map((o) => o?.label)}
          value={
            multiple
              ? (Array.isArray(field?.value) ? field.value : []).map(
                  valueToLabel
                )
              : valueToLabel(field?.value ?? "")
          }
          onChange={(_, newVal) => {
            if (multiple) {
              const newValues = (newVal as string[])?.map(labelToValue);
              field.onChange(newValues);
            } else {
              field.onChange(labelToValue(newVal as string));
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!fieldState?.error}
              helperText={fieldState.error?.message}
              required={required}
            />
          )}
        />
      )}
    />
  );
}
