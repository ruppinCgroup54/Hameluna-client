import { Box, Button, Divider, Modal, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import useFetch from '../../../utilis/useFetch'
import useShelterContext from '../../../utilis/useShelterContext'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import updateLocale from 'dayjs/plugin/updateLocale'
import { TimeClock } from '@mui/x-date-pickers'
import { AccessTime, Add, CropSharp, HdrPlus, Loop, PlusOne } from '@mui/icons-material'
import { ToDoGroup } from '../../../components/ToDoGroup'
import { NewToDo } from './NewToDo'

const months = [
  "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי",
  "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
]

const weekdays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']



export const ToDoList = () => {

  const [openNewItem, setOpenNewItem] = useState(false)

  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.locale('he', {
    months,
    weekdays
  })

  const today = dayjs();
  const tommorow = dayjs().add(1, 'd');
  const next2days = dayjs().add(2, 'd');

  const { loginDet } = useShelterContext();

  const numbers = useFetch(import.meta.env.VITE_APP_SERVERURL + `ToDos/counts/shelter/${loginDet.shelterNumber}/date/${today.locale('he').toISOString()}`, {}, [openNewItem])

  const shelter = useFetch(import.meta.env.VITE_APP_SERVERURL + "shelters/" + loginDet.shelterNumber)

  let date = dayjs().locale('he').format('dddd, D בMMMM')

  let todaysCount = numbers.value?.filter(item => today.startOf('day').diff(dayjs(item.dayInMonth),'day')===0)[0]

  console.log('todaysCount', todaysCount)

  let nextDaysCount = numbers.value?.reduce((acc, item) => {
    console.log('numbers', numbers)

    if (today.diff(dayjs(item.dayInMonth), 'd') <= 0 && today.diff(dayjs(item.dayInMonth), 'd') >= -2) {
      return acc + item.countItems;
    } else {
      return acc;
    }
  }, 0)
  return (

    <Paper className='flexBox-col' sx={{
      height: '100%', width: '100%', backgroundColor: theme => theme.palette.secondary.light, borderRadius: '20px',
      padding: '2% 5%', justifyContent: 'space-between'

    }} elevation={4}>
      {!numbers.loading && <>
        <Box sx={{ display: 'flex', alignItems: 'stretch', flexDirection: 'column' }}>

          <Typography fontWeight={"bold"} variant='h4'> היי {shelter.value?.name},</Typography>
          <Typography variant='h5' > יש לך עבודה היום</Typography>
          <Typography variant='body' textAlign={'center'} mt={'15px'} > יום {date} </Typography>
          <Box display={'flex'} justifyContent={'space-around'} my={'10px'}>
            <Button startIcon={<AccessTime fontSize='large' color='primary' />}

              sx={{
                backgroundColor: 'white', fontSize: '20px', width: '40%', borderRadius: '10px', color: 'black',
                "& .MuiSvgIcon-root": { fontSize: '1.6em', color: 'palette.primary' }
              }} >
              {" היום " + todaysCount?.countItems}
            </Button>
            <Button startIcon={<Loop fontSize='large' color='primary' />}

              sx={{
                backgroundColor: 'white', fontSize: '20px', width: '40%', borderRadius: '10px', color: 'black',
                "& .MuiSvgIcon-root": { fontSize: '1.6em', color: 'palette.primary' }
              }} >
              {' סה"כ ' + nextDaysCount}
            </Button>
          </Box>

        </Box>

        <Box className='flexbox-col' gap={'10px'} flexGrow={1}>
          <ToDoGroup title={'היום'} date={today.locale('he').toISOString()} />
          <ToDoGroup title={'מחר'} date={tommorow.locale('he').toISOString()} />
          <ToDoGroup title={next2days.format('DD/MM/YYYY')} date={next2days.locale('he').toISOString()} />
        </Box>

        <Button variant='outlined' endIcon={<Add />} onClick={() => setOpenNewItem(true)}
          sx={{ borderWidth: '3px', borderColor: theme => theme.palette.primary.main, borderRadius: '30px', padding: '3px' }} >
          משימה חדשה
        </Button>

      </>}
      <Modal open={openNewItem} onClose={() => setOpenNewItem(false)}>
        <Box>
          <NewToDo shelterNumber={loginDet.shelterNumber} handleSuccess={setOpenNewItem} />
        </Box>
      </Modal>
    </Paper>

  )
}
