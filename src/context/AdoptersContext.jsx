import { createContext, useEffect, useState } from "react";
import Dogs from "../Data/Dogs";
import { Alert } from "@mui/material";
import useLocalStorage from "../utilis/useLocalStorge";

export const AdoptersContext = createContext();

export default function AdoptersContextProvider({ children }) {
  const [favoritesDogs, setFavoritesDogs] = useLocalStorage('favorites',[]);

  const AddToFavorites = (dog) => {
    if (favoritesDogs.some((d) => d.numberId == dog.numberId)) return null;

    let tempArr = [...favoritesDogs, dog];

    setFavoritesDogs(tempArr);
  };

  const RemoveFromFavorites = (dog) => {
    let tempArr = favoritesDogs.filter((d) => d.numberId !== dog.numberId);

    setFavoritesDogs(tempArr);
  };

  return (
    <AdoptersContext.Provider
      value={{
        favoritesDogs,
        setFavoritesDogs,
        AddToFavorites,
        RemoveFromFavorites,
      }}
    >
      {children}
    </AdoptersContext.Provider>
  );
}
