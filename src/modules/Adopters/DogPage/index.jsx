import React from "react";
import { useLoaderData } from "react-router-dom";
import DogCard from "../DogsTinder/DogCard";
import AdoptersLayout from "../../../layouts/AdoptersLayout";

export default function DogPage() {
  const dog = useLoaderData();
  console.log("dog", dog);
  return (
    <AdoptersLayout>
      <DogCard dog={dog} />
    </AdoptersLayout>
  );
}
