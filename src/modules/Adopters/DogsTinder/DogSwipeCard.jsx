import React from "react";
import { SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import DogCard from "./DogCard";

export default function DogSwipeCard({ dog, index }) {
  const swiper = useSwiper();

  const addDog = () => {

    swiper.disable();
  };

  const handleClose = () => {
    swiper.enable();
    swiper.slideNext();
    swiper.removeSlide(swiper.activeIndex-1);
  };

  return (
    <DogCard
      dog={dog}
      handleSwipeClose={handleClose}
      handleSwipeAddDog={addDog}
    />
  );
}
