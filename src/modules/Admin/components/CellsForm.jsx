import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react'
import { Textinput } from '../../../components/Textinput';
import { useFieldArray } from 'react-hook-form';
import { AddBox, DeleteForever } from '@mui/icons-material';

export default function CellsForm({ register, formState, control }) {
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cells", // unique name for your Field Array
  });

  return (
    <>
     <Typography variant='h3' color='primary.dark' sx={{ textAlign: 'center', mb: 1 }}>
        הוספת תאים
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', rowGap: '50px', columnGap: 'calc(20% / 3)', width: '100%',height:'45vh', overflow:'scroll'}}>

        {
          fields.map((c, i) =>
            <Box key={c.id}
              sx={{
                display: 'flex', marginTop: '60px', flexWrap: 'wrap', gap: '20px', width: '20%', padding: '10px', borderRadius: '15px',
                border: (theme) => `2px solid ${theme.palette.primary.main}`,height:'fit-content',
                justifyContent: 'center', position: 'relative',
                "&:hover": {
                  "& .MuiButtonBase-root": {
                    transform: "translateY(0)",
                    opacity: 1
                  }
                }
              }} >
              <Textinput
                {...register(`cells[${i}].number`)}
                label="מספר תא"
                error={!!errors.cells?.[i].number}
                helperText={errors.cells?.[i].number.message}
                type='number'
              />
              <Textinput
                {...register(`cells[${i}].capacity`)}
                label="קיבולת"
                error={!!errors.cells?.[i].capacity}
                helperText={errors.cells?.[i].capacity}
                type='number'

              />

              <IconButton onClick={() => remove(i)} sx={{
                position: 'absolute', top: '-50px',
                transform: 'translateY(20%)',
                opacity: 0,
                transition: 'transform 0.5s ,opacity 0.5s'
              }}>
                <DeleteForever color='error' fontSize='large' />
              </IconButton>

            </Box>)
        }

        <Button
        sx={{height:'fit-content',marginTop:'110px'}}
         onClick={() => append({
          "number": 0,
          "capacity": 0,
          "id": 0,
          "shelterNumber": 0,
          "dogsInCell": []
        })}>
          <AddBox fontSize='large'  />
        </Button>
      </Box>
    </>
  )
}
