import PropTypes from "prop-types";
import DogCard from "./DogCard";
import { Collapse, Grow, Skeleton, Typography } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import ListSkeleton from "./ListSkeleton";
import useAdoptersContext from "../../../utilis/useAdopterContext";

export default function FavoritesList() {

  const { favoritesDogs } = useAdoptersContext();


  return (
    <>

      {/* { */}
        {/* // favoritesDogs?.length > 0 ? */}
          <TransitionGroup>

            {favoritesDogs.map((dog) => (
              <DogCard key={dog.numberId} dog={dog} />
            ))}
          </TransitionGroup>

          {/* : */}
          {/* < Typography textAlign={'center'} color={'common.white'} variant="h2">אין לך כלבים שאהבת </Typography> */}


      {/* } */}

    </>
  );
}

FavoritesList.propTypes = {
  dogsList: PropTypes.array,
};
