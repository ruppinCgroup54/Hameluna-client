import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useEffect, useRef, useState } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, Modal } from '@mui/material';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { ToDoGroup } from '../../../components/ToDoGroup';


const initialValue = dayjs();

function ServerDay(props) {
  const { countTodos = [], day, outsideCurrentMonth, ...other } = props;

  const count = countTodos.filter(item => dayjs(item.dayInMonth).diff(day, 'd') == 0)[0];

  return (
    <Box
      key={props.day.toString()}
      sx={{
        padding: '5px',
        width: 'calc(100% / 7)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'baseline',
        overflow: 'auto',
        gap: '12px',
        "&:hover": {
          bgcolor: 'primary.light',
        }
      }}
    >

      <Badge
        overlap="circular"
        badgeContent={count?.countItems}
        color='primary'
      >
        <PickersDay
          sx={{
            borderRadius: '5px',
            "&.MuiPickersDay-root.Mui-selected": { bgcolor: theme => theme.palette.secondary.dark, color: 'black' }
          }}
          {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} >

        </PickersDay>
      </Badge>
      <ToDoGroup.Calender date={day.locale('he').toISOString()} />
    </Box>
  );
}

export default function TodoCalendar() {

  const months = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי",
    "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
  ]

  const weekdays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']



  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.locale('he', {
    months,
    weekdays
  })

  const [isLoading, setIsLoading] = useState(false);
  const [countTodos, setCountToDos] = useState([]);

  const fetchHighlightedDays = () => {
    fetch(import.meta.env.VITE_APP_SERVERURL + 'ToDos/counts/shelter/1/date/2024-07-07')
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else {
          return Promise.reject()
        }
      }
      )
      .then((data) => {
        setIsLoading(false)
        setCountToDos(data)
      })
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);

  }, []);



  const handleMonthChange = (date) => {

    setIsLoading(true);
    setCountToDos([]);
    fetchHighlightedDays(date);
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='he' >
      <DateCalendar
        sx={{
          width: '90%', height: '80vh', border: '3px solid', maxHeight: 'none',
          borderRadius: '15px', bottom: '5px', marginBottom: '5vh',
          borderColor: theme => theme.palette.primary.main,
          ['& .MuiDayCalendar-weekDayLabel']: {
            width: '100%',
            fontSize: '16px',
            fontWeight: 'bold'
          },
          "& .MuiDayCalendar-root ": {
            height: 'calc(75vh - 40px)',
            display: 'flex',
            flexDirection: 'column',
            "& .MuiPickersSlideTransition-root": {
              flexGrow: 1,
              "& .MuiDayCalendar-monthContainer": {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                padding: '0 3px',
                "& .MuiDayCalendar-weekContainer": {
                  height: '100%',
                  gap: '3px',
                  margin: 0,
                  maxHeight: 'calc(100% / 5)'

                }
              }
            }

          }


        }}

        dayOfWeekFormatter={(date) => date.locale('he').format('dddd')}
        showDaysOutsideCurrentMonth
        defaultValue={initialValue}
        loading={isLoading}
        views={['year', 'month', 'day']}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          leftArrowIcon: () => <KeyboardArrowRight />,
          rightArrowIcon: () => <KeyboardArrowLeft />,
          day: ServerDay,
        }}

        slotProps={{
          day: {
            countTodos,
          },
          calendarHeader: {
            sx: {
              bgcolor: 'secondary.main',
              mt: 0,

            }
          }

        }}
      />

     
    </LocalizationProvider>
  );
}