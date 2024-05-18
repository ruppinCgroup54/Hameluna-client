import { createContext, useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import useFetch from "../utilis/useFetch";

export const ShelterContext = createContext();

export default function ShelterContextProvider(props) {
// const cellsData = useRouteLoaderData("כלבייה");
const cellsData = useFetch(`${import.meta.env.VITE_APP_SERVERURL}Cells/shelter/1`)

  const [cells, setCells] = useState(cellsData?cellsData:[]);
  const [dogs, setDogs] = useState([]);
  console.log('cellsData', cellsData);
  useEffect(() => {
    const allDogs = [];
    for (let i = 0; i < cells.length; i++) {
      const tempDogs = cells[i].dogsInCell;
      if (tempDogs.length != 0) {
        for (let i = 0; i < tempDogs.length; i++) {
          allDogs.push(tempDogs[i]);
        }
      }
    }
    setDogs(allDogs);
  }, [cells]);

  return (
    <ShelterContext.Provider value={{ setDogs, dogs, setCells, cells }}>
      {props.children}
    </ShelterContext.Provider>
  );
}
