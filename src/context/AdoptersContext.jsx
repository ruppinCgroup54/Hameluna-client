import { createContext, useCallback, useEffect, useReducer, useState } from "react";
import Dogs from "../Data/Dogs";
import { Alert } from "@mui/material";
import useLocalStorage from "../utilis/useLocalStorge";
import { useNavigate, useNavigation, useRouteLoaderData } from "react-router-dom";
import useFetch from "../utilis/useFetch";
import { promise } from "zod";

export const AdoptersContext = createContext({
  favoritesDogs: [],
  loading:false,
  setFavoritesDogs: () => { },
  AddToFavorites: () => { },
  RemoveFromFavorites: () => { },
});

export default function AdoptersContextProvider({ children }) {

  const favorites = useRouteLoaderData("adopter");

  const [loading, setLoading] = useState(false)

  const [id, setId] = useLocalStorage("_id")

  const [favoritesDogs, setFavoritesDogs] = useState(favorites);

  const updateFavorits = (tempArr) => {

    let idOfFav = tempArr.map(d => d.numberId)
    fetch(import.meta.env.VITE_APP_SERVERURL + "dogs/favorites/" + id?.id, {
      method: "POST",
      headers: { "Content-Type": "application/json", "dataType": "json", },
      body: JSON.stringify(idOfFav)
    })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => {
        setFavoritesDogs(tempArr);
        setLoading(false)
      })
      .catch(err => console.log('err', err));

  };

  const AddToFavorites = (dog) => {
    if (favoritesDogs.some((d) => d.numberId == dog.numberId)) return null;

    let tempArr = [...favoritesDogs, dog];
    updateFavorits(tempArr)
  };

  const RemoveFromFavorites = (dog) => {
    setLoading(true);
    let tempArr = favoritesDogs.filter((d) => d.numberId !== dog.numberId)

    updateFavorits(tempArr)

  };


  return (
    <AdoptersContext.Provider
      value={{
        loading,
        favoritesDogs,
        // setFavoritesDogs,
        AddToFavorites,
        RemoveFromFavorites,
      }}
    >
      {children}

    </AdoptersContext.Provider>
  );
}
