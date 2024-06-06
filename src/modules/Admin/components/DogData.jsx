import React, { useState } from 'react'
import { dogSchema } from '../../../Data/Schemas';
import { Box, Button, } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textinput } from '../../../components/Textinput';
import AutocompleteInput from '../../../components/AutocompleteInput';
import { date } from 'zod';

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
    formState: { errors, dirtyFields }
  } = methods;


  const getList =async (name) => {
    return fetch(import.meta.env.VITE_APP_SERVERURL + 'Data/' + name).then(res => res.json()).then(d => d);
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
    }, {
      name: "size",
      label: "גודל",
      isDropDown: false,
    }, {
      name: "entranceDate",
      label: "תאריך הגעה",
      isDropDown: false,
    }, {
      name: "color",
      label: "צבע",
      isDropDown: true,
      isMulti: true,
      data: getList("colors").then(res=>res)
    }, {
      name: "breed",
      label: "גזע",
      isDropDown: true,
      isMulti: true,
      data: getList("Breeds").then(res=>res)
    }, {
      name: "gender",
      label: "מין",
      isDropDown: true,
      data:['זכר,נקבה']
    }, {
      name: "attributes",
      label: "תכונות",
      isDropDown: false,
      isMulti: false,
      date: getList("Characteristics").then(res=>res)
    }, {
      name: "isReturned",
      label: "כלב חוזר?",
      isDropDown: false,
      isMulti: false
    },
  ]

  const renderFileds = () => {

    return filedsToShow.map((f, i) => {

      if (f.isDropDown) {
        return <AutocompleteInput {...methods} label={f.label} name={f.name} data={f.data} isMulti={f.isMulti !==undefined} disabled={isReadOnly}/>
      }

      return <Textinput
      
        {...register(f.name)}
        size='small'
        label={f.label}
        error={!!errors[f.name]?.phoneNumber}
        helperText={errors[f.name]?.message}
        InputProps={{
          readOnly:isReadOnly
        }}
      />
    });
  }

  return (

    <Box component={'form'} sx={{
      display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly',rowGap:'5vh',height:'70%',marginTop:'5vh',alignItems:'center',
      "&>.MuiTextField-root, &>.MuiAutocomplete-root": { width: '22%' },
      // "& *.Mui-disabled ": { WebkitTextFillColor:'black', borderColor:(theme)=>theme.palette.primary.main }
    }}>
      {renderFileds()}
      {isReadOnly&& <Box sx={{width:1,textAlign:'center'}}> <Button  variant='contained'>שמור</Button></Box>}
    </Box>

  )
}
