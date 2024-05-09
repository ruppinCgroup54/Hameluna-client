import { createContext, useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

export const ShelterContext = createContext();

export default function ShelterContextProvider(props) {
const cellsData = useRouteLoaderData("כלבייה");

  const [cells, setCells] = useState(cellsData);
  const [dogs, setDogs] = useState([]);

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
