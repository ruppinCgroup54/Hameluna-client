import { Box, Button, Typography, alpha } from "@mui/material";
import {
  isRouteErrorResponse,
  useLocation,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const ErrorDog = "images/ErrorDog.png";

export default function ErrorPage() {
  let error = useRouteError();

  let location = useLocation();

  console.log("location", error);

  const navigate = useNavigate();
  let subtitle;

  const BackHome = () => {
    let home;
    let getRoot = location.pathname.split("/")[1];

    console.log('getRoot', getRoot)

    switch (getRoot) {
      case "admin":
        home = "/admin";
        break;
      case "employee":
        home = "/employee";
      default:
        home = "/";
        break;
    }
    navigate(home);
  };

  switch (error.status) {
    case 404:
      subtitle = "לא מצאנו את הדף שרצית";
      break;
    case 401:
      subtitle = "אין לך הרשאות לראות את דף זה";
      break;
    case 503:
      subtitle = "לא מצאנו את הדף שרצית";
      break;

    default:
      subtitle = "משהו השתבש";
      break;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        padding: "10vh 5vw",
        display: "flex",
        flexDirection: { xs: "column-reverse", sm: "row" },
        alignItems: "center",
        justifyContent: "space-evenly",
        bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.3),
        "& img": {
          width: { xs: "80%", sm: "50%" },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignSelf: "stretch",
        }}
      >
        <Typography variant="h2">אופס! {error?.status}</Typography>
        <Typography variant="h4">{subtitle}</Typography>
        {isRouteErrorResponse(error) && (
          <Typography variant="h6">פרטי השגיאה : {error?.data}</Typography>
        )}
        <Button onClick={BackHome} variant="contained">
          חזרה לדף הביתה
        </Button>
      </Box>
      <img src={ErrorDog} style={{}} />
    </Box>
  );
}
