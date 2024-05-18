import BackgroundLayout from "../../layouts/BackgroundLayout";
import bcgImg from "/public/images/Layouts/background.png";
import * as React from 'react';
import CardComp from "../Employees/components/cardComp"
import dogImg from "/public/images/Dogs/image 1.png";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "@mui/material/styles";

import dogImg02 from "/public/images/Dogs/image 5.png";
import TopbarEmp from "../Employees/components/TopbarEmp";

import chakls from "../Employees/components/chacklistCollapse"
import { position } from "stylis";


const phoneStyle = {
    width: "90%",
    margin: "auto",
  };


export default function DogsCardPage() {

  const isDesktop = useMediaQuery({ query: "(min-width:600px )" });
    return(
        <>
<BackgroundLayout image={bcgImg} style={{ display: "block"}}>
    
    <div>
    <TopbarEmp></TopbarEmp>
    </div>
    <div  style={{
            padding: "50px 0",
            ...phoneStyle,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "70px",
          }}>

        <CardComp image1={dogImg} cell={"2"} dogsName={"זאזו"}></CardComp>
        <CardComp image1={dogImg02} cell={"3"} dogsName={"ווילי"}></CardComp>
       
    </div>

    <div sx={{}}>
      
    </div>
</BackgroundLayout>
</>
    );
}