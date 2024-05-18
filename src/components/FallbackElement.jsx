import { Backdrop, Box, alpha } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingDog from "/public/images/LoadingDog.png";
import { useNavigation } from "react-router-dom";

export default function FallbackElement() {

  const { state } = useNavigation();

  const [backdrop, setBackdrop] = useState(state == "loading");

  useEffect(() => {
    console.log("state", state);
    setBackdrop(state === "loading");
  }, [state]);
  return (

          <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
            
        >
      <Box
        sx={{
          position: "absolute",
          animation: "spin 1.6s linear infinite",
          "@keyframes spin": {
            "0%": {
              transform: "rotate(0deg)",
            },
            "100%": {
              transform: "rotate(360deg)",
            },
          },
        }}
      >
        <img src={LoadingDog} style={{ height: "250px" }} />
      </Box>
      </Backdrop>
  );
}
