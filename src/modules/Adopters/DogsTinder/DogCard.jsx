import PropTypes, { string } from "prop-types";
import ImageCarousel from "./ImageCarousel";
import CircleIcons from "../../../components/CircleIcons";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";
import { Favorite, Share } from "@mui/icons-material";

const CardStyle = styled(Card)(({ theme }) => ({
  width: "clamp(100px,80dvw,310px)",
  borderRadius: "20px",
  boxShadow: `${theme.shadows[15]}`,
  position: "relative",
  height: "clamp(400px,80dvh,620px)",
  [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
    maxWidth: 700,
    height: "70vh",
    maxHeight: 350,
  },
  "& .MuiCardContent-root": {
    height: "60%",
    width: "100%",
    position: "absolute",
    backgroundColor: theme.palette.common.white,
    bottom: 0,
    boxShadow: `${theme.shadows[6]}`,
    borderRadius: "inherit",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    paddingTop: "10%",
    zIndex: 2,
    [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
      borderRadius: "0",
      height: "100%",
      width: "60%",
      left: 0,
      paddingTop: "5%",
    },
  },
  "& .MuiCardMedia-root": {
    height: "50%",
    maxHeight: "300px",
    position: "relative",
    [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
      width: "40%",
      height: "100%",
      maxHeight: "350px",
    },
  },
  "& .MuiCardActions-root": {
    position: "absolute",
    top: 0,
    transform: "translateY(-50%)",
    left: "20px",
    gap: "20px",
    [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
      transform: "translateY(50%)",
    },
  },
}));

export default function DogCard({ dog }) {
  return (
    <CardStyle>
      <CardMedia>
        <ImageCarousel images={dog.images} />
      </CardMedia>

      <CardContent>
        <CardActions>
          <CircleIcons>
            <Favorite color="primary" />
            <Share color="primary" />
          </CircleIcons>
        </CardActions>

        <div style={{ height: { xs: "100%", md: "80%" }, overflow: "auto" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {dog.name}
          </Typography>
          <Typography variant="subtitle1">{`${dog.gender} | ${dog.breed.join(
            "-"
          )} | ${dog.age} | ${dog.size}`}</Typography>
          <Typography variant="body2">{dog.shelter}</Typography>
          <Typography variant="body1">{dog.note}</Typography>
        </div>

        <Button variant="contained" fullWidth className="pressable">
          לשליחת פרטים
        </Button>
      </CardContent>
    </CardStyle>
  );
}

DogCard.propTypes = {
  dog: PropTypes.shape({
    name: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.number,
    size: PropTypes.string,
    shelter: PropTypes.string,
    note: PropTypes.string,
    images: PropTypes.arrayOf(string),
  }),
};
