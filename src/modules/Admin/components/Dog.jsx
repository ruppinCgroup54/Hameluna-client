import { IconButton, Typography, useTheme } from "@mui/material";
import CircleIcons from "../../../components/CircleIcons";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Box from "@mui/material/Box";
import useImageURL from "../../../utilis/useImageURL";

const dog = "images/Dogs/image 1.png";

export default function Dog({ dogItem }) {
  const theme = useTheme();
  const entranceDate = new Date(dogItem.entranceDate)
  const date = new Date();
  const differentTime = date - entranceDate;
  const calcDate = Math.round(differentTime / (24 * 3600 * 1000 * 7));


  return (
    <Box
      sx={{
        width: "240px",
        height: "230px",
        display: "flex",
        position: "relative",
      }}
    >
      <img
        src={useImageURL(dogItem.profileImage)}
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
          width: "100%",
          height: "80px",
          position: "absolute",
          bottom: "0",
          border: "1px solid",
          borderColor: theme.palette.primary.main,
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <Typography ml={2} variant="h6" sx={{ fontWeight: "900" }}>
          {dogItem.name}
        </Typography>
        <Typography ml={2} variant="subtitle2">
          {`${dogItem.gender} | ${dogItem.breed} | ${dogItem.age} |`}{" "}
          <CalendarMonthOutlinedIcon fontSize="small" sx={{ mb: "-4px" }} />
          {` ${calcDate} שבועות`}
        </Typography>
      </div>
      <Box
        sx={{ position: "absolute", top: "130px", right: "30px" }}
        display={"flex"}
        flexDirection={"row"}
      >
        <CircleIcons>
          <IconButton>
            <PetsOutlinedIcon color="primary"></PetsOutlinedIcon>
          </IconButton>
          <IconButton>
            <CreateOutlinedIcon color="primary"></CreateOutlinedIcon>
          </IconButton>
        </CircleIcons>
      </Box>
    </Box>
  );
}




