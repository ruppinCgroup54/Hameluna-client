import PropTypes, { string } from "prop-types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "./ImageCarousel.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function ImageCarousel({ images }) {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return "<span key=" + index + " class=" + className + "> </span>";
    },
  };

  return (
    <Swiper
      grabCursor={true}
      loop={true}
      pagination={true}
      navigation={true}
      modules={[Pagination, Navigation]}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        margin: "auto",
      }}
    >
      {images.map((image) => (
        <SwiperSlide
          style={{ backgroundPosition: "center", backgroundSize: "cover" }}
          key={image}
        >
          <img
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={image}
          ></img>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(string),
};
