import { Box, List, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ToDoList } from '../modules/Admin/components/ToDoList'
import { ToDoItem } from './ToDoItem'
import useShelterContext from '../utilis/useShelterContext'
import useFetch from '../utilis/useFetch'
import { Check } from '@mui/icons-material'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'

export const ToDoGroup = ({ title, date }) => {

  const { loginDet } = useShelterContext();

  const [trigger, setTrigger] = useState(0)

  const todos = useFetch(import.meta.env.VITE_APP_SERVERURL + `ToDos/shelter/${loginDet.shelterNumber}/date/${date}`, {}, [trigger])

  

  return (


    <Box>
      <Typography variant='body'>{title}</Typography>

      {(!todos.loading && todos.value?.length) > 0 ?
        <List>

          {todos.value?.map((item, i) => {
            return <ToDoItem key={item.toDoId} item={item} updateTrigger={setTrigger} />
          })}
        </List>


        :
        <Paper sx={{ display: 'flex', padding: '2px 10px', borderRadius: '20px ' }} elevation={3}>
          <Typography>אין משימות ליום זה  </Typography><Check color='success' />
        </Paper>
      }
    </Box>
  )
}
