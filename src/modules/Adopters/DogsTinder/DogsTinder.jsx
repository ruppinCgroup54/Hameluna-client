import AdoptersLayout from "../../../layouts/AdoptersLayout";
import Dogs from "../../../Data/Dogs";
import DogSwipeCard from "./DogSwipeCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Manipulation } from "swiper/modules";

export default function DogsTinder() {
  
  // const AllDogs = useLoaderData();
  // console.log("AllDogs", AllDogs);
  return (
    <AdoptersLayout>
      <Swiper
      lazy="true"
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
        {Dogs.map((item) => (
          <SwiperSlide key={item.numberId}>
            <DogSwipeCard dog={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </AdoptersLayout>
  );
}
