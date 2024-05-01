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

export default function DogsTinder() {
  // const AllDogs = useLoaderData();

  // console.log("AllDogs", AllDogs);

  return (
    <AdoptersLayout>
      <Swiper
        effect={"creative"}
        grabCursor={true}
        modules={[EffectCreative,Manipulation]}
        creativeEffect={{
          prev: {
            shadow: false,
            translate: ["150%", 0, -800],
            rotate:[0,0,20]
          },
          next: {
            shadow: false,
            translate: ["-150%", 0, -800],
            rotate:[0,0,-20]

          },
        }}
        className="mySwiper"
      >
        {Dogs.map((item) => (
          <SwiperSlide key={item.numberId}>
            <DogCard dog={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      
    </AdoptersLayout>
  );
}
