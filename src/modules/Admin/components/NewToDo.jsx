import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toDoSchema } from '../../../Data/Schemas'
import { FormStyle } from './ModalAddDog';
import { Textinput } from '../../../components/Textinput';
import dayjs, { Dayjs } from 'dayjs';
import DateInput from '../../../components/DateInput';
import { DatePickerToolbar } from '@mui/x-date-pickers';
import { DateTimeInput } from '../../../components/DateTimeInput';
import { Box, Button, Typography } from '@mui/material';
import { postFetch } from '../../../Data/Fetches';

export const NewToDo = ({ shelterNumber,handleSuccess }) => {
  const methods = useForm({
    defaultValues: {
      toDoId:-1,
      shelterNumber,
      doDate: new Date().toLocaleString(),
      done:false,
    },
    resolver: zodResolver(toDoSchema),
  });
  const { watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors, dirtyFields }
  } = methods
 
  console.log('errors', errors)
  console.log('watch', watch())

  const saveTodo=(data)=>{

    console.log('data', data)
    postFetch('Todos',data,successPost,errorPost)

  }

  const successPost=(data)=>{
    console.log('data', data)
    handleSuccess(false)

  }
  const errorPost=(error)=>{
    console.log('err', error)

  }

  return (
    <FormStyle component={'form'} sx={{ mx:'auto', width:'400px' }} onSubmit={handleSubmit(saveTodo)}>
      <Typography variant='h6' textAlign={'center'}>הוספת משימה</Typography>
        <DateTimeInput {...methods}
          label="תאריך יעד"
          name='doDate'
        />
      <Textinput {...register("title")}
        label="משימה"
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <Textinput {...register("description")}
        label="תיאור"
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <Textinput {...register("repetition")}
        label="מספר חזרות"
        type='number'
        error={!!errors.repetition}
        helperText={errors.repetition?.message}
      />
      <Button variant='outlined' type='submit'>שמור</Button>
    </FormStyle>
  )
}
