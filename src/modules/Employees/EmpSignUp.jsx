import BackgroundLayout from "../../layouts/BackgroundLayout";
import * as React from 'react';
import bcgImg from "../../assets/images/Layouts/background.png"
import TopBarMobile from "./components/TopbarEmp";
import SignIn from "../../components/SignIn";
import SignUpComp from "./components/SignUpComp";
import { position } from "stylis";
import { useLoaderData } from "react-router-dom";


const phoneStyle = {
    width: "90%",
    margin: "auto",
};
export default function EmpSignUp() {

      const shelters = useLoaderData();
        console.log(shelters);

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
                        ברוכים הבאים
                    </h2>
                    <h3 style={{ color: "white" , marginTop:-3,}}>כמה פרטים ומתחילים</h3>
                </div>
                <div>
<SignUpComp shelters={shelters}></SignUpComp>
                </div>
            </div>
        </BackgroundLayout>
    );

}