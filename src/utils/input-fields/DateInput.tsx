/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type DateInputProps = {
  name: string;
  label?: string;
  control: any;
  required?: boolean;
  fullWidth?: boolean;
};

const DateInput = ({
  name,
  label,
  control,
  required = false,
  fullWidth = true,
}: DateInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            label={label}
            value={value ? dayjs(value) : null}
            onChange={(date: Dayjs | null) => {
              onChange(date ? date.toISOString() : null);
            }}
            slotProps={{
              textField: {
                fullWidth,
                error: !!error,
                helperText: error ? "This field is required" : "",
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
