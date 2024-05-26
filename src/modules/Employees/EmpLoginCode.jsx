import BackgroundLayout from "../../layouts/BackgroundLayout";
import * as React from 'react';
import bcgImg from "../../assets/images/Layouts/background.png"
import TopBarMobile from "./components/TopbarEmp";
import SignIn from "../../components/SignIn";
import SignInComp from "./components/SignInComp";
import { position } from "stylis";
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
        {/* <Logo.Full style={logoTextStyle} /> */}
        {/* <div>
        <h2 style={{ color: "white", marginTop: "5px" }}>
ברוכים הבאים!                    </h2>
        </div> */}
        <div>
          <h1>הזן את הקוד</h1>
          <SignInComp.code></SignInComp.code>
        </div>
      </div>
    </BackgroundLayout>
  );

}