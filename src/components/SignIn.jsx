import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Alert, AlertTitle, Collapse, TextField } from "@mui/material";
import { json, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useFetch from "../utilis/useFetch";
import { ShelterContext } from "../context/ShelterContextProvider";
import useLocalStorage from "../utilis/useLocalStorge";
import useShelterContext from "../utilis/useShelterContext"
// TODO remove, this demo shouldn't need to reset the theme.

const StyledTextfield = {
  bgcolor: "rgba(255,255,255,0.7)",
  borderRadius: "10px",
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

export default function SignIn({ updateDetails }) {
  const navigate = useNavigate();

  // const {setLoginDet} = useContext(ShelterContext);
  //const {setLoginDet} = useShelterContext();

  // const [loginDetails, setLoginDet] = useLocalStorage('loginDet', {});

  const [openAlert, setOpenAlert] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let loginDet = {
      phone: data.get("phone"),
      password: data.get("password"),
    };

    fetch(import.meta.env.VITE_APP_SERVERURL + "Admins/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDet),
    })
      .then((res) => {
        debugger
        if (res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(res);
        }
      })
      .then((data) => {
          loginDet["shelterNumber"] = data;
          updateDetails(loginDet);

      })
      .catch((rej) => { event.target.reset(); setOpenAlert(true) });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1, width: "65%" }}
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
      <Collapse in={openAlert}>
        <Alert severity="error">
          <AlertTitle>שגיאה בהתחברות</AlertTitle>
          מספר פלאפון או סיסמא שגויים.
        </Alert>
      </Collapse>
    </Box>
  );
}
