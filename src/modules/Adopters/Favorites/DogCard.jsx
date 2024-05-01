import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImageCarousel from "../DogsTinder/ImageCarousel";
import CircleIcons from "../../../components/CircleIcons";
import { Clear, Email } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import useAdoptersContext from "../../../utilis/useAdoptersContext";

const CardStyle = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  minHeight: 150,
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  borderRadius: "15px",
  width: "90%",
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
  const { setFavoritesDogs } = useAdoptersContext();

  return (
    <CardStyle>
      <CardMedia sx={{ width: "40%", height: "100%", borderRadius: "inherit" }}>
        <img src={dog.images[0]} />
      </CardMedia>
      <CardContent>
        <Typography variant="h6">{`${dog.name} | ${dog.age}`}</Typography>
        <Typography variant="body1">
          {`${dog.gender} | ${dog.breed.join("-")} | ${dog.size}`}
        </Typography>
        <CardActions sx={{ p: 0 }}>
          <CircleIcons>
            <IconButton>
              <Clear color="error" />
            </IconButton>
            <IconButton>
              <Email color="primary" />
            </IconButton>
          </CircleIcons>
        </CardActions>
      </CardContent>
    </CardStyle>
  );
}