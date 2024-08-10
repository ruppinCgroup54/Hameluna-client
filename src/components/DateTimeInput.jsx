import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/en-gb';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { deDE } from '@mui/x-date-pickers/locales';
import dayjs from 'dayjs';
import { Textinput } from './Textinput';



export const DateTimeInput = ({ defaultValue, label, control, name, disabled = false,disablePast=true,isDateOnly=false }) => {



    dayjs.extend(utc);
    dayjs.extend(timezone);
    console.log('defaultValue', defaultValue)
    return (
        <Box sx={{ width: '100%' }}>
            <FormControl
                sx={{
                    width: '100%',
                    "& .MuiStack-root>.MuiTextField-root": { minWidth: '0' },
                    top: '-7px',
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: '20px',
                        border: theme => `2px solid ${theme.palette.primary.main}`
                    },

                    "& .MuiSvgIcon-root": {
                        color: 'primary.main'
                    }
                }}
            >
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, ...restField } }) =>


                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker label={label}
                                    defaultValue={dayjs(defaultValue)}
                                    disabled={disabled}
                                    disablePast={disablePast}
                                    views={isDateOnly? ['day','month','year']:['year', 'month', 'day', 'hours', 'minutes']}
                                    timezone='Asia/Jerusalem'
                                    onChange={(date) => onChange(date)}
                                    slots={{
                                        textField: Textinput,
                                        leftArrowIcon: () => <KeyboardArrowRight />,
                                        rightArrowIcon: () => <KeyboardArrowLeft />
                                    }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                        },
                                        layout: {
                                            sx: {
                                                ['.MuiMultiSectionDigitalClock-root']: {
                                                    flexDirection: 'row-reverse'
                                                }
                                            }
                                        },

                                    }}
                                    sx={{
                                        width: '100%',
                                        backgroundColor: '#fff',
                                        borderRadius: '20px',
                                        "& .MuiFormLabel-root": {
                                            fontSize: '14px'
                                        }




                                    }} />
                            </DemoContainer>
                        </LocalizationProvider>
                    }
                />
            </FormControl>
        </Box>
    )
}

