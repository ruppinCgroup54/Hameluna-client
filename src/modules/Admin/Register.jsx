import React, { useEffect, useState } from 'react'
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
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material'

const BackgroundImage = 'images/Layouts/LogIn.png'

const requestSchema = z.object({
  "shelterId": z.number(),
  "adminDetails": z.object({
    firstName: z
      .string()
      .regex(
        new RegExp("^[a-zA-Z\u0590-\u05FF\u200f\u200e ]+$"),
        "שם חייב להכיל אותיות בעברית או באנגלית"
      ),
    lastName: z
      .string()
      .regex(
        new RegExp("^[a-zA-Z\u0590-\u05FF\u200f\u200e ]+$"),
        "שם חייב להכיל אותיות בעברית או באנגלית"
      ),
    phoneNumber: z.string().regex(new RegExp("^05+[0-9]{8}$"), "מספר לא תקין"),
    email: z.string().email("אימייל לא תקין"),
    userName: z.string().max(12, "שם משתשמש לא ארוך יותר מ12 תווים"),
    password: z.string().max(20, "שם משתשמש לא ארוך יותר מ20 תווים")
  }),
  "facebookUserName": z.string(),
  "facebookPassword": z.string(),
  "instagramUserName": z.string(),
  "instagramPassword": z.string(),
  "timeToReport": z.string(),
  "name": z.string(),
  "photoUrl": z.string(),
  "address": z.object({
    "id": z.number(),
    city: z.string(),
    streetName: z.string(),
    houseNumber: z.string().regex(new RegExp("^[0-9]+$")),
    "region": z.string()
  }),
  "dailyRoutine": z.array(
    z.string()
  ),
  "cells": z.array(
    z.object({
      "number": z.number(),
      "capacity": z.number(),
      "id": z.number(),
      "shelterNumber": z.number(),
      "dogsInCell": z.array()

    })
  )

});

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

export default function Register() {

  const [activeStep, setActiveStep] = useState(0);

  const forms = ["פרטי מנהל", "פרטי כלבייה", "הוספת תאים"]

  const methods = useForm({
    defaultValues: defaultSchema,
    resolver: zodResolver(requestSchema),
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
          <AddImage {...methods} />
          <ShelterForm {...methods} />
          <br />
          <AddressForm {...methods} />
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

  useEffect(() => {
    console.log(watchRoutine)
  })

  console.log('errors', errors)
  const submit = (data) => {
    console.log('data', data)
  }
  return (
    <BackgroundLayout image={BackgroundImage} dir={"col"}  >

      <FormStyle style={{ position: "relative" ,height:'85vh'}} >
        <Box>
          <Stepper
            activeStep={activeStep}
            sx={{
              width: '100%',
              height: 40,
            }}
          >
            {forms.map((label) => (
              <Step
                sx={{
                  ':first-child': { pl: 0 },
                  ':last-child': { pr: 0 },
                }}
                key={label}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}  >
          {activeStep === forms.length ? (
            <Stack spacing={2} useFlexGap>
              <Typography variant="h1">📦</Typography>
              <Typography variant="h5">Thank you for your order!</Typography>
              <Typography variant="body1" color="text.secondary">
                Your order number is
                <strong>&nbsp;#140396</strong>. We have emailed your order
                confirmation and will update you once its shipped.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  alignSelf: 'start',
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                Go to my orders
              </Button>
            </Stack>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection:'row-reverse' ,
                  justifyContent: activeStep !== 0 ? 'space-between' : 'flex-start',
                  alignItems: 'end',
                  flexGrow: 1,
                  gap: 1,
                  pb: 3 ,
                  mt: 3 ,
                }}
              >
                <Button
                  startIcon={<ChevronLeftRounded />}
                  onClick={handleNext}
                  variant="contained" >
                  הבא
                </Button>

                {activeStep!==0 && <Button
                  startIcon={<ChevronRightRounded />}
                  onClick={handleBack}
                  variant="outlined"
                >
                  הקודם
                </Button>}

              </Box>
            </>)}
          {activeStep === forms.length - 1 && < Button variant='contained' type='submit'>שמור</Button>}
        </form>

      </FormStyle>

    </BackgroundLayout >
  )
}
