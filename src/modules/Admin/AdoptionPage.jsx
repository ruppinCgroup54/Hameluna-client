import { Box, Button, CardContent, CardMedia, Fade, Grid, Modal, Typography, styled } from '@mui/material';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DogCard, { DogCardStyle } from '../Adopters/DogsTinder/DogCard';
import useImageURL from '../../utilis/useImageURL';
import AdoptionDogCard from './components/AdoptionDogCard';
import BackgroundLayout from '../../layouts/BackgroundLayout';
import AdoptionForm from './components/AdoptionForm';
import { CheckCircle, FormatColorReset } from '@mui/icons-material';

const ModalStyle = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  width: "50%",
  borderRadius: "20px",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  padding: "3%",
  border: '1px solid',
  borderColor: theme.palette.primary.main,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p: 4,
})
)


export default function AdoptionPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const { state } = useLocation();
  
  let { dog, request } = state;

  dog = (dog === undefined ? request.Dog : dog)
  

  for (const key in dog) {
    dog[key.charAt(0).toLowerCase()+key.substring(1)] = dog[key];
  }


  const navigate = useNavigate()
  
  let defaultRequest = request ? request : {
    requestId: -1,
    adopter: { address: { id: -1, region: "" } },
    sendate: new Date().toISOString(),
    dog: dog,
  }

  defaultRequest.status = "trial period";


  return (
    <>
      <Grid sx={{ width: '90%', margin: "0 5vw 0", paddingTop: '100px' }} spacing={2} container>
        <Grid item xs={3}>
          <AdoptionDogCard dog={dog} />
        </Grid>

        <Grid item xs={9}>
          <AdoptionForm defaultRequest={defaultRequest} setOpenModal={handleOpen} />
        </Grid>
      </Grid>

      <Modal open={open}
        onClose={handleClose}
      >
        <Fade in={open}>

          <ModalStyle >
            <CheckCircle sx={{ fontSize: '60px' }} color='primary' />
            <Typography variant='h4' fontWeight={'bold'}>{dog.name} אומץ בהצלחה!</Typography>
            <Button variant='contained' onClick={()=>navigate("/admin/shelter")}>לדף הבית</Button>
          </ModalStyle >
        </Fade>
      </Modal>

    </>
  )
}
