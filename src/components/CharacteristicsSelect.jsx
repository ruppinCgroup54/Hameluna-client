import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useState } from 'react';

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

export default function CharacteristicsSelect({ field }) {

    const theme = useTheme();
    const [value, setValue] = useState([]);

    const handleChange = (event) => {
        const target = event.target;
        setValue(
            typeof target.value === 'string' ? target.value.split(',') : target.value
        )
    };

    return (
        <div>
            <FormControl sx={{
                width: '100%',
                "& .MuiInputBase-root": { backgroundColor: '#fff', borderRadius: '20px' },
                "& .MuiSvgIcon-root": { color: 'primary.main', top: '10px' },
                "& .MuiOutlinedInput-notchedOutline": { border: `2px solid ${theme.palette.primary.main}`, borderRadius: '20px' }
            }}>
                <InputLabel id="demo-multiple-chip-label" sx={{ fontSize: "14px", top: '-5px' }}>{field.lab}</InputLabel>
                <Select
                    size="large"
                    label={field.lab}
                    name={field.id}
                    multiple
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {field.values?.map((v) => (
                        <MenuItem key={v} value={v}>
                            {v}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
