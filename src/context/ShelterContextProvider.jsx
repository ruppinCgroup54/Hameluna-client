import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "../utilis/useFetch";
import useLocalStorage from "../utilis/useLocalStorge";

export const ShelterContext = createContext();

export default function ShelterContextProvider(props) {
  const navigate = useNavigate();

  const [triggerFetch, setTriggerFetch] = useState(0)
  // const cellsData = useRouteLoaderData("כלבייה");
  const [loginDet, setLoginDet] = useLocalStorage("loginDet", {});
  const cells = useFetch(`${import.meta.env.VITE_APP_SERVERURL}Cells/shelter/` + loginDet.shelterNumber, {}, [triggerFetch])
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
    if (loginDet.shelterNumber == undefined) {
      navigate('/admin/');
    }
  }, [loginDet])

  const newCell = (e) => {
    e.preventDefault;
    const cell = {
      number: e.target.cellNumber.value,
      capacity: e.target.capacity.value,
      shelterNumber: loginDet.shelterNumber
    };

    fetch(import.meta.env.VITE_APP_SERVERURL + "Cells", {
      method: "POST",
      headers: { "Content-Type": "application/json", dataType: "json" },
      body: JSON.stringify(cell),
    }).then((res) => {
      if (res.ok) {
        console.log('res', res);
        setTriggerFetch(prev => prev + 1);
      }
      else {
        if (res.status === 409) {
          throw new Error(res.text());
        }
      }
    });
  }

  return (
    <ShelterContext.Provider value={{ setDogs, dogs, cells, setTriggerFetch, setLoginDet, loginDet, newCell }}>
      {props.children}
    </ShelterContext.Provider>
  );
}
