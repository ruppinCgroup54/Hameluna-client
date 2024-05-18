import LogInImage from "/public/images/Layouts/LogIn.png";
import BackgroundLayout from "../../layouts/BackgroundLayout";
import Logo from "../../components/Logo";

import { useMediaQuery } from "react-responsive";

import SignIn from "../../components/SignIn";

const phoneStyle = {
  width: "90%",
  margin: "auto",
};
const desktopStyle = { width: "33%", marginRight: "10%" };

export default function LogInPage() {
  const isDesktop = useMediaQuery({ query: "(min-width:600px )" });


  return (
    <>
      <BackgroundLayout image={LogInImage} style={{ display: "block" }}>
        <div
          style={{
            padding: "50px 0",
            backgroundImage:
              "radial-gradient( #8C6849 0%, #8C6849 23%,  rgba(140, 104, 73, 0) 100%)",
            ...(isDesktop ? desktopStyle : phoneStyle),
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Logo.Full />
          <h3 style={{ color: "white", marginTop: "5px" }}>
            לנהל את הכלבייה שלך בצורה הפשוטה ביותר.
          </h3>
            <SignIn></SignIn>
        </div>
      </BackgroundLayout>
    </>
  );
}
