import React, { useState } from "react";
import { Button, Box, TextField, Select, MenuItem, Collapse, Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

export default function SignUpComp({ shelters }) {
  const navigate = useNavigate();

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedShelter, setSelectedShelter] = useState("");
  const [selectedShelterId, setSelectedShelterId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let signInDat = {
      phone: data.get("EmpPhone"),
      email: data.get("EmpEmail"),
      firstName: data.get("EmpFIName"),
      lastName: data.get("EmpLName"),
      password: data.get("password"),
      shelterId: selectedShelterId,
    };
    
    // בדיקת התאמה בין הסיסמאות
    if (signInDat.password !== data.get("conPassword")) {
      setAlertMessage("הסיסמא ואימות הסיסמא אינן זהות");
      setOpenAlert(true);
      return;
    }
    
    fetch(`${import.meta.env.VITE_APP_SERVERURL}Volunteers/${signInDat.phone}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 404) {
          // אם קיבלנו 404, מספר הטלפון לא קיים
          // שליחת הטופס לשרת אם מספר הטלפון לא קיים
          console.log("POST Request Body:", JSON.stringify(signInDat));
          return fetch(import.meta.env.VITE_APP_SERVERURL + "Volunteers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signInDat),
          });
        } else if (!res.ok) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((res) => {
        console.log("POST Response Status:", res.status);
        return res.text(); // קבל את התגובה כטקסט
      })
      .then((text) => {
        console.log("POST Response Text:", text);
        try {
          const data = JSON.parse(text); // נסה להמיר ל-JSON
          console.log("Parsed Data:", data);
          if (data.PhoneNumber) {
            setAlertMessage("המספר טלפון כבר קיים במערכת");
            setOpenAlert(true);
          } else {
            navigate("/Employees");
          }
        } catch (error) {
          console.error("JSON Parse Error:", error);
          setAlertMessage("שגיאה בעת עיבוד התגובה מהשרת");
          setOpenAlert(true);
        }
      })
      .catch((error) => {
        console.error("POST Error:", error);
        setAlertMessage("שגיאה בעת שליחת הטופס");
        setOpenAlert(true);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1, width: "85%", position: "relative", left: "7%", top: -20 }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="EmpFIName"
        label="שם פרטי"
        name="EmpFIName"
        autoComplete="Fname"
        size="small"
        variant="filled"
        sx={StyledTextfield}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="EmpLName"
        label="שם משפחה"
        name="EmpLName"
        autoComplete="Lname"
        size="small"
        variant="filled"
        sx={StyledTextfield}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="EmpPhone"
        label="טלפון נייד"
        name="EmpPhone"
        autoComplete="phone"
        size="small"
        variant="filled"
        sx={StyledTextfield}
      />
      <Select
        value={selectedShelter}
        onChange={(e) => {
          setSelectedShelter(e.target.value);
          const selectedShelterObject = shelters.find(
            (shelter) => shelter.name === e.target.value
          );
          setSelectedShelterId(selectedShelterObject.shelterId); // שמירת ה-ID של הכלביה
          console.log(selectedShelterObject.shelterId);
        }}
        displayEmpty
        fullWidth
        sx={{
          ...StyledTextfield,
          marginTop: 2,
          marginBottom: 1.5,
          height: 46,
          fontSize: 14,
        }}
      >
        <MenuItem value="" disabled>
          הכלביה שלי
        </MenuItem>
        {shelters.map((shelter, index) => (
          <MenuItem key={index} value={shelter.name}>
            {shelter.name}
          </MenuItem>
        ))}
      </Select>

      <TextField
        margin="normal"
        required
        fullWidth
        id="EmpEmail"
        label="Email"
        name="EmpEmail"
        autoComplete="mail"
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
        size="small"
        variant="filled"
        sx={StyledTextfield}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="conPassword"
        label="אימות סיסמא"
        type="password"
        id="conPassword"
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
          mt: "30px",
          fontSize: "14px",
        }}
        fullWidth
        size="small"
        color="info"
      >
        סיום
      </Button>

      <Collapse in={openAlert}>
        <Alert severity="error">
          <AlertTitle>שגיאה</AlertTitle>
          {alertMessage}
        </Alert>
      </Collapse>
    </Box>
  );
}
