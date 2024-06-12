import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Alert, AlertTitle, Collapse, TextField } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../../utilis/useFetch";
import { Height } from "@mui/icons-material";
import Code from "./Code";

// TODO remove, this demo shouldn't need to reset the theme.
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

  const [openAlert, setOpenAlert] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let loginDet = {
      phone: data.get("phone"),
      // password: data.get("password"),
      
    };

    fetch("https://localhost:7280/api/cells/Employees/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDet),
    })
      .then((res) => {
        console.log("res", res);

        return res.ok ? res.json() : Promise.reject(res);
      })
      .then((data) => {
        console.log("data", data);
        navigate("/Employee/dogslist");
      })
      .catch((rej) => setOpenAlert(true));
  };

  return (
   

    
    <Box 
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1, width: "85%", position: "relative" ,left:"7%" , top: -20}}
    >
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
      {/* <TextField
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
      /> */}
      <Button
        type="submit"
        variant="contained"
        onClick={()=>navigate('/employees/code')}
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
         לחץ לקבלת קוד 
      </Button>
      <Grid
        container
        sx={{ pt: "10px", "& *": { color: "#fff" }}}
          justifyContent="space-between"
      >
       
        <Grid item>
          <Link href="empsignup" variant="caption" sx={{  paddingLeft: 6,fontSize: 16,color: "#fff" }}>
            {"פעם ראשונה שלי"}
          </Link>
        </Grid>
      </Grid>
      <Collapse in={false}>
        <Alert severity="error">
          <AlertTitle>שגיאה בהתחברות</AlertTitle>
          מספר פלאפון או סיסמא שגויים.
        </Alert>
      </Collapse>
    </Box>
    
  );
}

SignIn.code =()=>{
  
 return(
<Code></Code>

 );  

}
