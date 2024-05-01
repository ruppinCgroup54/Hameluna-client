import {
  AppBar,
  Badge,
  Box,
  Grid,
  Toolbar,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Logo from "./Logo";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const marked = [true, false, false];

export default function NavBarAdmin() {
  const theme = useTheme();

  const [keyVal, setKeyVal] = useState("");

  const styleDiv = {
    borderRadius: "10px 10px 0 0",
    margin: "0",
    zIndex: "-1",
    textAlign: "center",
  };

  const navItems = ["מי בבית", "משימות", "סיכומים"];

  return (
    <>
      <AppBar sx={{ borderRadius: "0px 0px 15px 15px" }}>
        <Toolbar
          sx={{
            pt: "10px",
            display: "flex",
            justifyContent: "space-between",
            px: 3,
          }}
        >
          <Grid container direction={"row"}>
            <Grid item xs={2} sx={{ display: { xs: "none", md: "block" } }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0,
                }}
              >
                <Logo.Bottom maxWidthLogo={"150px"} />
                <span style={{ fontSize: "0.8rem" }}>ניהול כלביות</span>
              </Box>
            </Grid>

            {/* לשנות צבע רקע לאייטם בהתאם לנתיב הדף */}
            <Grid
              item
              xs={9}
              pr={5}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Box sx={{ mt: "10px" }}>
                <Grid container gap={1}>
                  {navItems.map((item, i) => (
                    <Grid item xs={1.5} key={item}>
                      <div
                        onClick={() => { setKeyVal(item); }}
                        style={{
                          ...styleDiv,
                          backgroundColor: (keyVal==item ? "#fff" : ""),
                        }}
                      >
                        <p
                          style={{
                            fontSize: "1.5rem",
                            color: (keyVal== item ? theme.palette.primary.main : "#fff"),
                            marginBottom: "0px",
                          }}
                        >
                          {item}
                        </p>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={1}>
              <Box
                sx={{
                  gap: "15px",
                  display: "flex",
                  pt: "10px",
                  "& .MuiBadge-badge": {
                    bgcolor: "#fff",
                    color: "primary.main",
                    top: "8px",
                    right: "5px",
                    border: "3px solid",
                    borderColor: "primary.main",
                    padding: "0 4px",
                    fontWeight: "bold",
                  },
                }}
              >
                <Badge badgeContent={3}>
                  <EmailOutlinedIcon fontSize="large"></EmailOutlinedIcon>
                </Badge>
                <Badge badgeContent={4}>
                  <NotificationsOutlinedIcon fontSize="large"></NotificationsOutlinedIcon>
                </Badge>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
