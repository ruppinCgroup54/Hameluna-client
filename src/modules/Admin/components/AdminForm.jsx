import React from 'react'
import { Textinput } from '../../../components/Textinput'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, InputAdornment, Typography } from '@mui/material';
import { AccountCircle, AdminPanelSettings, Email, Password, Phone } from '@mui/icons-material';


const requestSchema = z.object({
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
});


export default function AdminForm({ sendData }) {
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm({
    resolver: zodResolver(requestSchema),
  });

  const submit = (data) => {
    sendData(data);
  }

  return (
    < >
      <Typography variant='h3' color='primary.dark' sx={{ textAlign: 'center', mb: 3 }}>
        פרטי מנהל
      </Typography>
      <form onSubmit={handleSubmit(submit)} style={{ width: '100%', display: 'grid', gap: "20px 20px", gridTemplate: "50px/ auto auto" }}>

        <Textinput {...register("firstName")}
          label="שם פרטי"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            ),
          }} />

        <Textinput {...register("lastName")}
          label="שם משפחה"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            ),
          }} />

        <Textinput
          {...register("phoneNumber")}
          label="מספר פלאפון"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Phone />
              </InputAdornment>
            ),
          }}
        />


        <Textinput {...register("email")}
          label="אימייל"
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Email />
              </InputAdornment>
            ),
          }} />

        <Textinput {...register("userName")}
          label="שם משתמש"
          error={!!errors.userName}
          helperText={errors.userName?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AdminPanelSettings />
              </InputAdornment>
            ),
          }} />

        <Textinput {...register("password")}
          label="סיסמה"
          type='password'
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Password />
              </InputAdornment>
            ),
          }} />

        <Button variant='contained' type='submit'>שמור</Button>
      </form>
    </>
  )
}
