import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@emotion/react';
import { Box, FormControl } from '@mui/material';
import { Style } from '@mui/icons-material';

export default function DateInput({ label }) {
    const theme = useTheme();
    return (
        <Box>
            <FormControl
            fullWidth
                sx={{
                    top:'-7px',
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
