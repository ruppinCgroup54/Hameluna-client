import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import useFetch from '../../../utilis/useFetch'
import useShelterContext from '../../../utilis/useShelterContext'
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import { TimeClock } from '@mui/x-date-pickers'
import { AccessTime, Loop } from '@mui/icons-material'
import { ToDoGroup } from '../../../components/ToDoGroup'

const months = [
  "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי",
  "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
]

const weekdays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']


export const ToDoList = () => {

  dayjs.locale('he', {
    months,
    weekdays
  })

  const today = dayjs().locale('he').format('dd/mm/yyyy')

  const { loginDet } = useShelterContext();

  const numbers = useFetch(import.meta.env.VITE_APP_SERVERURL + `ToDos/counts/shelter/${loginDet.shelterNumber}/date/${today}`)

  const shelter = useFetch(import.meta.env.VITE_APP_SERVERURL + "shelters/" + loginDet.shelterNumber)

  let date = dayjs().locale('he').format('dddd, D בMMMM')

  

 return (

    <Paper sx={{
      height: '100%', width: '100%', backgroundColor: theme => theme.palette.secondary.light, borderRadius: '20px',
      padding: '2% 5%',

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
              {/* {" היום " + numbers.value} */}
              </Button>
            <Button startIcon={<Loop fontSize='large' color='primary' />}

              sx={{
                backgroundColor: 'white', fontSize: '20px', width: '40%', borderRadius: '10px', color: 'black',
                "& .MuiSvgIcon-root": { fontSize: '1.6em', color: 'palette.primary' }
              }} >
              {/* {' סה"כ ' + todos.value?.length} */}
              </Button>
          </Box>

        </Box>

        <ToDoGroup  title={'היום'} date={today} />
        <ToDoGroup  title={'מחר'} date={today+1} />
        <ToDoGroup  title={today} date={today+2} />


      </>}

    </Paper>

  )
}
