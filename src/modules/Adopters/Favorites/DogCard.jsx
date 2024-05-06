import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircleIcons from "../../../components/CircleIcons";
import { Clear, Email } from "@mui/icons-material";
import { Collapse, IconButton, styled } from "@mui/material";
import useAdoptersContext from "../../../utilis/useAdoptersContext";
import { useState } from "react";

const CardStyle = styled(Card)(({ theme }) => ({
  minHeight: 150,
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  borderRadius: "15px",
  width: "clamp(200px,90vw,400px)",
  boxShadow: theme.shadows[5],
  "& img": {
    display: "block",
    width: "100%",
    height: "100%",
    aspectRatio: "1/1",
    objectFit: "cover",
    borderRadius: "inherit",
  },
  "& .MuiCardContent-root": {
    padding: 0,
    width: "55%",
    highet: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default function DogCard({ dog }) {
  const { RemoveFromFavorites } = useAdoptersContext();
  const [open, setOpen] = useState(true)

  return (
    <Collapse  in={open} onAnimationEnd={()=>RemoveFromFavorites(dog)}>
      <CardStyle>
        <CardMedia
          sx={{ width: "40%", height: "100%", borderRadius: "inherit" }}
        >
          <img src={dog.images?dog.images[0]:""} />
        </CardMedia>
        <CardContent>
          <Typography variant="h6">{`${dog.name} | ${dog.age}`}</Typography>
          <Typography variant="body1">
            {`${dog.gender} | ${dog.breed.join("-")} | ${dog.size}`}
          </Typography>
          <CardActions sx={{ p: 0 }}>
            <CircleIcons>
              <IconButton onClick={() => setOpen(false)}>
                <Clear color="error" />
              </IconButton>
              <IconButton>
                <Email color="primary" />
              </IconButton>
            </CircleIcons>
          </CardActions>
        </CardContent>
      </CardStyle>
    </Collapse>
  );
}
