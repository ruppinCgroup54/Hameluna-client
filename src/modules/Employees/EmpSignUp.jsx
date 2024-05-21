import BackgroundLayout from "../../layouts/BackgroundLayout";
import * as React from 'react';
import bcgImg from "../../assets/images/Layouts/background.png"
import TopBarMobile from "./components/TopbarEmp";
import SignIn from "../../components/SignIn";
import SignInComp from "./components/SignInComp";
import { position } from "stylis";

const phoneStyle = {
    width: "90%",
    margin: "auto",
};
export default function EmpSignUp() {


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
                    <h2 style={{ color: "white", marginTop: "5px" }}>
                        איזה כיף שהצטרפתם אלינו!
                    </h2>
                </div>
                <div>

                </div>
            </div>
        </BackgroundLayout>
    );

}