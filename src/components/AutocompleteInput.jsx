import { Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import { Textinput } from './Textinput';

import PropTypes from 'prop-types';


export default function AutocompleteInput({ control, formState, name, label, data, isMulti = false, disabled = false }) {
  const [dataSt, setDataSt] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if ( data instanceof Promise) {
      if (data.state === 'fulfilled') {

        setDataSt(data)
        setLoading(false)
      }
    } else {
      setDataSt([])
      setLoading(true)
    }
  }, [data])


  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { invalid, error, isDirty } }) => (
        <Autocomplete
          size='small'
          multiple={isMulti}
          options={dataSt}
          getOptionLabel={option => option}
          ref={ref}
          value={value || null}
          loading={loading}
          readOnly={disabled}
          renderInput={params => (
            <Textinput
              {...params}
              label={label}
              error={invalid}
              helperText={error?.message}
              InputLabelProps={{
                shrink: value !== null
              }}
            />
          )}
          onChange={(event, data) => {
            onChange(data)
            return data;
          }}
          defaultValue={isMulti ? [] : ""}
        />
      )}


    />
  )
}
AutocompleteInput.propTypes = {
  fieldName: PropTypes.string,
  fLabel: PropTypes.string,
  data: PropTypes.array,
  isMulti: PropTypes.bool
};
