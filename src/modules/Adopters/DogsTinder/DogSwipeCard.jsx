import React from "react";
import { SwiperSlide, useSwiper } from "swiper/react";
import DogCard from "./DogCard";

export default function DogSwipeCard({ dog }) {
  const swiper = useSwiper();
  const myIndex = swiper.activeIndex;

  const addDog = () => {
    swiper.disable();
  };

  const handleClose = () => {
    swiper.enable();
    swiper.slideNext();
    swiper.removeSlide(myIndex);
  };

  return (
    <DogCard
      dog={dog}
      handleSwipeClose={handleClose}
      handleSwipeAddDog={addDog}
    />
  );
}
