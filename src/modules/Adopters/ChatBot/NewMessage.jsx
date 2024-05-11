import { Send } from '@mui/icons-material'
import { Box, Button, IconButton, TextField } from '@mui/material'
import React from 'react'

export default function NewMessage({ addMessage }) {
  return (
    <Box component={'form'} onSubmit={addMessage} sx={{ borderTop: '#ccc 1px solid' }}>

      <TextField fullWidth multiline variant='standard' name='content'

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


