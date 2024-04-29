import { Box, Drawer, IconButton, List, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import Logo from "./Logo";

export default function DrawerNavbar({ ItemsList }) {
  const [isDrawenOpen, setisDrawenOpen] = useState(false);

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="white"
        onClick={() => {
          setisDrawenOpen(true);
        }}
        sx={{
          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={isDrawenOpen}
        onClose={() => setisDrawenOpen(false)}
      >
        <Box
          p={2}
          width={"250px"}
          textAlign={"center"}
          role="presentation"
          sx={{ bgcolor: "primary.main" }}
        >
          <Logo.Bottom maxWidthLogo={"150px"}></Logo.Bottom>
        </Box>
        <Box height={"100%"} pt={10} bgcolor={"primary.main"} justifyContent={'space-between'} display={'flex'} flexDirection={'column'}>
          <Box>
            {ItemsList.map((item, i) => (
              <Typography
                key={item}
                sx={{
                  textAlign: "center",
                  mb: "15px",
                  mt: "15px",
                  fontSize: "20px",
                  bgcolor: "primary.light",
                  color: "#fff",
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
          <Typography sx={{ textAlign: "center", fontSize: "12px" }}>
            התנתק מהמערכת
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}
