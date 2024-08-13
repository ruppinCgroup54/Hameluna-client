import dayjs from "dayjs";
import { date, z } from "zod";


export const dogSchema = z.object({
  "chipNumber": z.string(),
  "numberId": z.number(),
  "name": z.string(),
  "dateOfBirth": z.preprocess((val) => new Date(val).toISOString(), z.string().datetime()),
  "gender": z.string(),
  "entranceDate": z.preprocess((val) => new Date(val).toISOString(), z.string().datetime()),
  "size": z.string(),
  "adopted": z.boolean(),
  "isReturned": z.boolean(),
  "cellId": z.number(),
  "color": z.array(z.string()).default([""]),
  "breed": z.array(z.string()).default([""]),
  "attributes": z.array(z.string()).default([""]),
  "profileImage": z.string(),
  "shelterNumber":z.number(),
  "note":z.string()
})

const adminSchema = z.object({
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
  userName: z.string().max(12, "שם משתשמש לא ארוך יותר מ12 תווים").min(1,"שם משתמש חייב להכיל לפחות תו אחד"),
  password: z.string().max(20, "שם משתשמש לא ארוך יותר מ20 תווים").min(1,"סיסמא חייבת להכיל לפחות תו אחד")
}).required()

const addressSchema = z.object({
  "id": z.number(),
  city: z.string(),
  streetName: z.string(),
  houseNumber: z.coerce.number(),
  "region": z.string().default("")
}).nullable()

const cellSchema = z.object({
  "number": z.coerce.number(),
  "capacity": z.coerce.number(),
  "id": z.number(),
  "shelterNumber": z.number(),
  "dogsInCell": z.array(dogSchema)

})


export const ShelterSchema = z.object({
  "shelterId": z.number(),
  "adminDetails": adminSchema,
  "facebookUserName": z.string(),
  "facebookPassword": z.string(),
  "instagramUserName": z.string(),
  "instagramPassword": z.string(),
  "timeToReport": z.preprocess((val) => new Date("1970-01-01T" + val + ":00").toISOString(), z.string().datetime()),
  "name": z.string().min(1,"שם הכלביה חייב להכיל לפחות אות אחת").max(20,'שם הכלבייה לא יכול להכיל יותר מ-20 תווים'),
  "photoUrl": z.string(),
  "address": addressSchema,
  "dailyRoutine": z.array(z.string()),
  "cells": z.array(cellSchema)

});


export const adopterSchema = z.object({
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
  "dateOfBirth":  z.preprocess((val) => new Date().toISOString(), z.string().datetime()),
  "houseMembers": z.string({required_error:"שדה חובה"}) ,
  "dogsPlace": z.string({required_error:"שדה חובה"}),
  "additionalPets": z.string({required_error:"שדה חובה"}),
  "experience": z.string({required_error:"שדה חובה"}),
  "note": z.string({required_error:"שדה חובה"}),
  "address": addressSchema
})

export const adoptionRequestSchema=z.object({
  "requestId": z.number(),
  "adopter": adopterSchema,
  "sendDate":  z.preprocess((val) => new Date().toISOString(), z.string().datetime()),
  "dog":dogSchema ,
  "status": z.string()
})

export const toDoSchema =z.object({
  "toDoId": z.number(),
  "done": z.boolean().default(false),
  "doDate":  z.preprocess((val) => {
    console.log( dayjs(val).format('YYYY-MM-DDTHH:mm:ss.sss[Z]'))
    return  dayjs(val).format('YYYY-MM-DDTHH:mm:ss.sss[Z]')
  }, z.string().datetime()),
  "title":z.string() ,
  "repetition": z.coerce.number(),
  "shelterNumber": z.number(),
  "description": z.string()
})