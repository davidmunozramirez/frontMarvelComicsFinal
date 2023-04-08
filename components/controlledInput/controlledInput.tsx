import { Box, TextField } from "@mui/material";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";

type ControlledTextInputProps = {
  name: string;
  label: string;
  defaultValue?: string;
  type?: string; 
  inputProps?: object;
};

const ControlledInput: FC<ControlledTextInputProps> = ({
  name,
  label,
  defaultValue,
  type,
  inputProps,
}: ControlledTextInputProps) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value, ref },
    formState: { errors },
  } = useController<Record<string, string>>({
    name: name,
    control,
    defaultValue,
  });
  const { register } = useFormContext();

  return (
    <Box mb={2}>
      <TextField
        {...register(name)}
        inputProps={inputProps}
        type={type}
        onChange={onChange}
        value={value}
        label={label}
        inputRef={ref}
        fullWidth
        error={!!errors[name]}
        helperText={`${errors[name]?.message || ""}`}
      />
    </Box>
  );
};

export default ControlledInput;
