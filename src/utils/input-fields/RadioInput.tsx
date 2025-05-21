import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type RadioInputProps = {
  name: string;
  label: string;
  options: Option[];
  required?: boolean | string;
};

const RadioInput = ({
  name,
  label,
  options,
  required = false,
}: RadioInputProps) => {
  const { control } = useFormContext();

  return (
    <FormControl component="fieldset" fullWidth error={!!required}>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={
          required
            ? {
                required:
                  typeof required === "string"
                    ? required
                    : "This field is required",
              }
            : undefined
        }
        render={({ field, fieldState }) => (
          <>
            <RadioGroup {...field} row>
              {options.map(({ value, label }) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  );
};

export default RadioInput;
