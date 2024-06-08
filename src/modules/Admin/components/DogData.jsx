import React, { useState } from 'react'
import { dogSchema } from '../../../Data/Schemas';
import { Box, Button, CircularProgress, Typography, } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textinput } from '../../../components/Textinput';
import AutocompleteInput from '../../../components/AutocompleteInput';
import { date } from 'zod';
import { Edit, Save } from '@mui/icons-material';
import { DEFAULT_OPTIONS } from '../../../utilis/useFetch';
import { set } from 'firebase/database';

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


  const getList = async (name) => {
    const res = await fetch(import.meta.env.VITE_APP_SERVERURL + 'Data/' + name)
    const data = await res.json();
    return data;
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
      data: getList("colors").then(res => res)
    }, {
      name: "breed",
      label: "גזע",
      isDropDown: true,
      isMulti: true,
      data: getList("Breeds").then(res => res)
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
      date: getList("Characteristics").then(res => res)
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
        // return <DateInput label={f.name} setVal={setArrivalDate}/>

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
      setIsReadOnly(true)
    }
  }
  console.log('errors', errors)
  return (
    <>
      <Box component={'form'} onSubmit={handleSubmit(submit)} sx={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', rowGap: '5vh', height: '70%', marginTop: '5vh', alignItems: 'center',
        "&>.MuiTextField-root, &>.MuiAutocomplete-root": { width: '22%' },
        // "& *.Mui-disabled ": { WebkitTextFillColor:'black', borderColor:(theme)=>theme.palette.primary.main }
      }}>
        {renderFileds()}
        <Box sx={{ width: 1, textAlign: 'center' }}>
          {!isReadOnly &&
            <Button sx={{ fontSize: '20px' }} type='submit' endIcon={!isLoading ? <Save /> : <CircularProgress />} variant='contained' >שמירה </Button>
          }</Box>
      </Box>

      {isReadOnly && <Button sx={{ fontSize: '20px' }} type='button' onClick={() => setIsReadOnly(false)} endIcon={<Edit />} variant='contained'>עריכה</Button>}
    </>
  )
}
