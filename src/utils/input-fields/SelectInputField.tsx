"use client";
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
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
  const labelId = `${name}-label`;

  return (
    <FormControl fullWidth disabled={disabled} error={!!requiredMessage}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={requiredMessage ? { required: requiredMessage } : {}}
        render={({ field, fieldState }) => (
          <>
            <Select
              {...field}
              labelId={labelId}
              label={label}
              value={field.value || ""}
              onChange={(event) => {
                const selectedValue = event.target.value;
                field.onChange(selectedValue);
                onChange?.(selectedValue);
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <FormHelperText sx={{ color: "error.main" }}>
                {fieldState.error.message}
              </FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  );
};

export default SelectInputField;
