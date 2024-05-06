import FallbackElement from "../../../components/FallbackElement";
import AdoptersLayout from "../../../layouts/AdoptersLayout";
import FavoritesList from "./FavoritesList";

import { Typography } from "@mui/material";




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
