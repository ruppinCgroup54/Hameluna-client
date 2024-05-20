import BackgroundLayout from "../../layouts/BackgroundLayout";
import * as React from 'react';
import CardComp from "../Employees/components/cardComp"
import { useMediaQuery } from "react-responsive";
import { useTheme } from "@mui/material/styles";

import TopbarEmp from "../Employees/components/TopbarEmp";

import chakls from "./components/chacklistCollapse"
import { position } from "stylis";

const dogImg02="images/Dogs/image 5.png";
const dogImg="images/Dogs/image 1.png";
const bcgImg="images/Layouts/background.png";

const phoneStyle = {
    width: "90%",
    margin: "auto",
  };


export default function DogsList() {

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