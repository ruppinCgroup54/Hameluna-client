import { z } from "zod";


const dogSchema = z.object( {
  "chipNumber": z.string(),
  "numberId": z.number(),
  "name": z.string(),
  "dateOfBirth": z.string().datetime(),
  "gender": z.string(),
  "entranceDate": z.string().datetime(),
  "isAdoptable": true,
  "size": z.string(),
  "adopted": true,
  "isReturned": true,
  "cellId": z.number(),
  "color": z.array(z.string()),
  "breed": z.array(z.string()),
  "attributes": z.array(z.string()),
  "profileImage": z.string()
})

const adminSchema =  z.object({
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
}).required()

const addressSchema = z.object({
  "id": z.number(),
  city: z.string(),
  streetName: z.string(),
  houseNumber: z.coerce.number(),
  "region": z.string()
})

const cellSchema =  z.object({
  "number":  z.coerce.number(),
  "capacity": z.coerce.number(),
  "id": z.number(),
  "shelterNumber": z.number(),
  "dogsInCell": z.array(dogSchema)

})


export const requestSchema = z.object({
  "shelterId": z.number(),
  "adminDetails":adminSchema,
  "facebookUserName": z.string(),
  "facebookPassword": z.string(),
  "instagramUserName": z.string(),
  "instagramPassword": z.string(),
  "timeToReport": z.preprocess((val)=>new Date("1970-01-01T"+val+":00").toISOString(), z.string().datetime()),
  "name": z.string(),
  "photoUrl": z.string(),
  "address":addressSchema,
  "dailyRoutine": z.array(z.string()),
  "cells": z.array(cellSchema)

});