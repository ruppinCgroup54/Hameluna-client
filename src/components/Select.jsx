import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function FilterDogs({ filter, filterDogs }) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log("value", event.target);
    filterDogs(event.target.value, event.target.name);
  };

  return (
    <Box>
      <FormControl
        fullWidth
        sx={{
          m: 1,
          minWidth: "250px",
          "& .MuiInputBase-root": { borderRadius: "15px" },
          "& .MuiSvgIcon-root": {color: 'primary.main', mt:'-25px', width:'50px', height:'60px'},
          "& .MuiOutlinedInput-notchedOutline": {borderColor: "primary.main", height:'45px'}
        }}
      >
        <InputLabel id="demo-simple-select-label" sx={{ fontSize: "20px", mt:'-10px'}}>
          {filter.lab}
        </InputLabel>
        <Select
          value={value}
          label={filter.lab}
          onChange={handleChange}
          name={filter.id}
        >
          {filter.values.map((v) => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
