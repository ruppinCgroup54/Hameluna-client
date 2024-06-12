import Cell from "../Admin/components/cell";

import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShelterContext } from "../../context/ShelterContextProvider";
import useShelterContext from "../../utilis/useShelterContext";

export default function ControlPage() {

  const { cells, dogs, newCell } = useShelterContext();
  console.log('cells', cells);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box display={"flex"} mt={"120px"} >
      <Box width={"36%"} display={"flex"}></Box>
      <Grid container width={"60%"} display={"flex"} rowSpacing={1}>
        <Grid item md={12} display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h5">הכלבייה שלנו</Typography>
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
            {cells?.value?.map((c, i) => (
              <Cell key={c.id} cellItem={c}></Cell>
            ))}
          </Box>
        </Grid>
        <Grid item md={12}>
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
              onSubmit={(e) => {newCell(e); handleClose()}}>
              <TextField sx={{ m: '10px' }} id="outlined-basic" label="מספר תא" variant="outlined" name="cellNumber"/>
              <TextField sx={{ m: '10px' }} id="outlined-basic" label="קיבולת" variant="outlined" name="capacity"/>
              <Button variant='contained' type="submit">הוסף</Button>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Box>
  );
}
