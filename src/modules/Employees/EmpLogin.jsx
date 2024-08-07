import BackgroundLayout from "../../layouts/BackgroundLayout";
import * as React from 'react';
import bcgImg from "../../assets/images/Layouts/background.png"
import TopBarMobile from "./components/TopbarEmp";
// import SignIn from "../../components/SignIn";
import SignInComp from "./components/SignInComp";
import { position } from "stylis";
import Logo from "../../components/Logo";
import Code from "./components/Code"


const phoneStyle = {
  width: "90%",
  margin: "auto",
};

const logoTextStyle = {
  fontSize: "24px",
}

const divStyle = {
  padding: "50px 0",
  ...phoneStyle,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "70px",

}
export default function EmpLogin() {
  return (
    <BackgroundLayout image={bcgImg} style={{ display: "block" }}>
      <TopBarMobile.woLogo></TopBarMobile.woLogo>
      <div style={divStyle}>
        <Logo.Full style={logoTextStyle} />
        {/* <div>
        <h2 style={{ color: "white", marginTop: "5px" }}>
ברוכים הבאים!                    </h2>
        </div> */}
        <div>
          <SignInComp></SignInComp>
          {/* <SignInComp.phoneCode></SignInComp.phoneCode> */}
          {/* <SmsCodeInput></SmsCodeInput> */}
          {/* <SignInComp.code></SignInComp.code> */}
        </div>
      </div>
    </BackgroundLayout>
  );

}