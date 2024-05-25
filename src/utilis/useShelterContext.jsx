import { useContext } from "react";
import { AdoptersContext } from "../context/AdoptersContext";
import { ShelterContext } from "../context/ShelterContextProvider";

const useShelterContext=()=>useContext(ShelterContext);

export default useShelterContext;
