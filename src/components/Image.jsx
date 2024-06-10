import { ImageListItem, ImageListItemBar } from "@mui/material";

export default function Image({img,isProfile=false}) {
  return (
      <ImageListItem sx={{borderRadius:'15px'}}  >
        <img
          srcSet={`${img}?w=150&h=150&fit=crop&auto=format 2x`}
          src={`${img}?w=150&h=150&fit=crop&auto=format`}
          alt={img}
          loading="lazy"
        />
        <ImageListItemBar
          title={img?.split("_").pop()}
          sx={{textAlign:'right'}}
        />
      </ImageListItem>
);
}