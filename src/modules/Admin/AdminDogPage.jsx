import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import AddImage from '../../components/AddImage'
import { position } from 'stylis'
import { to } from '@react-spring/web'
import StepperComponnent from '../../components/StepperComponnent'
import DogProfileDetailes from './components/DogProfileDetailes'
import { useLoaderData, useLocation } from 'react-router-dom'
import useImageURL from '../../utilis/useImageURL'
import useFetch from '../../utilis/useFetch'
import FallbackElement from '../../components/FallbackElement'


export default function AdminDogPage() {

  // const { state } = useLocation();

  // const { dog } = state;

  // const dogNew = useFetch(import.meta.env.VITE_APP_SERVERURL + 'dogs/' + dog.numberId)

  const dogNew = useLoaderData();

  console.log("dog",dogNew);

  return (
    <Grid sx={{
      width: '90vw', margin: "15vh 5vw 0", height: '85vh',
    }} columnSpacing={2} container>

      {!dogNew.loading?
       <>
        <Grid item xs={2.5} >
          <Box sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center',
            height: '95%', border: '1px solid', borderColor: "primary.main", borderRadius: '20px'
          }}>

            <Box sx={{ position: 'relative', marginBottom: '15vw' }}>

              <AddImage style={{ top: "0", right: '50%', translate: '50%' }} defaultImg={useImageURL(dogNew.profileImage)} />
            </Box>
            <Typography variant='h4' textAlign={'center'} fontWeight={'bold'}>{dogNew.name}</Typography>
            <Typography variant='h6' textAlign={'center'} fontWeight={'bold'}>סטטוס אימוץ</Typography>
            {/* need to ad the phase of adoption */}
            <StepperComponnent options={["pending", "trial period", "adopted"]} currentStep={"pending"} />
            <Button variant='contained' color='primary' >פרסם כלב</Button>
          </Box>
        </Grid>
        <Grid item xs={9.5}>
          <DogProfileDetailes dog={dogNew} />
        </Grid>
      </>:
      <FallbackElement/>
      }

    </Grid>

  )
}
