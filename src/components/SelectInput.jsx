import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, useTheme } from "@mui/material";
import { useState } from "react";

export default function SelectInput({ field, changeFunc, isMulti, register={} }) {

  const theme = useTheme();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [value, setValue] = useState(isMulti ? [] : "");

  const handleChange = (event) => {
    const target = event.target;
    if (isMulti) {
      setValue(
        typeof target.value === 'string' ? target.value.split(',') : target.value
      )
      console.log('value', value)
    }
    else {
      setValue(event.target.value);
      console.log("value", event.target);
      //לבדוקקקק
      changeFunc && changeFunc(event.target.value, event.target.name);
    }
  };

  return (
      <FormControl
        fullWidth
      sx={{
        width:'100%',
        "& .MuiInputBase-root": {backgroundColor: '#fff', borderRadius:'20px'},
        "& .MuiSvgIcon-root": { color: 'primary.main'},
        "& .MuiOutlinedInput-notchedOutline": {  border: `2px solid ${theme.palette.primary.main}`, borderRadius: '20px' }
      }}
      >
        <InputLabel id="demo-simple-select-label" sx={{ fontSize: "14px", top:'-5px'}}>
          {field.lab}
        </InputLabel>
        <Select
          size="small"
          multiple={isMulti}
          value={value}
          label={field.lab}
          onChange={handleChange}
          name={field.id}
          input={<OutlinedInput label={field.lab} />}
          MenuProps={MenuProps}
          required
          {...register}
        >
          {field.values?.map((v) => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}
