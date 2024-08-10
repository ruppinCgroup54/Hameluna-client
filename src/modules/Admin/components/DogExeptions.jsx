import React, { useState } from 'react'
import ExceptionsList from './ExceptionsList'
import { Box, Divider, List, Typography } from '@mui/material'
import useFetch from '../../../utilis/useFetch'
import Exception from '../../../components/Exception'
import { Margin } from '@mui/icons-material'

export const DogExeptions = ({dog}) => {

  const [change, setChange] = useState(0);

  const exceptions = useFetch(import.meta.env.VITE_APP_SERVERURL + 'DailyRoutines/fullExceptions/' + dog.numberId, {}, [change]);

  return (
    <Box className='flexBox-col' sx={{alignItems:'center'}}>
    {
          (!exceptions.loading && exceptions.value.length>0) ?
      <List sx={{
        width: '100%',
        maxWidth: 600,
        maxHeight: '65vh',
        bgcolor: 'background.paper',
        borderRadius: '20px',
        boxShadow: (theme) => theme.shadows[7],
        overflow: 'scroll'
        }}>
         {exceptions.value.map((d, i) => {
            console.log('d', d)
            return <Box key={d.routineId + '_' + d.itemId}><Exception exc={d} handleUpdate={()=>setChange(prev=>prev+1)} close={()=> {throw new Error('Parameter is not a number!')}} />{i!=exceptions.length-1&&<Divider />}</Box>})
        }
        
        </List>:  
        
          <Typography variant='h5' >לכלב אין חריגות </Typography>
        }
    </Box>
  )
}
