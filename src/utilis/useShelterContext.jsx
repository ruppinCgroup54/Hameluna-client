import { useContext } from "react";
import { ShelterContext } from "../context/ShelterContextProvider";

const useShelterContext= async ()=> await useContext(ShelterContext);

export default useShelterContext;
