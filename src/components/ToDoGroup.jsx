import { Box, List, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ToDoList } from '../modules/Admin/components/ToDoList'
import { ToDoItem } from './ToDoItem'
import useShelterContext from '../utilis/useShelterContext'
import useFetch from '../utilis/useFetch'

export const ToDoGroup = ({ title,date }) => {

  const { loginDet } = useShelterContext();

  const todos = useFetch(import.meta.env.VITE_APP_SERVERURL + `ToDos/shelter/${loginDet.shelterNumber}/date/${date}`)


  return (
    <Box>
        <Typography variant='body'>{title}</Typography>

    <List>

      {todos.value?.map((item,i) => {
        return <ToDoItem key={item.toDoId} item={item} />
      })}

    </List>
      </Box>
  )
}
