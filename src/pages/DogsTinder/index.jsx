import React from "react";
import AdoptersLayout from "../../layouts/AdoptersLayout";
import Dogs from "../../Data/Dogs";
import DogCard from "./DogCard";

export default function DogsTinder() {
  return (
    <AdoptersLayout>
      <br />
      <DogCard dog={Dogs[0]} />
    </AdoptersLayout>
  );
}
