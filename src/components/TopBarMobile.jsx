import Logo from "../components/Logo";

import { AppBar, Badge, Box, IconButton, Toolbar, styled } from "@mui/material";
import { Favorite } from "@mui/icons-material";

import useAdoptersContext from "../utilis/useAdoptersContext";
import { Link, useNavigate } from "react-router-dom";

const BotHead = "images/BotHead.svg";

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

  const navigate = useNavigate();

  return (
      <AppBar sx={{height:"clamp(50px,15vh,80px)"}}>
        <Toolbar
          sx={{ pt: "10px", display: "flex", justifyContent: "space-between", px:3 }}
        >
          <Link to={'/'} style={{textDecoration:'none', width:'40%',display:'flex',flexDirection:'column',alignItems:'center',gap:0,maxWidth:200, color:'inherit'}}>
            <Logo.Bottom maxWidthLogo={'150px'}/>
            <span style={ {fontSize:'0.8rem'}}>ניהול כלביות</span>
          </Link>
          <Box>
            <IconButton onClick={()=>navigate('/dogbot')} >
              <img src={BotHead} alt="Bot head" />
            </IconButton>
            <IconButton onClick={()=>navigate('/favorites')}>
              <StyledBadge badgeContent={favoritesDogs.length}>
                <Favorite sx={{ color: "white", fontSize: "2rem" }} />
              </StyledBadge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
  );
}
