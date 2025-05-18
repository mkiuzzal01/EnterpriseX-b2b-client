/* eslint-disable @typescript-eslint/no-explicit-any */
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
  required?: boolean;
};

const RadioInput = ({
  name,
  label,
  options,
  required = false,
}: RadioInputProps) => {
  const { control } = useFormContext();

  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field, fieldState }) => (
          <>
            <RadioGroup {...field} row>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {fieldState.error && (
              <FormHelperText error>This field is required</FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  );
};

export default RadioInput;
