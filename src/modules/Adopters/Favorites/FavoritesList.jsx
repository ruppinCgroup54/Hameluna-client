import PropTypes from "prop-types";
import DogCard from "./DogCard";
import useAdoptersContext from "../../../utilis/useAdoptersContext";
import { Typography } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';

export default function FavoritesList() {
  const { favoritesDogs } = useAdoptersContext();

  return (
 
      <TransitionGroup style={{height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: 10,}}>

      {favoritesDogs.length>0 ?favoritesDogs.map((dog) => (
        <DogCard key={dog.numberId} dog={dog} />
      )):
      <Typography textAlign={'center'} color={'common.white'} variant="h2">אין לך כלבים ברשימה 😓</Typography>}
      </TransitionGroup>
  );
}

FavoritesList.propTypes = {
  dogsList: PropTypes.array,
};
