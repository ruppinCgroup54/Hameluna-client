import { Backdrop, Box, Button, Divider, Fade, List, Modal, Paper, Slide, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ToDoList } from '../modules/Admin/components/ToDoList'
import { ToDoItem } from './ToDoItem'
import useShelterContext from '../utilis/useShelterContext'
import useFetch from '../utilis/useFetch'
import { Check } from '@mui/icons-material'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import dayjs from 'dayjs'

export const ToDoGroup = ({ title, date }) => {

  const { loginDet } = useShelterContext();

  const [trigger, setTrigger] = useState(0)

  const todos = useFetch(import.meta.env.VITE_APP_SERVERURL + `ToDos/shelter/${loginDet.shelterNumber}/date/${dayjs(date).format('YYYY-MM-DD')}`, {}, [trigger])



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


ToDoGroup.Calender = ({ date }) => {
  const { loginDet } = useShelterContext();

  const [modalData, setModalData] = useState(null)

  const todos = useFetch(import.meta.env.VITE_APP_SERVERURL + `ToDos/shelter/${loginDet.shelterNumber}/date/${dayjs(date).format('YYYY-MM-DD')}`)

  let numOnButton = todos.value?.length - 2

  const renderToDos = () => {

    return todos.value?.map((item, i) => {
      if (i < 2) {

        return <>
          <Typography sx={{ fontSize: '12px', whiteSpace: 'collapse' }} noWrap key={item.toDoId}>{item.title}</Typography>

        </>
      }
    })
  }

  const openModal = () => {

    let title = dayjs(date).locale('he').format('dddd, D בMMMM');

    setModalData({ title, date })

  }



  return (
    <>
      <Box sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={openModal} >
        <Box>

          {renderToDos()}
        </Box>
        {
          todos.value?.length > 2 &&
          <Button color='primary' > {numOnButton}+ </Button>
        }

      </Box>
      <Modal open={modalData !== null}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        onClose={() => setModalData(null)}
        sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          "& .MuiBackdrop-root": {
            backgroundColor: 'rgba(255,255,255,0.3)'
          },
        }}>
        <Fade in={modalData!==null} >

          <Box sx={{
            padding: '20px', borderRadius: '20px', bgcolor: 'secondary.main',
            border: '2px solid', borderColor: 'primary.main', position: 'relative',
            height: '75vh', width: 'clamp(200px,30vw,500px)',
            "&:after": {
              content: '""',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'white',
              top: 0, right: 0, width: '100%',
              borderRadius: 'inherit', zIndex: -1
            }
          }}>

            <ToDoGroup date={modalData?.date} title={modalData?.title} />
          </Box>
        </Fade>
      </Modal>
    </>
  )

}