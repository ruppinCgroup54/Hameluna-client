import { Box, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Radio } from '@mui/material'
import React, { useState } from 'react'

import { styled } from '@mui/material';
import { Height, Padding, RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material';
import dayjs from 'dayjs';
import { putFetch } from '../Data/Fetches';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const StyledListItem = styled(ListItem)(({ theme }) => ({

  borderRadius: '30px',
  padding: 0,
  margin: '4px',
  fontSize: '14px',
  "& .MuiCheckbox-root": { padding: '0', margin: '0 10px ' },
  "& .MuiSvgIcon-root": { height: '14px', borderRadius: '10px' },
  "& .MuiListItemText-root": { margin: 0 },


}));


export const ToDoItem = ({ item, updateTrigger, isFull = false }) => {

  const [itemN, setItemN] = useState(item)

  let bgcolor;
  let day1 = dayjs().startOf('day');
  let day2 = dayjs(itemN.doDate);


  if (day2.diff(day1, 'd', true) < 1) {
    bgcolor = 'rgba(255,0,0,0.5)'
  } else {
    if (day2.diff(day1, 'd', true) < 2) {

      bgcolor = 'rgb(251, 156, 43,0.2)'
    } else {

      bgcolor = 'rgba(217,217,217,0.5)'
    }
  }

  if (item.done) {
    bgcolor = "rgba(2,100,2,0.3)"
  }



  const updateItem = (e) => {
    item.done = e.currentTarget.checked


    putFetch('Todos/' + item.toDoId, item, successUpdate, errorUpdate)

  }

  const successUpdate = (data) => {
    console.log('item', item)
    setItemN(prev=>{return {...prev,done:!prev.done}})
  }
  const errorUpdate = (err) => {
    alert(err);
  }

  return (

    <StyledListItem sx={{ bgcolor }} >

      <ListItemIcon >
        <Checkbox
          icon={<RadioButtonUnchecked />}
          checkedIcon={<RadioButtonChecked />}
          edge="start"
          checked={item.done}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': item.todoId }}
          sx={{ color: 'black' }}
          onChange={updateItem}

        />
      </ListItemIcon>
      <ListItemText id={item.todoId} primary={item.title} secondary={dayjs(item.doDate).format("DD/MM/YYYY HH:mm")}
        primaryTypographyProps={{
          style: {
            marginLeft:'10px',
            display: 'inline'
          }
        }}
        secondaryTypographyProps={{
          style: { 
            display: 'inline',
            
          }
        }}
        sx={{ textDecorationLine: item.done ? 'line-through' : "" }} />
    </StyledListItem>
  )
}
