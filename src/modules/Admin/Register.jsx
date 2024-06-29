import React, { useEffect, useRef, useState } from 'react'
import BackgroundLayout from '../../layouts/BackgroundLayout'
import { FormStyle } from './components/ModalAddDog'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import AdminForm from './components/AdminForm'
import ShelterForm from './components/ShelterForm'
import AddressForm from './components/AddressForm'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import AddImage from '../../components/AddImage'
import CellsForm from './components/CellsForm'
import { ChevronLeftRounded, ChevronRightRounded, ForkRightOutlined } from '@mui/icons-material'
import { ShelterSchema } from '../../Data/Schemas'
import { useNavigate } from 'react-router-dom'


const BackgroundImage = 'images/Layouts/LogIn.png'

const defaultSchema = {
  "shelterId": 0,
  "adminDetails": {
    "phoneNumber": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "userName": "",
    "password": ""
  },
  "facebookUserName": "",
  "facebookPassword": "",
  "instagramUserName": "",
  "instagramPassword": "",
  "timeToReport": "17:00",
  "name": "",
  "photoUrl": "",
  "address": {
    "id": 0,
    "houseNumber": 0,
    "streetName": "",
    "city": "",
    "region": ""
  },
  "dailyRoutine": [],
  "cells": [
    {
      "number": 0,
      "capacity": 0,
      "id": 0,
      "shelterNumber": 0,
      "dogsInCell": []
    }
  ]
}
const uploadFile = async (image) => {
  // let data = e.currentTarget.stam.files
  const data = new FormData();
  const files = [image]

  if (files.length) {
    for (let i = 0; i < files.length; i++) {
      console.log('files[i]', files[i])
      data.append("images", files[i]);
    }
  }

  const res = await fetch(import.meta.env.VITE_APP_SERVERURL + 'Images/shelterImage', {
    method: "POST",
    body: data,
  })

  if (res.ok) {
    return await res.text()
  }
  return ""
}

export default function Register() {

  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const [image, setImage] = useState();

  const forms = ["פרטי מנהל", "פרטי כלבייה", "הוספת תאים"]

  const methods = useForm({
    defaultValues: defaultSchema,
    resolver: zodResolver(ShelterSchema),
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AdminForm {...methods} />;
      case 1:
        return <>
          <AddImage getImage={setImage} {...methods} style={{ top: "-5vh", right: '-5vh' }} />
          <ShelterForm {...methods} />
          <br />
          <AddressForm {...methods} methods={methods}/>
        </>;
      case 2:
        return <CellsForm {...methods} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  const watchRoutine = watch();

  // useEffect(() => {
  //   console.log(watchRoutine)
  // })

  console.log('errors', errors)
  const submit = async (data) => {

    data.photoUrl = await uploadFile(image);
    console.log('data', data)

    const res = await fetch(import.meta.env.VITE_APP_SERVERURL + "shelters", {
      method: 'POST',
      headers: { "Content-Type": "application/json", "dataType": "json" },
      body: JSON.stringify(data)
    })

    if (res.ok) {
      const shelter = await res.json();
      let loginDet = {
        phone: shelter.adminDetails.phoneNumber,
        password: shelter.adminDetails.password,
        shelterNumber: shelter.shelterId
      };
      localStorage.setItem("loginDet", JSON.stringify(loginDet))
      handleNext()
    }

  }
  return (
    <BackgroundLayout image={BackgroundImage} dir={"col"}  >

      <FormStyle style={{ position: "relative", height: '90vh', display: 'flex', top: '-5vh', flexDirection: 'column', justifyContent: 'space-between' }} >
        <Box>
          <Stepper
            activeStep={activeStep}
            sx={{
              width: '100%',
              height: 30,
            }}
          >
            {forms.map((label) => (
              <Step
                sx={{
                  ':first-of-type': { pl: 0 },
                  ':last-of-type': { pr: 0 },
                }}
                key={label}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <form onSubmit={handleSubmit(submit)} style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}  >
          {activeStep === forms.length ? (
            <Stack spacing={2} useFlexGap>
              <img src="/images/WelcomeDog.png" width={200} />
              <Typography variant="h5">ברוכים הבאים למלונה</Typography>
              <Typography variant="body1" color="text.secondary">
                איזה כיף שהצטרפתם אלינו,
                <br /> כעת תוכלו לעבור לדף הבית ולהתחיל לנהל את הכלבייה שלכם בצורה נוחה ואיכותית
              </Typography>
              <Button
                variant="contained"
                sx={{
                  alignSelf: 'start',
                  width: { xs: '100%', sm: 'auto' },
                }}
                onClick={() => navigate('/admin/shelter')}
              >
                למעבר לכלבייה
              </Button>
            </Stack>
          ) : (
            <>
              {getStepContent(activeStep)}

            </>)}
          {activeStep !== forms.length && <Box
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              justifyContent: activeStep !== 0 ? 'space-between' : 'flex-start',
              alignItems: 'end',
              flexGrow: 1,
              gap: 1,
              pb: 3,
              mt: 3,
            }}
          >

            {activeStep === forms.length - 1 &&
              < Button variant='contained' type='submit'
              >שמור</Button>}
            {activeStep !== forms.length - 1 && <Button
              startIcon={<ChevronLeftRounded />}
              onClick={handleNext}
              variant="contained"
              type='button'>
              הבא
            </Button>}

            {activeStep !== 0 && <Button
              startIcon={<ChevronRightRounded />}
              onClick={handleBack}
              variant="outlined"
            >
              הקודם
            </Button>}

          </Box>}
        </form>

      </FormStyle>

    </BackgroundLayout >
  )
}
