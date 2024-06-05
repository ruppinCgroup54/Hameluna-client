import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import AddImage from '../../components/AddImage'
import { position } from 'stylis'
import { to } from '@react-spring/web'
import StepperComponnent from '../../components/StepperComponnent'
import DogProfileDetailes from './components/DogProfileDetailes'


export default function AdminDogPage() {



  return (
    <Grid sx={{
      width: '90%', margin: "0 5vw 0", paddingTop: '100px', height: '100vh',
    }} columnSpacing={2} container>
      <Grid item xs={2.5} >
        <Box sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center',
          height: '95%', border: '1px solid', borderColor: "primary.main", borderRadius: '20px'
        }}>

          <Box sx={{ position: 'relative', marginBottom: '15vw' }}>

            <AddImage style={{ top: "0", right: '50%', translate: '50%' }} />
          </Box>
          <Typography variant='h4' textAlign={'center'} fontWeight={'bold'}>סימבה</Typography>
          <Typography variant='h6' textAlign={'center'} fontWeight={'bold'}>סטטוס אימוץ</Typography>
          <StepperComponnent options={["pending", "trial period", "adopted"]} currentStep={"pending"} />
          <Button variant='contained' color='primary' >פרסם כלב</Button>
        </Box>
      </Grid>
      <Grid item xs={9.5}>
        <DogProfileDetailes />
      </Grid>

    </Grid>

  )
}
