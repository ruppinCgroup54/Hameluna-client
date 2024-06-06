import { AppBar, Badge, Box, Grid, IconButton, Menu, Toolbar, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { pathes } from "../modules/Routes";
import RequestsList from "../modules/Admin/components/RequestsList";

export default function NavBarAdmin() {
  const navigate = useNavigate();

  const theme = useTheme();

  const [keyVal, setKeyVal] = useState("");

  const location = useLocation();

  useEffect(() => {
    location.pathname == pathes[0].path ? setKeyVal("") : 0;
    console.log('location', location.pathname)
  }, [location])


  const styleDiv = {
    borderRadius: "10px 10px 0 0",
    margin: "0",
    zIndex: "-1",
    textAlign: "center",
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
                  {pathes.map((nav, i) => (
                    <Grid item xs={1.5} key={nav.id}>
                      <div
                        onClick={() => {
                          setKeyVal(nav.id);
                          navigate(nav.path);
                        }}
                        style={{
                          ...styleDiv,
                          backgroundColor: keyVal == nav.id ? "#fff" : "",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "1.5rem",
                            color:
                              keyVal == nav.id
                                ? theme.palette.primary.main
                                : "#fff",
                            marginBottom: "0px",
                          }}
                        >
                          {nav.id}
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
                <Box>
                  <IconButton onClick={handleOpenUserMenu} >
                    <Badge badgeContent={3}>

                      <EmailOutlinedIcon fontSize="large" ></EmailOutlinedIcon>
                    </Badge>
                  </IconButton>

                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <RequestsList close={handleCloseUserMenu} />
                  </Menu>
                </Box>
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
