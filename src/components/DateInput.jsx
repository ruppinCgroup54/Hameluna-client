import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@emotion/react';
import { Box, FormControl } from '@mui/material';
import { Style } from '@mui/icons-material';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function DateInput({ label, setVal }) {
    const theme = useTheme();

    const [value, setValue] = useState(dayjs(''))   

    const handleChange = (e) =>{
        // setValue(dayjs(newValue));
        var date = new Date(e);
        var finaldate = date.getDate() + '-' +  (date.getMonth() + 1)  + '-' +  date.getFullYear();
        setVal(date.toISOString());
        console.log('dateeee', date.toISOString());
    }
    return (
        <Box>
            <FormControl
                fullWidth
                sx={{
                    top: '-7px',
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: '20px',
                        border: `2px solid ${theme.palette.primary.main}`
                    },
                    "& .MuiSvgIcon-root": {
                        color: 'primary.main'
                    }
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label={label}
                           disableFuture = {label == "תאריך לידה" && true}
                           disablePast = {label == "תאריך הגעה" && true}
                            onChange={handleChange}
                            slotProps={{ textField: { size: 'small' } }}
                            sx={{
                                width: '100%',
                                backgroundColor: '#fff',
                                borderRadius: '20px',
                                "& .MuiFormLabel-root": {
                                    fontSize: '14px'
                                },
                            }} />
                    </DemoContainer>
                </LocalizationProvider>
            </FormControl>
        </Box>
    )
}
