import { Autocomplete } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';
import { Textinput } from './Textinput';

import PropTypes from 'prop-types';


export default function AutocompleteInput({ control, formState, name, label, data, isMulti = false }) {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { invalid, error, isDirty } }) => (
        <Autocomplete
          size='small'
          multiple={isMulti}
          options={data}
          getOptionLabel={option => option}
          ref={ref}
          value={value||null}
          renderInput={params => (
            <Textinput
              {...params}
              label={label}
              error={invalid}
              helperText={error?.message}
              InputLabelProps={{
                shrink: isDirty
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
