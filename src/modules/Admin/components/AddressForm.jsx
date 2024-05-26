
import React, { useEffect } from 'react'
import { Textinput } from '../../../components/Textinput'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Autocomplete, Box, Button, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import { AccountCircle, AdminPanelSettings, Email, Password, Phone } from '@mui/icons-material';
import useFetch from '../../../utilis/useFetch';


const requestSchema = z.object({
 

});


export default function AddressForm({ register,formState }) {

  const {errors}=formState;

  const cities = useFetch(import.meta.env.VITE_APP_SERVERURL + 'Data/Cities');

  useEffect(() => {

    console.log('citys.value', cities.value)
  }, [cities])



  const submit = (data) => {
    console.log('data', data)
    sendData(data);
  }

  return (
    < >
 <Typography variant='h6' color='primary.dark' sx={{ mb: 3 }}>
        כתובת
      </Typography>
      <Box  style={{
        width: '100%', display: 'grid', gap: "30px",
        gridTemplate: "60px/30% 40% 20%"
      }}>

        <Autocomplete
          options={cities.loading? []:cities.value}
          renderInput={(params) => <Textinput {...params}
            label="עיר"
            {...register("address.city")}
            error={!!errors.address?.city}
            helperText={errors.address?.city?.message} />}
        />

        <Textinput {...register("address.streetName")}
          label="רחוב"
          error={!!errors.address?.streetName}
          helperText={errors.address?.streetName?.message} />

        <Textinput
          {...register("address.houseNumber")}
          label="מספר בית"
          type='number'
          error={!!errors.address?.houseNumber}
          helperText={errors.address?.houseNumber?.message} />


      </Box>
    </>
  )
}
