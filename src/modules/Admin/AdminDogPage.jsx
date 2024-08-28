import { Box, Button, CircularProgress, Grid, IconButton, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddImage from '../../components/AddImage'
import StepperComponnent from '../../components/StepperComponnent'
import DogProfileDetailes from './components/DogProfileDetailes'
import { useLoaderData, useRevalidator } from 'react-router-dom'
import useImageURL from '../../utilis/useImageURL'
import FallbackElement from '../../components/FallbackElement'
import { postFetch, putFetch } from '../../Data/Fetches'
import { FormStyle } from './components/ModalAddDog'
import { Textinput } from '../../components/Textinput'
import { ContentCopy, ContentCopyOutlined, Facebook, Instagram } from '@mui/icons-material'
import AlertComp from '../../components/AlertComp'



export default function AdminDogPage() {

  const [open, setOpen] = useState(false)

  const [openCopy, setOpenCopy] = useState(false)

  const [loading, setLoading] = useState(false)

  let revalidator = useRevalidator();

  const getStatus = {
    '': 'ממתין לאימוץ',
    'pending': 'בקשה בהמתנה',
    'trial period': 'תקופת ניסיון',
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

  const noteSucc = () => {
    setOpen(false);
    revalidator.revalidate()
  }

  const handlePublish = () => {
    console.log('dognew', dogNew)
    dogNew.isAdoptable = true;
    putFetch('Dogs/' + dogNew.numberId, dogNew, noteSucc, (err) => alert(err))
  }

  const CopyNote = () => {
    navigator.clipboard.writeText(dogNew.note);
    setOpenCopy(true)
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
              {dogNew.isAdoptable ? <StepperComponnent options={Object.values(getStatus)} currentStep={getStatus[status]} /> :
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
                </Box>}
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

            <Box sx={{ width: 0.9, position: 'relative', "&:hover .MuiIconButton-root": { opacity: 1, transition: "opacity 0.3s linear" } }}>
              {/* <Button onClick={publishFacebook}>פרסם אותי </Button> */}
              <Textinput defaultValue={dogNew.note} fullWidth multiline maxRows={10} />
              <IconButton onClick={CopyNote} sx={{ position: 'absolute', right: 10, top: 10, opacity: 0, transition: "opacity 0.3s linear" }}>
                <ContentCopyOutlined color='primary' />
              </IconButton>
              <Box sx={{"& .MuiSnackbar-root":{width:'fit-content', bottom:0}}}>

                <AlertComp color= 'info' isOpen={openCopy} text={"הטקסט הועתק"} type='info' handleClose={() => setOpenCopy(false)} />
              </Box>
            </Box>
            <Box className="flexBox-row" sx={{gap:'16px'}}>
              <Button variant='contained' href='https://www.facebook.com/' target='_blank' endIcon={<Facebook/>}>פרסם אותי </Button>
              <Button variant='contained' href='https://www.instagram.com/' target='_blank' endIcon={<Instagram/>}>פרסם אותי </Button>
            </Box>
          </Box>
        </FormStyle>
      </Modal>
    </Grid >

  )
}
