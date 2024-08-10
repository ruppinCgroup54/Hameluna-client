import React, { useState } from 'react'
import ExceptionsList from './ExceptionsList'
import { Box, Divider, List } from '@mui/material'
import useFetch from '../../../utilis/useFetch'
import Exception from '../../../components/Exception'

export const DogExeptions = ({dog}) => {

  const [change, setChange] = useState(0);

  const exceptions = useFetch(import.meta.env.VITE_APP_SERVERURL + 'DailyRoutines/fullExceptions/' + dog.numberId, {}, [change]);

  return (
    <List sx={{
      width: '100%',
      maxWidth: 600,
      maxHeight: '65vh',
      bgcolor: 'background.paper',
      borderRadius: '20px',
      boxShadow: (theme) => theme.shadows[7],
      overflow: 'scroll'
  }}>
      {!exceptions.loading && exceptions.value.map((d, i) => {
          console.log('d', d)
          return <Box key={d.routineId + '_' + d.itemId}><Exception exc={d} close={close} />{i!=exceptions.length-1&&<Divider />}</Box>})
      }
  </List>
  )
}
