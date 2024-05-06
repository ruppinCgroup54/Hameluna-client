import BackgroundLayout from "../layouts/BackgroundLayout";
import TopBarMobile from "../components/TopBarMobile";

import WebsiteBackgroud from "../assets/images/Layouts//background.png";
import { Box } from "@mui/material";
import { Height } from "@mui/icons-material";

const mainDivStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  height:'100vh',
  paddingTop:'15vh',
  paddingBottom:'5vh'
};

export default function AdoptersLayout({ children }) {
  return (
    <BackgroundLayout image={WebsiteBackgroud} dir={"col"} >
      <TopBarMobile />
      <Box sx={mainDivStyle}>{children}</Box>
    </BackgroundLayout>
  );
}
