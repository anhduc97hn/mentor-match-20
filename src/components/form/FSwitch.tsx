"use client"

import { useFormContext, Controller } from "react-hook-form";
import { Switch, FormControlLabel } from "@mui/material";

interface FSwitchProps {
  name: string;
  [key: string]: any;
}

function FSwitch({ name, ...other }: FSwitchProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Switch {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
}

export default FSwitch;