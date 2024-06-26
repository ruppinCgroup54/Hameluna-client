import { Box, Skeleton } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import Message from './Message'





export default function MessagesBox({ messages,loading }) {

  const scrollRef = useRef();
  console.log('first', messages)
  const renderMessages = () => {
    return messages.map((m, i) => m.role.toLowerCase() !== "system" ? <Message key={i} message={m}  /> : console.log('m', m))
  }


  useEffect(() => {
    scrollRef.current.scrollIntoView();
  }, [messages])


  return (
    <Box sx={{ flexGrow: 1, padding: '5px 15px', overflow: 'auto' }}>
      {renderMessages()}
      {loading && <Message message={{role:"assistant", content:"..."}}/>}
            <span ref={scrollRef}></span>
    </Box>
  )
}
