import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useRouteLoaderData } from "react-router-dom";
import useFetch from "../utilis/useFetch";
import useLocalStorage from "../utilis/useLocalStorge";

export const ShelterContext = createContext();

export default function ShelterContextProvider(props) {
  const navigate = useNavigate();

  const [triggerFetch, setTriggerFetch] = useState(0)
  // const cellsData = useRouteLoaderData("כלבייה");
  const [loginDet, setLoginDet] = useLocalStorage("loginDet", {});
  const cells = useFetch(`${import.meta.env.VITE_APP_SERVERURL}Cells/shelter/` + loginDet.shelterNumber, [triggerFetch])

  // const [cells, setCells] = useState(cellsData?cellsData.value:[]);
  const [dogs, setDogs] = useState([]);
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

  useEffect(() => {
    if (loginDet.shelterNumber == 0 ) {
      navigate('/admin/');
    }
  }, [loginDet])

  return (
    <ShelterContext.Provider value={{ setDogs, dogs, cells, setTriggerFetch, setLoginDet, loginDet }}>
      {props.children}
    </ShelterContext.Provider>
  );
}
