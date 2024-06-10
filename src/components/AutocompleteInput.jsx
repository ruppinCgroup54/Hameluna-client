import { Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import { Textinput } from './Textinput';

import PropTypes from 'prop-types';


export default function AutocompleteInput({ control, formState, name, label, data, isMulti = false, disabled = false }) {


  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { invalid, error, isDirty } }) => (
        <Autocomplete
          size='small'
          multiple={isMulti}
          options={ data instanceof Array?data:[]}
          getOptionLabel={option => option}
          ref={ref}
          value={value || null}
          loading={!(data instanceof Array)}
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
