import Logo from "../components/Logo";

import { AppBar, Badge, Box, IconButton, Toolbar, styled } from "@mui/material";
import { Favorite } from "@mui/icons-material";

import BotHead from "../assets/images/BotHead.svg";
import useAdoptersContext from "../utilis/useAdoptersContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    padding: 0,
    fontWeight: "900",
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: `${theme.palette.background.paper}`,
  },
}));

export default function TopBarMobile() {

  const {favoritesDogs}=useAdoptersContext();

  return (
      <AppBar sx={{height:"clamp(50px,15vh,80px)"}}>
        <Toolbar
          sx={{ pt: "10px", display: "flex", justifyContent: "space-between", px:3 }}
        >
          <Box sx={{width:'40%',display:'flex',flexDirection:'column',alignItems:'center',gap:0,maxWidth:200}}>
            <Logo.Bottom maxWidthLogo={'150px'}/>
            <span style={ {fontSize:'0.8rem'}}>ניהול כלביות</span>
          </Box>
          <Box>
            <IconButton>
              <img src={BotHead} alt="Bot head" />
            </IconButton>
            <IconButton>
              <StyledBadge badgeContent={favoritesDogs.length}>
                <Favorite sx={{ color: "white", fontSize: "2rem" }} />
              </StyledBadge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
  );
}
