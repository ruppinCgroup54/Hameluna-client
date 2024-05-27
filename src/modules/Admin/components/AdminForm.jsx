import React from 'react'
import { Textinput } from '../../../components/Textinput'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, InputAdornment, Typography } from '@mui/material';
import { AccountCircle, AdminPanelSettings, Email, Password, Phone } from '@mui/icons-material';



export default function AdminForm({ register,formState }) {

  const {errors} = formState;

  return (
    < >
      <Typography variant='h3' color='primary.dark' sx={{ textAlign: 'center', mb: 3 }}>
        פרטי מנהל
      </Typography>
      <Box style={{ width: '100%', display: 'grid', gap: "30px", gridTemplate: "50px/ auto auto" }}>

        <Textinput {...register("adminDetails.firstName")}
          label="שם פרטי"
          error={!!errors.adminDetails?.firstName}
          helperText={errors.adminDetails?.firstName?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            ),
          }} />

        <Textinput {...register("adminDetails.lastName")}
          label="שם משפחה"
          error={!!errors.adminDetails?.lastName}
          helperText={errors.adminDetails?.lastName?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            ),
          }} />

        <Textinput
          {...register("adminDetails.phoneNumber")}
          label="מספר פלאפון"
          error={!!errors.adminDetails?.phoneNumber}
          helperText={errors.adminDetails?.phoneNumber?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Phone />
              </InputAdornment>
            ),
          }}
        />


        <Textinput {...register("adminDetails.email")}
          label="אימייל"
          error={!!errors.adminDetails?.email}
          helperText={errors.adminDetails?.email?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Email />
              </InputAdornment>
            ),
          }} />

        <Textinput {...register("adminDetails.userName")}
          label="שם משתמש"
          error={!!errors.adminDetails?.userName}
          helperText={errors.adminDetails?.userName?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AdminPanelSettings />
              </InputAdornment>
            ),
          }} />

        <Textinput {...register("adminDetails.password")}
          label="סיסמה"
          type='password'
          error={!!errors.adminDetails?.password}
          helperText={errors.adminDetails?.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Password />
              </InputAdornment>
            ),
          }} />

      </Box>
    </>
  )
}
