import { IconButton, Typography, useTheme } from "@mui/material";
import dog from "../../../assets/images/Dogs/image 1.png";
import CircleIcons from "../../../components/CircleIcons";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

import Box from '@mui/material/Box';


export default function Dog() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "240px",
        height: "220px",
        display: "flex",
        position: "relative",
      }}
    >
      <img
        src={dog}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "20px",
        }}
      ></img>
      <div
        style={{
          backgroundColor: "#fff",
          width: "240px",
          height: "70px",
          position: "absolute",
          bottom: "0",
          border: "1px solid",
          borderColor: theme.palette.primary.main,
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <Typography ml={2} variant="h6" sx={{ fontWeight: "bold" }}>
          סימבה
        </Typography>
        <Typography ml={2} variant="subtitle2">
          זכר | שיצו | 4.5 | <CreateOutlinedIcon/>
           3 שבועות
          
        </Typography>
      </div>
      <Box
        sx={{ position: "absolute", top: "130px", right: "30px" }}
        display={"flex"}
        flexDirection={"row"}
      >
        <CircleIcons>
          <IconButton>
            <PetsOutlinedIcon
              color="primary"
              fontSize="large"
            ></PetsOutlinedIcon>
          </IconButton>
          <IconButton>
            <CreateOutlinedIcon
              color="primary"
              fontSize="large"
            ></CreateOutlinedIcon>
          </IconButton>
        </CircleIcons>
      </Box>
    </Box>
  );
}
