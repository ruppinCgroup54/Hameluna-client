import { Backdrop, Box, CircularProgress } from "@mui/material";
import React from "react";

export default function FallbackElement() {
  return (
    <Box sx={{ display: "flex",width:'100vw',height:'100vh',justifyContent:'center',alignItems:'center' }}>
      <CircularProgress size={90} />
    </Box>
  );
}
