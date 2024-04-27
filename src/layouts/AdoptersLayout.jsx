import BackgroundLayout from "../layouts/BackgroundLayout";
import TopBarMobile from "../components/TopBarMobile";

import WebsiteBackgroud from "../assets/images/Layouts//background.png";
import { Box } from "@mui/material";

const mainDivStyle = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  paddingTop:'50px'
};

export default function AdoptersLayout({ children }) {
  return (
    <BackgroundLayout image={WebsiteBackgroud} dir={"col"}>
      <TopBarMobile />
      <Box sx={mainDivStyle}>{children}</Box>
    </BackgroundLayout>
  );
}
