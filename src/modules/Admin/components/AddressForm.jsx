
import React, { useEffect } from 'react'
import { Textinput } from '../../../components/Textinput'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, InputAdornment, MenuItem, Typography } from '@mui/material';
import { AccountCircle, AdminPanelSettings, Email, Password, Phone } from '@mui/icons-material';
import useFetch from '../../../utilis/useFetch';


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


export default function AddressForm({ sendData }) {

  const cities = useFetch(import.meta.env.VITE_APP_SERVERURL + 'Data/Cities');

  useEffect(() => {

    console.log('citys.value', cities.value)
  }, [cities])


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(requestSchema),
  });

  const submit = (data) => {
    sendData(data);
  }

  return (
    < >

      <form onSubmit={handleSubmit(submit)} style={{
        width: '100%', display: 'grid', gap: "5%",
        gridTemplate: "60px/30% 40% 20%"
      }}>

        <Textinput {...register("city")}
          label="עיר"
          select
          error={!!errors.firstName}
          helperText={errors.firstName?.message} >
          <MenuItem value={""}>

          </MenuItem>
          {
            cities.value?.map((v) => 
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            )
          }
        </Textinput>

        <Textinput {...register("houseNumber")}
          label="רחוב"
          error={!!errors.lastName}
          helperText={errors.lastName?.message} />

        <Textinput
          {...register("streetName")}
          label="מספר בית"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message} />

      </form>
    </>
  )
}
