import React, { useState } from 'react'
import { Textinput } from '../../../components/Textinput'
import { useForm } from 'react-hook-form';
import { adoptionRequestSchema } from '../../../Data/Schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormStyle } from './ModalAddDog';
import { Autocomplete, Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid, Typography } from '@mui/material';
import AddressForm from './AddressForm';
import AutocompleteInput from '../../../components/AutocompleteInput';
import { EmailOutlined, MarkEmailRead, MarkEmailUnreadOutlined, Print, PrintOutlined } from '@mui/icons-material';
import { useEffect } from 'react';
import { update } from '@react-spring/web';
import { DEFAULT_OPTIONS } from '../../../utilis/useFetch';
import AlertComp from '../../../components/AlertComp';
import { convertKeysToLowercase } from '../../../utilis/Helper';
import useShelterContext from '../../../utilis/useShelterContext';
import useImageURL from '../../../utilis/useImageURL';


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

const requestUrl = import.meta.env.VITE_APP_SERVERURL + "AdoptionRequests"

const createNewAdoptionRequest = async (data) => {

  console.log('data', data)
  return await fetch(requestUrl, {
    ...DEFAULT_OPTIONS,
    method: "POST",
    body: JSON.stringify(data)
  })

}

const UpdateAdoptionRequest = async (data) => {

  return await fetch(requestUrl + "/" + data.requestId, {
    ...DEFAULT_OPTIONS,
    method: "PUT",
    body: JSON.stringify(data)
  })

}

export default function AdoptionForm({ defaultRequest, setOpenModal }) {

  const [openError, setOpenError] = useState({ open: false, text: "" })

  const { setTriggerFetch } = useShelterContext();

  defaultRequest.adopter = convertKeysToLowercase(defaultRequest.adopter)

  defaultRequest.adopter.address = convertKeysToLowercase(defaultRequest.adopter.address)

  const methods = useForm({
    defaultValues: defaultRequest,
    resolver: zodResolver(adoptionRequestSchema),
  });

  const { watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors, dirtyFields, isSubmitting }
  } = methods;

  const formData = watch();

  const submitForm = async (data) => {
    console.log('formData', formData)

    data.dog.isAdopted = true;


    const requestAns = data.requestId === -1 ? await createNewAdoptionRequest(data) : await UpdateAdoptionRequest(data);
    if (requestAns.ok) {
      // const ans = await requestAns.json();
      if (formData.mail) {
        await fetch(import.meta.env.VITE_APP_SERVERURL + `Mail`, {
          ...DEFAULT_OPTIONS,
          method: "POST",
          body: JSON.stringify(data)
        }).then(res => {
          if (!res.ok) {
            setOpenError({ open: true, text: "אופס, לא הצלחנו לשלוח את התעודה" })

          }
        })
      }

      if (formData.print) {
        let pdfw = window.open(useImageURL(`Files/${data.dog.shelterNumber}/${data.dog.numberId}_${data.dog.name}_אימוץ.pdf`), '_blank', 'fullscreen=1,channelmode=1,status=1,resizable=1');
      }

      setTriggerFetch(prev => prev + 1);
      setOpenModal();
    }
    else {
      if (requestAns.status === 409) {
        setOpenError({ open: true, text: "פרטי משתמש שגויים" })
      }


    }

  }
  const getUser = async (e) => {
    console.log('e', e)

    const adopterPhone = e.currentTarget.value;

    const res = await fetch(import.meta.env.VITE_APP_SERVERURL + `AdoptionRequests/adopter/${adopterPhone}/dog/${defaultRequest.dog.numberId}/`);
    if (res.ok) {
      const ans = await res.json();
      console.log('res', ans)
      setValue("adopter", ans.adopter, {
        shouldDirty: true,
        shouldValidate: true
      })
      setValue("sendDate", ans.sendDate)
      setValue("requestId", ans.requestId)
      setValue("dog", ans.dog)
    }
    else {
      const getAdopter = await fetch(import.meta.env.VITE_APP_SERVERURL + `Adopters/${adopterPhone}`);
      if (getAdopter.ok) {
        const ansAdopter = await getAdopter.json();
        setValue("adopter", ansAdopter, {
          shouldDirty: true,
          shouldValidate: true
        })

      }



    }
  }

  console.log('watch()', watch())

  return (
    <FormStyle sx={{ width: '100%', height: '100%', margin: 0, backgroundColor: '#D9D9D9' }}>
      <Typography variant='h5' fontWeight={"900"}>פרטי המאמץ</Typography>

      <Grid container component={'form'} onSubmit={handleSubmit(submitForm)} spacing={2} rowSpacing={2} >
        <Grid item xs={3}>
          <Textinput
            size='small'
            xs={3}
            {...register("adopter.phoneNumber", {
              onBlur: (e) => (defaultRequest.adopter?.phoneNumber === undefined && getUser(e))
            })}
            label="מספר פלאפון"
            error={!!errors.adopter?.phoneNumber}
            helperText={errors.adopter?.phoneNumber?.message}
          />
        </Grid>
        <Grid item xs={3}>
          <Textinput
            size='small'
            InputProps={{ ...register("adopter.firstName") }}
            label="שם פרטי"
            error={!!errors.adopter?.firstName}
            helperText={errors.adopter?.firstName?.message}
            InputLabelProps={{
              shrink: dirtyFields.adopter?.firstName
            }}
          />
        </Grid>
        <Grid item xs={3}>

          <Textinput
            size='small'
            {...register("adopter.lastName")}
            label="שם משפחה"
            error={!!errors.adopter?.lastName}
            helperText={errors.adopter?.lastName?.message}
            InputLabelProps={{
              shrink: dirtyFields.adopter?.lastName
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <Textinput
            size='small'
            {...register("adopter.email")}
            label="אימייל"
            error={!!errors.adopter?.email}
            helperText={errors.adopter?.email?.message}
            InputLabelProps={{
              shrink: dirtyFields.adopter?.email
            }}
          />
        </Grid>

        <Grid item xs={9}>
          <AddressForm {...methods} relativeObject={'adopter'} methods={methods} />
        </Grid>
        <Grid item xs={3}>
          <Textinput
            size='small'
            {...register("adopter.dateOfBirth")}
            label="תאריך לידה"
            type='date'
            error={!!errors.adopter?.dateOfBirth}
            helperText={errors.adopter?.dateOfBirth?.message}
            InputLabelProps={{
              shrink: dirtyFields.adopter?.dateOfBirth
            }}
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
            size='small'
            {...register("adopter.note")}
            label="הערות נוספות"
            error={!!errors.adopter?.note}
            helperText={errors.adopter?.note?.message}
            InputLabelProps={{
              shrink: dirtyFields.adopter?.note
            }}
          />
        </Grid>
        <Grid item xs={12} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} >
          <Box sx={{ display: 'flex', }}>
            <FormControlLabel
              control={
                <Checkbox
                  {...register("mail")}
                  icon={<EmailOutlined />}
                  checkedIcon={<MarkEmailRead />}
                />
              }
              label="שליחה למייל"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...register("print")}

                  icon={<PrintOutlined />}
                  checkedIcon={<Print />}
                />
              }
              label="הדפסת תעודה"
            />
          </Box>
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button
              variant="contained"
              type='submit'
              disabled={isSubmitting}
              sx={{ width: '100px' }}
            >
              סיום
            </Button>
            {isSubmitting && (
              <CircularProgress
                size={24}
                sx={{
                  color: 'primary.light',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <AlertComp isOpen={openError.open} color={'warning'} text={openError.text} type='error' handleClose={() => setOpenError({ open: false, text: "" })} />
    </FormStyle>
  )
}
