import { Box } from '@mui/material'
import React from 'react'
import Message from './Message'





export default function MessagesBox({messages}) {

  


  const renderMessages = ()=>{
    return messages.map((m,i)=><Message key={i}  message={m}/>)
  }

  return (
    <Box sx={{ flexGrow: 1, padding:'5px 15px', overflow:'auto' }}>
      {renderMessages()}
    </Box>
  )
}
