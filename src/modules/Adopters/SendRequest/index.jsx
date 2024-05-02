import React from "react";
import AdoptersLayout from "../../../layouts/AdoptersLayout";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function SendRequest() {
  const {dogId,dogName} = useParams();
  console.log('dogId', dogId);
  console.log('dogNAme', dogName);
  return (
    <AdoptersLayout>
      <Box sx={{ backgroundColor: "rgba(255,255,255,0.5)", 
    width:'clamp(200px,80vh,500px)',
    }}>
        <Typography textAlign={'center'}>שלח לנו את הפרטים שלך לגבי <u>{dogName}</u></Typography>
      </Box>
    </AdoptersLayout>
  );
}
