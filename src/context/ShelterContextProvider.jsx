import { createContext, useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import useFetch from "../utilis/useFetch";
import useLocalStorage from "../utilis/useLocalStorge";

export const ShelterContext = createContext();

export default function ShelterContextProvider(props) {

  const [triggerFetch, setTriggerFetch] = useState(0)
  // const cellsData = useRouteLoaderData("כלבייה");
const admin = useLocalStorage("admin",{});
const cells = useFetch(`${import.meta.env.VITE_APP_SERVERURL}Cells/shelter/`+admin.selterNumber,[triggerFetch])

  // const [cells, setCells] = useState(cellsData?cellsData.value:[]);
  const [dogs, setDogs] = useState([]);
  console.log('cellsData',cells );
  useEffect(() => {
    const allDogs = [];
    for (let i = 0; i < cells.value?.length; i++) {
      const tempDogs = cells.value[i].dogsInCell;
      if (tempDogs.length != 0) {
        for (let i = 0; i < tempDogs.length; i++) {
          allDogs.push(tempDogs[i]);
        }
      }
    }
    setDogs(allDogs);
    
  }, [cells.value]);

  return (
    <ShelterContext.Provider value={{ setDogs, dogs, cells,setTriggerFetch }}>
      {props.children}
    </ShelterContext.Provider>
  );
}
