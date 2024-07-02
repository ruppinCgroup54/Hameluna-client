import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useEffect, useRef, useState } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = dayjs();

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="rectangular"
      badgeContent={isSelected ? '🌚' : undefined}
      sx={{flexShrink:'none',flexGrow:'1',height:'20%'}}
    
    >
      <PickersDay  sx={{margin:'auto',"&.MuiPickersDay-root.Mui-selected":{bgcolor:theme=>theme.palette.secondary.dark , color:'black'}}} {...other} outsideCurrentMonth={outsideCurrentMonth} day={day}  />
    </Badge>
  );
}

export default function TodoCalendar() {
  const requestAbortController = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{ width: '90%',height:'80vh',border:'3px solid',maxHeight:'none',
          borderRadius:'15px',bottom:'5px',marginBottom:'5vh',
          borderColor:theme=>theme.palette.primary.main }}
        defaultValue={initialValue}
        loading={isLoading}
        views={['year','month','day']}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          leftArrowIcon: () => <KeyboardArrowRight />,
          rightArrowIcon: () => <KeyboardArrowLeft />,
          day: ServerDay,

        }}

        slotProps={{
          layout: {
            sx: {
              ['.MuiMultiSectionDigitalClock-root']: {
                flexDirection: 'row-reverse'
              },
              
            }
          }
          ,
          day: {
            highlightedDays,
            
          },
          calendarHeader:{
            sx:{
              ['.MuiDayCalendar-header']:{
                justifyContent: 'space-around'
              }
            }
          }
        }}
      />
    </LocalizationProvider>
  );
}