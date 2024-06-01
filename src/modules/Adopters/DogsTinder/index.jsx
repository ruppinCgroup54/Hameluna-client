import AdoptersLayout from "../../../layouts/AdoptersLayout";
import Dogs from "../../../Data/Dogs";
import DogCard from "./DogCard";

import "./Tinder.css";
import { useLoaderData } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/manipulation";

// import required modules
import { EffectCreative, Manipulation } from "swiper/modules";
import DogSwipeCard from "./DogSwipeCard";
import { Button } from "@mui/material";
import { useState } from "react";

export default function DogsTinder() {
  const AllDogs = useLoaderData();
  

  return (
    <AdoptersLayout>
      <Swiper
        effect={"creative"}
        grabCursor={true}
        modules={[EffectCreative, Manipulation]}
        creativeEffect={{
          prev: {
            shadow: false,
            translate: ["150%", 50, 50, 0, -800],
            rotate: [0, 0, 20],
          },
          next: {
            shadow: false,
            translate: ["-150%", 0, -800],
            rotate: [0, 0, -20],
          },
        }}
        className="mySwiper"
      >
        {AllDogs.map((item, i) => {
          return (
            <SwiperSlide key={item.numberId} >
              <DogSwipeCard dog={item} index={i} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </AdoptersLayout>
  );
}
