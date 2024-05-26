import React, { useEffect, useState } from 'react'
import BackgroundLayout from '../../layouts/BackgroundLayout'
import { FormStyle } from './components/ModalAddDog'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import AdminForm from './components/AdminForm'
import ShelterForm from './components/ShelterForm'
import AddressForm from './components/AddressForm'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import AddImage from '../../components/AddImage'

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

}).required();

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


  const methods = useForm({
    defaultValues: defaultSchema,
    resolver: zodResolver(requestSchema),
  });

  const {
    watch,
    register,
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
    <BackgroundLayout image={BackgroundImage} dir={"col"} style={{ justifyContent: "center" }} >

      <FormStyle style={{position:"relative"}} >

        <form onSubmit={handleSubmit(submit)} >

          <AdminForm {...methods} />
          <br />
          
          <AddImage/>
          <ShelterForm {...methods} />
          <br />
          <AddressForm {...methods} />
          <br />
          <Button variant='contained' type='submit'>שמור</Button>
        </form>

      </FormStyle>

    </BackgroundLayout>
  )
}
