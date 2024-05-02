import { createContext, useEffect, useState } from "react";
import Dogs from "../Data/Dogs";
import { Alert } from "@mui/material";

export const AdoptersContext = createContext();

export default function AdoptersContextProvider({ children }) {
  const [favoritesDogs, setFavoritesDogs] = useState([]);

  const AddToFavorites=(dog)=>{

    let tempArr= [...favoritesDogs,dog];
    
    setFavoritesDogs(tempArr);

  }

  return (
    <AdoptersContext.Provider value={{ favoritesDogs, setFavoritesDogs,AddToFavorites }}>
      {children}
    </AdoptersContext.Provider>
  );
}
