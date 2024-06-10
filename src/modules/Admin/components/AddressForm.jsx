
import React, { useEffect } from 'react'
import { Textinput } from '../../../components/Textinput'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Autocomplete, Box, Button, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import { AccountCircle, AdminPanelSettings, Email, Password, Phone } from '@mui/icons-material';
import useFetch from '../../../utilis/useFetch';
import AutocompleteInput from '../../../components/AutocompleteInput';



export default function AddressForm({ register, formState, relativeObject = "",methods }) {

  const { errors, dirtyFields } = formState;

  const objectErrors = relativeObject.length > 0 ? errors[relativeObject] : errors;
  const objectDirty = relativeObject.length > 0 ? dirtyFields[relativeObject] : dirtyFields;

  const cities = useFetch(import.meta.env.VITE_APP_SERVERURL + 'Data/Cities');

  useEffect(() => {
    console.log('ob', objectErrors)
  }, [cities])



  const submit = (data) => {
    console.log('data', data)
    sendData(data);
  }

  return (
    < >
      {relativeObject.length === 0 && <Typography variant='h6' color='primary.dark' sx={{ mb: 1 }}>
        כתובת
      </Typography>}
      <Box style={{
        width: '100%', display: 'grid', gap: "30px",
        gridTemplate: "60px/30% 40% 20%"
      }}>
        <AutocompleteInput {...methods} name={relativeObject + ".address.city"} label={"עיר"} data={cities.loading ? [] : cities.value} />
        {/* <Autocomplete
          size='small'
          options={cities.loading ? [] : cities.value}
          renderInput={(params) => <Textinput {...params}
            label="עיר"
            {...register(relativeObject + ".address.city")}
            error={!!objectErrors?.address?.city}
            helperText={objectErrors?.address?.city?.message} />}
        /> */}

        <Textinput {...register(relativeObject + ".address.streetName")}
          label="רחוב"
          size='small'
          error={!!objectErrors?.address?.streetName}
          helperText={objectErrors?.address?.streetName?.message}
          InputLabelProps={{
            shrink: objectDirty?.address?.streetName
          }} />

        <Textinput
          {...register(relativeObject + ".address.houseNumber")}
          label="מספר בית"
          size='small'
          type='number'
          error={!!objectErrors?.address?.houseNumber}
          helperText={objectErrors?.address?.houseNumber?.message}
          InputLabelProps={{
            shrink: objectDirty?.address?.streetName
          }} />


      </Box>
    </>
  )
}
