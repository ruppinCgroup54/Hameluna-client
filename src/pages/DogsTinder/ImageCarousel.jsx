import PropTypes, { string } from "prop-types";

import Carousel from "react-material-ui-carousel"
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

export default function ImageCarousel({ images }) {


  return (

      <Carousel
      height={300}
        autoPlay={false}
        fullHeightHover={false}
        animation="slide"
        NextIcon={<NavigateNext  />}
        PrevIcon={<NavigateBefore />}
        IndicatorIcon={<span></span>}
        sx={{
          height:300,
          backdropFilter: "blur(5px)",
          width: "100%",
          textAlign: "center",
        }}
        indicatorIconButtonProps={{
          style: {
            height: "10px",
            width: "10px",
            backgroundColor: "#afafaf",
            borderRadius: "5px",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            width: "20px",
          },
        }}
        indicatorContainerProps={{
          style: {
            zIndex: 2,
            position: "absolute",
            top: 10,
            width: "100%",
            display: "flex",
            flexDirection:'row-reverse',
            justifyContent: "center",
            gap: 5,
          },
        }}
      >
        {images.map((image) => (
          <img
        style={{width:'100%',height:'100%',objectFit:'cover'}}
            key={image}
            src={image}
          ></img>
        ))}
      </Carousel>

  );
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(string),
};
