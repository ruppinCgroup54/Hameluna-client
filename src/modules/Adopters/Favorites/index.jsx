import AdoptersLayout from "../../../layouts/AdoptersLayout";
import { Box, Typography } from "@mui/material";
import FavoritesList from "./FavoritesList";

import Dogs from "../../../Data/Dogs";
import DogCard from "./DogCard";

export default function Favorites() {


  return (
    <AdoptersLayout>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", }}
          color={"common.white"}
        >
          האהובים עלייך{" "}
        </Typography>
        <FavoritesList  />
    </AdoptersLayout>
  );
}
