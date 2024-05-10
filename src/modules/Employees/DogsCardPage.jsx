import BackgroundLayout from "../../layouts/BackgroundLayout";
import bcgImg from "../../assets/images/Layouts/background.png";
import * as React from 'react';
import CardComp from "../Employees/components/cardComp"
import dogImg from "../../assets/images/Dogs/image 1.png";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "@mui/material/styles";

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
    
    <div  style={{
            padding: "50px 0",
            ...phoneStyle,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}>
        <CardComp image1={dogImg}></CardComp>
       
    </div>

    <div sx={{}}>
      
    </div>
</BackgroundLayout>
</>
    );
}