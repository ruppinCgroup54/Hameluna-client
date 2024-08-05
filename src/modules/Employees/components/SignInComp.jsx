import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, TextField, Grid, Alert, AlertTitle, Collapse } from "@mui/material";

const StyledTextfield = {
  bgcolor: "rgba(255,255,255,0.7)",
  borderRadius: "7px",
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
  "& .MuiInputBase-root": {
    background: "none",
    "&:before": {
      borderBottom: "none",
      content: "none",
    },
  },
};

export default function SignIn() {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let phone = data.get("phone");
    let inputPassword = data.get("password");

    fetch(import.meta.env.VITE_APP_SERVERURL+"Volunteers/"+phone, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
    .then((data) => {
      if (data && data.password === inputPassword) {
        navigate(`/Employees/dogslist/${data.shelterNumber}`);
      } else {
        setAlertMessage("מספר פלאפון או סיסמא שגויים.");
        setOpenAlert(true);
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      setAlertMessage("שגיאה בהתחברות");
      setOpenAlert(true);
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "85%", position: "relative", left: "7%", top: -20 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="phone"
        label="מספר פלאפון"
        name="phone"
        autoComplete="phone"
        size="small"
        variant="filled"
        sx={StyledTextfield}
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
        sx={StyledTextfield}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          mx: "auto",
          display: "block",
          color: "#000",
          mt: "5px",
          fontSize: "14px",
        }}
        fullWidth
        size="small"
        color="info"
      >
        התחבר
      </Button>
      <Grid container sx={{ pt: "10px", "& *": { color: "#fff" }}} justifyContent="space-between">
        <Grid item>
          <Button
            variant="text"
            sx={{ paddingLeft: 6, fontSize: 16, color: "#fff", backgroundColor: "#000" }}
            onClick={() => navigate('/employees/empSignUp')}
          >
            פעם ראשונה שלי
          </Button>
        </Grid>
      </Grid>
      <Collapse in={openAlert}>
        <Alert severity="error">
          <AlertTitle>שגיאה בהתחברות</AlertTitle>
          {alertMessage}
        </Alert>
      </Collapse>
    </Box>
  );
}
