import { Send } from '@mui/icons-material'
import { Box, Button, IconButton, TextField } from '@mui/material'
import React, { useRef } from 'react'

export default function NewMessage({ addMessage }) {

  const formRef = useRef();

  const enterSubmit = (e)=>{
    if (e.keyCode === 13) {
      debugger
      console.log('e', formRef.current)
    }
  }

  return (
    <Box ref={formRef} component={'form'} onSubmit={addMessage} sx={{ borderTop: '#ccc 1px solid' }}>

      <TextField fullWidth variant='standard' name='content'

        InputProps={{
          disableUnderline: true,
          startAdornment:
            <Button type='submit' variant='contained' sx={{ 
              borderRadius: 15, m:1
             }} >
              <Send sx={{ color: 'common.white' }} />
            </Button>
        }} />
    </Box>
  )
}


