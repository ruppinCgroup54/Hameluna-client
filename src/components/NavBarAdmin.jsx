import {
  AppBar,
  Badge,
  Box,
  Grid,
  Stack,
  Toolbar,
  useTheme,
} from "@mui/material";
import React from "react";
import Logo from "./Logo";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Height, Visibility } from "@mui/icons-material";
import DrawerNavbar from "./DrawerNavbar";

const marked = [true, false, false];

export default function NavBarAdmin() {
  const theme = useTheme();

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
            <Grid item md={2} sx={{ display: { xs: "none", md: "block" } }}>
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
              sm={9}
              pr={5}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Box sx={{ mt: "10px" }}>
                <Grid container gap={1}>
                  {navItems.map((item, i) => (
                    <Grid item md={1.5} key={item}>
                      <div
                        style={{
                          ...styleDiv,
                          backgroundColor: marked[i] ? "#fff" : "",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "1.5rem",
                            color: marked[i]
                              ? theme.palette.primary.main
                              : "#fff",
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

            <Grid item xs={9} sx={{ display: { md: "none" } }}>
              <DrawerNavbar ItemsList={navItems}></DrawerNavbar>
            </Grid>

            <Grid item xs={3} md={1}>
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
