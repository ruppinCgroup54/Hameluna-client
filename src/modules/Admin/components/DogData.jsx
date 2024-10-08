import React, { useState } from 'react'
import { dogSchema } from '../../../Data/Schemas';
import { Box, Button, CircularProgress, Typography, } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textinput } from '../../../components/Textinput';
import AutocompleteInput from '../../../components/AutocompleteInput';
import { date } from 'zod';
import { Edit, Save } from '@mui/icons-material';
import useFetch, { DEFAULT_OPTIONS } from '../../../utilis/useFetch';
import { set } from 'firebase/database';
import DateInput from '../../../components/DateInput';
import { DateTimeInput } from '../../../components/DateTimeInput';
import dayjs from 'dayjs';

export default function DogData({ dog }) {

  const [isReadOnly, setIsReadOnly] = useState(true);

  const methods = useForm({
    defaultValues: dog,
    resolver: zodResolver(dogSchema),
  });

  const { watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors, dirtyFields, isLoading }
  } = methods;


  const getList = (name) => {
    let data = useFetch(import.meta.env.VITE_APP_SERVERURL + 'Data/' + name)
    console.log('first', data.error)
    return data.value
  }
  const filedsToShow = [
    {
      name: "chipNumber",
      label: "מספר צ'יפ",
      isDropDown: false,
    }, {
      name: "age",
      label: "גיל",
      isDropDown: false,
    }, {
      name: "dateOfBirth",
      label: "תאריך לידה",
      isDropDown: false,
      isDate: true
    }, {
      name: "size",
      label: "גודל",
      isDropDown: false,
    }, {
      name: "entranceDate",
      label: "תאריך הגעה",
      isDropDown: false,
      isDate: true

    }, {
      name: "color",
      label: "צבע",
      isDropDown: true,
      isMulti: true,
      data: getList("colors")
    }, {
      name: "breed",
      label: "גזע",
      isDropDown: true,
      isMulti: true,
      data: getList("Breeds")
    }, {
      name: "gender",
      label: "מין",
      isDropDown: true,
      isMulti: false,
      data: ['זכר', 'נקבה']
    }, {
      name: "attributes",
      label: "תכונות",
      isDropDown: true,
      isMulti: true,
      data: getList("Characteristics")
    }, {
      name: "isReturned",
      label: "כלב חוזר?",
      isDropDown: false,
      isMulti: false
    },
  ]

  const renderFileds = () => {

    return filedsToShow.map((f, i) => {

      if (f.isDate) {
        return <DateTimeInput key={i} {...methods} label={f.label} defaultValue={dog[f.name]} name={f.name} disabled={isReadOnly} 
                      disablePast={false} isDateOnly={true}/>

      }

      if (f.isDropDown) {
        return <AutocompleteInput key={i} {...methods} label={f.label} name={f.name} data={f.data} isMulti={f.isMulti} disabled={isReadOnly} />
      }

      return <Textinput
        key={i}
        {...register(f.name)}
        size='small'
        label={f.label}
        error={!!errors[f.name]?.phoneNumber}
        helperText={errors[f.name]?.message}
        InputProps={{
          readOnly: isReadOnly,

        }}
      />
    });
  }

  const submit = async (data) => {

    const res = await fetch(import.meta.env.VITE_APP_SERVERURL + 'dogs/' + dog.numberId, {
      method: "PUT",
      ...DEFAULT_OPTIONS,
      body: JSON.stringify(data)
    })
    console.log('res', res)
    if (res.ok) {
      const data = res.json()
      console.log('data', data)
      setIsReadOnly(true)
    }
  }

  return (
    <>
      <Box component={'form'} onSubmit={handleSubmit(submit)} sx={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', rowGap: '5vh', height: '70%', marginTop: '5vh', alignItems: 'center',
        "&>.MuiTextField-root, &>.MuiAutocomplete-root,&>.MuiBox-root": { width: '22%' },
      }}>
        {renderFileds()}
        {!isReadOnly &&
          <Box sx={{ width: 1, textAlign: 'center' }}>

            <Button sx={{ fontSize: '20px' }} type='submit' endIcon={!isLoading ? <Save /> : <CircularProgress />} variant='contained' >שמירה </Button>
          </Box>}
      </Box>
      {isReadOnly &&
        <Box sx={{ width: 1, textAlign: 'center' }}>

          <Button sx={{ fontSize: '20px' }} type='button' onClick={() => setIsReadOnly(false)} endIcon={<Edit />} variant='contained'>עריכה</Button>
        </Box>}
      {/* <Box sx={{ width: 1, textAlign: 'center' }}>
        {isReadOnly &&
          <Button sx={{ fontSize: '20px' }} onClick={() => setIsReadOnly(false)} endIcon={<Edit />} variant='contained'>עריכה</Button>
        }</Box> */}
    </>

  )
}
