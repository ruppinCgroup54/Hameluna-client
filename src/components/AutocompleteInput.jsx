import { Autocomplete } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';
import { Textinput } from './Textinput';

import PropTypes from 'prop-types';


export default function AutocompleteInput({ control, formState, name, label, data, isMulti = false }) {
  const { errors } = formState;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value },fieldState:{invalid,error} }) => (
        <Autocomplete
          multiple={isMulti}
          options={data}
          getOptionLabel={option => option}
          renderInput={params => (
            <Textinput
              {...params}
              label={label}
              error={invalid}
              helperText={error?.message}
            />
          )}
          onChange={(event, data) => {
            onChange(data)
            return data;
          }}
          defaultValue={isMulti?[]:''}
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
