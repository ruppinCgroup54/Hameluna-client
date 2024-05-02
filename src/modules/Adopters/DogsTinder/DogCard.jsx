import PropTypes, { string } from "prop-types";
import ImageCarousel from "./ImageCarousel";
import CircleIcons from "../../../components/CircleIcons";

import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Icon,
  IconButton,
  Slide,
  Snackbar,
  Typography,
  styled,
} from "@mui/material";
import { Favorite, Share, Swipe } from "@mui/icons-material";
import useAdoptersContext from "../../../utilis/useAdoptersContext";
import { useState } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

const CardStyle = styled(Card)(({ theme }) => ({
  width: "clamp(100px,80dvw,310px)",
  borderRadius: "20px",
  // boxShadow: `${theme.shadows[15]}`,
  position: "relative",
  height: "clamp(400px,80dvh,620px)",
  [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
    maxWidth: 700,
    height: "70vh",
    maxHeight: 350,
  },
  "& .MuiCardContent-root": {
    height: "55%",
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
    right: "20px",
    gap: "20px",
    [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
      transform: "translateY(50%)",
    },
  },
}));

export default function DogCard({ dog }) {
  const { AddToFavorites } = useAdoptersContext();
  const [open, setOpen] = useState(false);

  const swiper = useSwiper();

  const addDog = () => {
    AddToFavorites(dog);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    swiper.slideNext();
  };

  return (
    <CardStyle>
      <CardMedia>
        <ImageCarousel images={dog.images} />
      </CardMedia>

      <CardContent>
        <CardActions>
          <CircleIcons>
            <IconButton onClick={addDog}>
              <Favorite color="primary" />
            </IconButton>
            <IconButton>
              <Share color="primary" />
            </IconButton>
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
        <Link to={`/sendrequest/id/${dog.numberId}/name/${dog.name}`}>
          <Button variant="contained" fullWidth>
            לשליחת פרטים
          </Button>
        </Link>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            color="primary"
            sx={{ width: "100%" }}
          >
            כלב התווסף לרשימה
          </Alert>
        </Snackbar>
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
