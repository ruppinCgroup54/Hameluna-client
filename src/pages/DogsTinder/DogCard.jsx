import PropTypes, { string } from "prop-types";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  styled,
  useTheme,
} from "@mui/material";

import ImageCarousel from "./ImageCarousel";

const CardStyle = styled(Card)(({ theme }) => ({
  maxWidth: 310,
  borderRadius: "20px",
  boxShadow: `${theme.shadows[15]}`,

  maxHeight: "580px",
  "& .MuiCardContent-root": {
    height: "70%",
    position: "relative",
    top: 0,
  },
  "& .MuiCardMedia-root": {
    height: "300px",
  },
}));

export default function DogCard({ dog }) {
  const theme = useTheme();
  return (
    <CardStyle>
      <CardMedia>
        <ImageCarousel images={dog.images} />
      </CardMedia>

      <CardContent>
        <CardActions>
          <Avatar>
            <FolderIcon />
          </Avatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </CardActions>

        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </CardStyle>
  );
}

DogCard.propTypes = {
  dog: PropTypes.shape({
    name: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.string,
    size: PropTypes.string,
    shelter: PropTypes.string,
    note: PropTypes.string,
    images: PropTypes.arrayOf(string),
  }),
};
