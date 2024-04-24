import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1, width:'65%' }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="אימייל או שם משתמש"
        name="email"
        autoComplete="email"
        size="small"
        variant="filled"
        sx={{
          bgcolor: "rgba(255,255,255,0.7)",
          borderRadius: "10px",
          "& .MuiInputLabel-root": {
            fontSize: "14px",
          },
          "& .MuiInputBase-root": {
            background:'none',
            "&:before":{
              borderBottom:'none',
              content:'none'
            }
          }
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="סיסמא"
        type="password"
        id="password"
        autoComplete="current-password"
        size="small"
        variant="filled"
        sx={{
          bgcolor: "rgba(255,255,255,0.7)",
          borderRadius: "10px",
          "& .MuiInputLabel-root": {
            fontSize: "14px",
          },
          "& .MuiInputBase-root": {
            background:'none',
            "&:before":{
              borderBottom:'none',
              content:'none'
            }
          }
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mx: "auto", display: "block", color: "#000", mt:'5px', fontSize:'14px' }}
        fullWidth
        size="small"
        color="info"
      >
        התחברות
      </Button>
      <Grid
        container
        sx={{ pt: "10px", "& *": { color: "#fff" } }}
        justifyContent="space-between"
      >
        <Grid item xl={4}>
          <Link href="#" variant="body2" sx={{ color: "#fff" }}>
            שכחתי סיסמא
          </Link>
        </Grid>
        <Grid item xl={7}>
          <Link href="#" variant="body2" sx={{ color: "#fff" }}>
            {"לא רשום? לחץ ליצירת משתמש"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
