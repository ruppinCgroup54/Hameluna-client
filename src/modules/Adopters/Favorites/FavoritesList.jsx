import PropTypes from "prop-types";
import DogCard from "./DogCard";
import useAdoptersContext from "../../../utilis/useAdoptersContext";

export default function FavoritesList() {
  const { favoritesDogs } = useAdoptersContext();

  return (
    <div
      style={{
        height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        alignItems: "center",
        padding: 10,
      }}
    >
      {favoritesDogs.map((dog) => (
        <DogCard key={dog.numberId} dog={dog} />
      ))}
    </div>
  );
}

FavoritesList.propTypes = {
  dogsList: PropTypes.array,
};
