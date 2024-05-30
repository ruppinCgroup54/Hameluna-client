import { createContext, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

import useLocalStorage from "../utilis/useLocalStorge";


export const AdopterContext = createContext();

export function AdoptersContextProvider({ children }) {

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
    <AdopterContext.Provider
      value={{
        loading,
        favoritesDogs,
        // setFavoritesDogs,
        AddToFavorites,
        RemoveFromFavorites,
      }}
    >
      {children}

    </AdopterContext.Provider>
  );
}
