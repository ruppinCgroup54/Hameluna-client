import BackgroundLayout from "../../layouts/BackgroundLayout";
import * as React from 'react';
const bcgImg = "images/Layouts/background.png";
import TopBarMobile from "./components/TopbarEmp";
import SignIn from "../../components/SignIn";
import SignInComp from "./components/SignInComp";
import { position } from "stylis";
import Button from "@mui/material/Button";

import Logo from "../../components/Logo";

const phoneStyle = {
  width: "90%",
  margin: "auto",
};

const logoTextStyle = {
  fontSize: "24px",
}
export default function EmpLogin() {
  return (
    <BackgroundLayout image={bcgImg} style={{ display: "block" }}>
      <TopBarMobile></TopBarMobile>
      <div style={{
        padding: "50px 0",
        ...phoneStyle,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "70px",
      }}>
        <div>

          <h1>הזן את הקוד</h1>

          <SignInComp.code></SignInComp.code>
          <div style={{ paddingTop: "20px" }}>          <Button
            type="submit"
            variant="contained"
            onClick={() => navigate('/employees/code')}
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
            כניסה
          </Button>
          </div>

        </div>
      </div>
    </BackgroundLayout>
  );

}