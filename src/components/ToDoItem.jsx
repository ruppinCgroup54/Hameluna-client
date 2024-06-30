import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Radio } from '@mui/material'
import React, { useState } from 'react'

import { styled } from '@mui/material';
import { Height, Padding } from '@mui/icons-material';
import dayjs from 'dayjs';

export const StyledListItem = styled(ListItem)(({ theme }) => ({

  borderRadius: '30px',
  padding: 0,
  margin: '4px',
  "& .MuiButtonBase-root": { borderRadius: '30px', fontSize: '14px', padding: 0 },
  "& .MuiRadio-root": { padding: '0', margin: 0 },
  "& .MuiSvgIcon-root": { height: '14px' },
  "& .MuiListItemText-root": { margin: 0 },


}));


export const ToDoItem = ({ item }) => {

  let bgcolor;
  let day1 = dayjs();
  let day2 = dayjs(item.doDate);

  switch (day1.diff(day2, 'days')) {
    case 0:
      bgcolor = 'rgba(255,0,0,0.5)'
      break;
    case 1:
      bgcolor = 'rgb(251, 156, 43,0.2)'
      break;

    default:
      bgcolor = 'rgba(217,217,217,0.5)'
      break;
  }

  if(item.done){
    bgcolor="rgba(2,100,2,0.3)"
  }

  return (
    <StyledListItem disablePadding sx={{  bgcolor }} >
      <ListItemButton role={undefined}

        // onClick={handleToggle(value)} 
        dense>
        <ListItemIcon>
          <Radio
            edge="start"
            checked={item.done}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': item.todoId }}
            sx={{ color: 'black' }}
          />
        </ListItemIcon>
        <ListItemText id={item.todoId} primary={item.title} sx={{ textDecorationLine: item.done ? 'line-through' : "" }} />
      </ListItemButton>
    </StyledListItem>
  )
}
