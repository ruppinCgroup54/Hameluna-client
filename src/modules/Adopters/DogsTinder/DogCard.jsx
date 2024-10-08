import PropTypes, { string } from "prop-types";

import { useContext, useState } from "react";

import { Link } from "react-router-dom";

import ImageCarousel from "./ImageCarousel";
import CircleIcons from "../../../components/CircleIcons";
import AlertComp from "../../../components/AlertComp";
import useFetch from "../../../utilis/useFetch";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { Favorite, Share } from "@mui/icons-material";
import useAdoptersContext from "../../../utilis/useAdoptersContext";
import { AdopterContext } from "../../../context/AdoptersContext";

export const DogCardStyle = styled(Card)(({ theme }) => ({
  width: "clamp(100px,100%,310px)",
  borderRadius: "20px",
  // boxShadow: `${theme.shadows[15]}`,
  position: "relative",
  height: "clamp(400px,80dvh,620px)",
  boxSizing: "border-box",
  [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
    maxWidth: 700,
    height: "70vh",
    maxHeight: 350,
  },
  "& .MuiCardContent-root": {
    transition:'all 0.5s',
    height: "55%",
    position: "absolute",
    width: "clamp(100px,100%,310px)",
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

export default function DogCard({ dog ,handleSwipeClose=()=>{}, handleSwipeAddDog=()=>{}}) {
  const {AddToFavorites} = useAdoptersContext();
  
  const images = useFetch(import.meta.env.VITE_APP_SERVERURL+"images/dogId/"+dog.numberId)

  const [open, setOpen] = useState(false);

  const addDog = () => {
    setOpen(true);
    AddToFavorites(dog);
    handleSwipeAddDog();
  };

  const handleClose = () => {
    setOpen(false);
    handleSwipeClose();
  };

  const shareDog= async ()=>{
    const shareData = {
    title: dog.name,
    text: dog.name + " שלנו לאימוץ !",
    url: document.location.origin+'/#/dog/'+dog.numberId,
  };
    try {
      await navigator.share(shareData);
    } catch (err) {
    }
  }

  return (
    <DogCardStyle>
      <CardMedia>
        <ImageCarousel images={images?.value} />
      {/* <img src={useImageURL( dog.profileImage)} alt="" style={{height:'100%',width:'100%',objectFit:'cover'}} /> */}
     
      </CardMedia>
      <CardContent>
        <CardActions>
          <CircleIcons>
            <IconButton onClick={addDog} disabled={open}>
              <Favorite color="primary" />
            </IconButton>
            <IconButton onClick={shareDog} disabled={open}>
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
        <Link to={`/sendrequest`} state={{dog}}>
          <Button variant="contained" fullWidth disabled={open}>
            לשליחת פרטים
          </Button>
        </Link>
        <AlertComp text={"כלב התווסף לרשימה"} isOpen={open} handleClose={handleClose} color="success" />
      </CardContent>
    </DogCardStyle>
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
    profileImage: PropTypes.string,
    shelterNumber:PropTypes.number
  }),
  handleSwipeClose:PropTypes.func,
  handleSwipeAddDog:PropTypes.func

};
