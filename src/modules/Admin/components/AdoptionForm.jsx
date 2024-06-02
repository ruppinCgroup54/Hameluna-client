import React from 'react'
import { Textinput } from '../../../components/Textinput'
import { useForm } from 'react-hook-form';
import { adoptionRequestSchema } from '../../../Data/Schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormStyle } from './ModalAddDog';
import { Autocomplete, Box, Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import AddressForm from './AddressForm';
import AutocompleteInput from '../../../components/AutocompleteInput';
import { EmailOutlined, MarkEmailRead, MarkEmailUnreadOutlined, Print, PrintOutlined } from '@mui/icons-material';
import { useEffect } from 'react';


const AdopterFields = [
  {
    label: 'היכן יגור הכלב?',
    name: 'adopter.dogsPlace',
    data: ["", 'בבית', 'בחצר', 'במלונה']
  }, {
    label: 'חיות מחמד נוספות?',
    name: 'adopter.additionalPets',
    data: ["", 'כלב', 'חתול', 'כלב וחתול', 'אחר']
  }, {
    label: 'ניסיון בגידול כלבים בעבר?',
    name: 'adopter.experience',
    data: ["", 'יש ניסיון', 'ניסיון חלקי', ' אין ניסיון']
  }, {
    label: 'מי גר בבית?',
    name: 'adopter.houseMembers',
    data: ["", 'זוג', 'זוג עם ילדים', 'בן אדם יחיד']
  },
]


export default function AdoptionForm({ defaultRequest }) {




  const methods = useForm({
    defaultValues: defaultRequest,
    resolver: zodResolver(adoptionRequestSchema),
  });

  const { watch,
    handleSubmit,
    register,
    formState: { errors }
  } = methods;


  const formData = watch();

  useEffect(() => {
    console.log('formData', formData)
  }, [formData])

  const submitForm = () => {

  }

  return (
    <FormStyle sx={{ width: '100%', height: '100%', margin: 0, backgroundColor: '#D9D9D9' }}>
      <Typography variant='h5' fontWeight={"900"}>פרטי המאמץ</Typography>

      <Grid container component={'form'} onSubmit={handleSubmit(submitForm)} spacing={2} rowSpacing={2} >
        <Grid item xs={3}>
          <Textinput
            xs={3}
            // onBlur={fetchAdpterData}
            {...register("adopter.phoneNumber")}
            label="מספר פלאפון"
            error={!!errors.adopter?.phoneNumber}
            helperText={errors.adopter?.phoneNumber?.message}
          />
        </Grid>
        <Grid item xs={3}>
          <Textinput
            InputProps={{ ...register("adopter.firstName") }}
            label="שם פרטי"
            error={!!errors.adopter?.firstName}
            helperText={errors.adopter?.firstName?.message}
          />
        </Grid>
        <Grid item xs={3}>
          <Textinput
            {...register("adopter.lastName")}
            label="שם משפחה"
            error={!!errors.adopter?.lastName}
            helperText={errors.adopter?.lastName?.message}
          />
        </Grid>

        <Grid item xs={3}>
          <Textinput
            {...register("adopter.email")}
            label="אימייל"
            error={!!errors.adopter?.email}
            helperText={errors.adopter?.email?.message}
          />
        </Grid>

        <Grid item xs={9}>
          <AddressForm {...methods} relativeObject={'adopter'} />
        </Grid>
        <Grid item xs={3}>
          <Textinput
            {...register("adopter.dateOfBirth")}
            label="תאריך לידה"
            type='date'
            error={!!errors.adopter?.dateOfBirth}
            helperText={errors.adopter?.dateOfBirth?.message}
          />
        </Grid>
        {
          AdopterFields.map((field) => {
            return <Grid key={field.name} item xs={6}>
              <AutocompleteInput {...field} {...methods} />
            </Grid>
          })
        }

        <Grid item xs={12}>
          <Textinput
            {...register("adopter.note")}
            label="הערות נוספות"
            error={!!errors.adopter?.note}
            helperText={errors.adopter?.note?.message}
          />
        </Grid>
        <Grid item xs={12} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} >
          <Box sx={{ display: 'flex', }}>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<EmailOutlined />}
                  checkedIcon={<MarkEmailRead />}
                />
              }
              label="שליחה למייל"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<PrintOutlined />}
                  checkedIcon={<Print />}
                />
              }
              label="הדפסת תעודה"
            />
          </Box>
          <Button variant='contained' type='submit' sx={{ width: '100px' }} >סיום</Button>
        </Grid>
      </Grid>
    </FormStyle>
  )
}
