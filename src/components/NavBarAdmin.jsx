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
import ExceptionsList from "../modules/Admin/components/ExceptionsList";
import { Password } from "@mui/icons-material";

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

  const [anchorElUserExc, setAnchorElUserExc] = React.useState(null);

  const handleOpenUserMenuExc = (event) => {
    setAnchorElUserExc(event.currentTarget);
  };

  const handleCloseUserMenuExc = () => {
    setAnchorElUserExc(null);
  };

  const exit = () => {
    localStorage.removeItem("loginDet") ;
    navigate("/admin/") ;
  }


  const [badgeNum, setBadgeNum] = useState(0);
  const [badgeNumExc, setBadgeNumExc] = useState(0);
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
              xs={8}
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
                          cursor: 'pointer'
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
                    <Badge badgeContent={badgeNum}>
                      <EmailOutlinedIcon fontSize="large" sx={{ color: '#fff' }}></EmailOutlinedIcon>
                    </Badge>
                  </IconButton>
                  <Menu
                    sx={{
                      maxHeight: '60vh',
                      mt: '45px',
                      mr: '-30px',
                      "& .MuiList-root": {
                        p: '0',
                      },
                      "& .MuiMenu-paper": {
                        borderRadius: '20px',
                        border: '2px solid',
                        borderColor: 'primary.main'
                      }
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <RequestsList close={handleCloseUserMenu} setBadge={setBadgeNum} />
                  </Menu>
                </Box>
                <Box>
                  <IconButton onClick={handleOpenUserMenuExc}>
                    <Badge badgeContent={badgeNumExc}>
                      <NotificationsOutlinedIcon fontSize="large" sx={{ color: '#fff' }}></NotificationsOutlinedIcon>
                    </Badge>
                  </IconButton>
                  <Menu
                    sx={{
                      maxHeight: '60vh',
                      mt: '45px',
                      mr: '-30px',
                      "& .MuiList-root": {
                        p: '0',
                      },
                      "& .MuiMenu-paper": {
                        borderRadius: '20px',
                        border: '2px solid',
                        borderColor: 'primary.main'
                      }
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUserExc}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    open={Boolean(anchorElUserExc)}
                    onClose={handleCloseUserMenuExc}
                  >
                    <ExceptionsList close={handleCloseUserMenuExc} setBadge={setBadgeNumExc} />
                  </Menu>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1} sx={{ mt: '10px', cursor: 'pointer' }} onClick={exit}>
              <div>
                <p>התנתקות</p>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
