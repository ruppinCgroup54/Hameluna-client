import { TextField, styled } from '@mui/material';

export const Textinput = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  "&:hover:not(.Mui-focused)": {
    "& .MuiOutlinedInput-notchedOutline": {
      border: `2.5px solid ${theme.palette.primary.main}`,
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
  "& .MuiInputBase-root": {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: "20px",

    "&:before": {
      borderBottom: "none",
      content: "none",
    },
  },
}));



