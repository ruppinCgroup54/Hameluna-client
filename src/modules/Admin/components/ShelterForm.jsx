
import React, { useState } from 'react'
import { Textinput } from '../../../components/Textinput'
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Autocomplete, Box, Button, InputAdornment, Typography } from '@mui/material';
import { AccountCircle, AdminPanelSettings, Email, Password, Phone } from '@mui/icons-material';
import AddImage from '../../../components/AddImage';



export default function ShelterForm({ register, formState, control }) {
  const { errors } = formState;

  return (
    <>
      <Typography variant='h3' color='primary.dark' sx={{ textAlign: 'center', mb: 3 }}>
        פרטי הכלבייה
      </Typography>
      < Box sx={{ width: '100%', display: 'grid', gap: "30px 10%", display: 'flex' ,flexWrap:'wrap',justifyContent:'center'}}>

        <Textinput {...register("name")}
          sx={{ width: '45%' }}
          label="שם הכלבייה"
          error={!!errors.name}
          helperText={errors.name?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            ),
          }} />

        <Textinput {...register("timeToReport")}
          sx={{ width: '45%' }}
          label="זמן דיווח חריגות"
          type='time'
          error={!!errors.timeToReport}
          helperText={errors.timeToReport?.message}
        />

        <Controller
          control={control}
          name='dailyRoutine'
          render={({ field: { onChange, value } }) => (
            <Autocomplete
            sx={{width:"50%"}}
              multiple
              options={["1", "2", "3", "4"]}
              getOptionLabel={option => option}
              renderInput={params => (
                <Textinput
                  {...params}
                  label="שגרת כלב"
                  error={!!errors.dailyRoutine}
                  helperText={errors.dailyRoutine?.message}
                />
              )}
              onChange={(event, data) => {
                onChange(data)
                return data;
              }}
              defaultValue={[]}
            />
          )}


        />

        {/* <Autocomplete

          value={selectedValues}
          options={allValues}
          multiple
          {...register("dailyRoutine")}
          renderInput={(params) => <Textinput {...params}
            label="שגרת כלב"
            error={!!errors.address?.city}
            helperText={errors.address?.city?.message} />}
        /> */}

      </Box>
    </>
  )
}
