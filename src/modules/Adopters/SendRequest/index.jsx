import React from "react";
import AdoptersLayout from "../../../layouts/AdoptersLayout";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function SendRequest() {
  const {dogId,dogName} = useParams();
  console.log('dogId', dogId)
  return (
    <AdoptersLayout>
      <Box sx={{ backgroundColor: "alpha(common.white,0.5)" }}>
        <Typography>שלח לנו את הפרטים שלך לגבי {}</Typography>
      </Box>
    </AdoptersLayout>
  );
}
