import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  input: {
    textAlign: 'center',
    fontSize: '20px',
    letterSpacing: '10px',
  },
  textField: {
    "& input": {
      textAlign: 'center'
    }
  }
});

const SmsCodeInput = () => {
  const classes = useStyles();
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    // לאפשר רק מספרים ולא יותר מ-6 תווים
    if (/^\d{0,6}$/.test(value)) {
      setCode(value);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <TextField
        value={code}
        onChange={handleChange}
        variant="outlined"
        placeholder="------"
        inputProps={{ className: classes.input }}
        className={classes.textField}
      />
    </Box>
  );
};

export default SmsCodeInput;
