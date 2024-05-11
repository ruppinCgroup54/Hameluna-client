import { Box } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import Message from './Message'





export default function MessagesBox({messages}) {

  const scrollRef = useRef();

  const renderMessages = ()=>{
    return messages.map((m,i)=><Message key={i}  message={m}/>)
  }


  useEffect(() => {
    scrollRef.current.scrollIntoView();
  }, [messages])
  

  return (
    <Box  sx={{ flexGrow: 1, padding:'5px 15px', overflow:'auto' }}>
      {renderMessages()}
      <span ref={scrollRef}></span>
    </Box>
  )
}
