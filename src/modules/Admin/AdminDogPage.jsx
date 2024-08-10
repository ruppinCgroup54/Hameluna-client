import { Box, Button, CircularProgress, Grid, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddImage from '../../components/AddImage'
import { position } from 'stylis'
import { to } from '@react-spring/web'
import StepperComponnent from '../../components/StepperComponnent'
import DogProfileDetailes from './components/DogProfileDetailes'
import { useLoaderData, useLocation } from 'react-router-dom'
import useImageURL from '../../utilis/useImageURL'
import useFetch from '../../utilis/useFetch'
import FallbackElement from '../../components/FallbackElement'
import { object } from 'prop-types'
import { postFetch, putFetch } from '../../Data/Fetches'
import { FormStyle } from './components/ModalAddDog'
import { Textinput } from '../../components/Textinput'
import DogImages from './components/DogImages'
import { update } from 'firebase/database'


export default function AdminDogPage() {

  const [open, setOpen] = useState(false)

  const [loading, setLoading] = useState(false)

  const getStatus = {
    '': 'ממתין לאימוץ',
    'pending': 'בקשה בהמתנה',
    'trail periode': 'תקופת ניסיון',
    'adopted': 'אומץ'
  }
  const dogNew = useLoaderData();

  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_SERVERURL + 'Dogs/DogStatus/' + dogNew.numberId)
      .then((res) => {
        return res.text()
      })
      .then((text) => {
        console.log('text', text)
        setStatus(text)
      })

  }, [])


  const succesNote = (data) => {
    console.log('datasuc', data)

    dogNew.note = data.note;
    setLoading(false)

    setOpen(true);


  }
  const errorNote = (data) => {
    console.log('dataerr', data)
    setLoading(false)

    alert(data)
  }

  const openPublish = () => {
    setLoading(true)
    postFetch('Dogs/DogNote/' + dogNew.numberId, dogNew, succesNote, errorNote)

  }

  const handlePublish = ()=>{
    console.log('dognew', dogNew)
    putFetch('Dogs/' + dogNew.numberId, dogNew,()=>setOpen(false),(err)=>alert(err))
  }

  return (
    <Grid sx={{
      width: '90vw', margin: "15vh 5vw 0", height: '85vh',
    }} columnSpacing={2} container>

      {!dogNew.loading ?
        <>
          <Grid item xs={2.5} >
            <Box sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center',
              height: '95%', border: '1px solid', borderColor: "primary.main", borderRadius: '20px'
            }}>

              <Box sx={{ position: 'relative', marginBottom: '15vw' }}>

                <AddImage style={{ top: "0", left: 0, translate: '50%' }} defaultImg={useImageURL(dogNew.profileImage)} />
              </Box>
              <Typography variant='h4' textAlign={'center'} fontWeight={'bold'}>{dogNew.name}</Typography>
              <Typography variant='h6' textAlign={'center'} fontWeight={'bold'}>סטטוס אימוץ</Typography>
              {/* need to ad the phase of adoption */}
              <StepperComponnent options={Object.values(getStatus)} currentStep={getStatus[status]} />
              <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                  variant="contained"
                   color='primary'
                  disabled={loading}
                  onClick={openPublish}
                >
                  פרסם כלב
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={9.5}>
            <DogProfileDetailes dog={dogNew} />
          </Grid>
        </> :
        <FallbackElement />
      }

      <Modal open={open}
        onClose={() => setOpen(false)} className='flexBox-col' sx={{ alignItems: 'center' }}>
        <FormStyle style={{ width: 'clamp(200px, 70%, 700px' }} >
          <Box component={'form'} className='flexBox-col' onSubmit={handlePublish} sx={{ alignItems: 'center', gap: '24px', width: '100%' }}>

            <Box sx={{ width: 0.9 }}>

              <Textinput defaultValue={dogNew.note} fullWidth multiline maxRows={10} />
            </Box>
            <Button variant='contained' type='submit'  >פרסם אותי</Button>
          </Box>
        </FormStyle>
      </Modal>
    </Grid>

  )
}
