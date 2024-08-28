import Cell from "./components/Cell";

import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShelterContext } from "../../context/ShelterContextProvider";
import useShelterContext from "../../utilis/useShelterContext";
import { DndContext, pointerWithin ,useSensor,MouseSensor, TouchSensor, useSensors} from "@dnd-kit/core";
import { putFetch } from "../../Data/Fetches";
import BackgroundLayout from "../../layouts/BackgroundLayout";
import CellsSkeleton from "../../components/CellsSkeleton";
import { ToDoList } from "./components/ToDoList";

export default function ControlPage() {

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 1000,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
      },
    }),
  );

  const navigate = useNavigate();

  const bImg ='images/Layouts/RequestBackground.png'

  const { cells, dogs, newCell, setTriggerFetch } = useShelterContext();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const endDrag = (e) => {
    let dog = e.active.data.current.dog;
    dog.cellId = e.over.id;
    putFetch('Dogs/' + dog.numberId, dog, sucPut, errPut);
    console.log('event', e);
  }

  const sucPut = () => {
    setTriggerFetch(prev => prev + 1);
  }

  const errPut = () => {
    alert("errorrrrrrr");
  }
  return (
    <BackgroundLayout image={bImg} style={{ display: "block" }}>
      <DndContext onDragEnd={endDrag} collisionDetection={pointerWithin} sensors={sensors}>
        <Box display={"flex"} mt={"120px"} gap={'2%'} justifyContent={'center'} height={"calc( 100% - 150px)"}  >
          <Box width={"30%"} display={"flex"} sx={{marginBottom:'15px',height:'100%'}}>
            <ToDoList/>
          </Box>
          <Grid container width={"63%"} display={"flex"} rowSpacing={1} height={"100%"}>
            <Grid item md={12} display={"flex"} justifyContent={"space-between"}>
              <Typography variant="h5">הכלבייה שלנו
                <Button onClick={()=>navigate("/")}>לאתר המאמצים</Button>
                <Button onClick={()=>navigate("/employees")} >למילוי שגרה</Button>
              </Typography>
              <Typography variant="h5">סה"כ כלבים: {dogs?.length}</Typography>
            </Grid>
            <Grid item md={12}>
              <Box
                sx={{
                  flexWrap: "wrap",
                  display: "flex",
                  flexDirection: "row",
                  gap: "calc(20% / 3)",
                  rowGap: "15px",
                }}
              >
                {cells.loading ? <CellsSkeleton/> : cells.value.map((c, i) => (
                  <Cell key={c.id} cellItem={c}></Cell>
                ))}
              </Box>
            </Grid>
            <Grid item md={12} sx={{alignContent:'flex-end'}}>
              <Button
                onClick={handleOpen}
                variant='outlined'
                sx={{
                  width: '100%',
                  fontSize: '18px',
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: "10px",
                  textAlign: "center",
                  boxShadow: (theme) => theme.shadows[10],
                  mt: '15px'
                }}
              >
                הוספת תא חדש +
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Box component={'form'}
                  sx={{
                    border: '2px solid',
                    borderRadius: '20px',
                    borderColor: 'primary',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '40vh',
                    p: '3%',
                    bgcolor: '#fff',
                    margin: ' auto',
                  }}
                  onSubmit={(e) => { newCell(e); handleClose() }}>
                  <TextField sx={{ m: '10px' }} id="outlined-basic" label="מספר תא" variant="outlined" name="cellNumber" />
                  <TextField sx={{ m: '10px' }} id="outlined-basic" label="קיבולת" variant="outlined" name="capacity" />
                  <Button variant='contained' type="submit">הוסף</Button>
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </Box>
      </DndContext>
    </BackgroundLayout>
  );
}
