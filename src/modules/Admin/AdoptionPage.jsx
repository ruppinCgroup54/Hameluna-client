import { Box, Button, CardContent, CardMedia, Grid, Modal, Typography, styled } from '@mui/material';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import DogCard, { DogCardStyle } from '../Adopters/DogsTinder/DogCard';
import useImageURL from '../../utilis/useImageURL';
import AdoptionDogCard from './components/AdoptionDogCard';
import BackgroundLayout from '../../layouts/BackgroundLayout';
import AdoptionForm from './components/AdoptionForm';
import { CheckCircle } from '@mui/icons-material';

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
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { state } = useLocation();

  const { dog, adopter } = state;

  console.log('dog', dog)

  let defaultRequest = {
    adopter: adopter !== undefined ? adopter : {},
    sendate: new Date().toISOString(),
    dogId: dog.numberId,  
    status: "open"
  }

  return (
    <>
      <Grid sx={{ width: '90%', margin: "0 5vw 0", paddingTop: '100px' }} spacing={2} container>
        <Grid item xs={3}>
          <AdoptionDogCard dog={dog} />
        </Grid>

        <Grid item xs={9}>
          <AdoptionForm defaultRequest={defaultRequest} />
        </Grid>
      </Grid>

      <Modal open={open}
        onClose={handleClose}>

        <ModalStyle >
          <CheckCircle sx={{ fontSize: '60px' }} color='primary' />
          <Typography variant='h4' fontWeight={'bold'}>{dog.name} אומץ בהצלחה!</Typography>
          <Button variant='contained'>לדף הבית</Button>
        </ModalStyle >
      </Modal>

    </>
  )
}
