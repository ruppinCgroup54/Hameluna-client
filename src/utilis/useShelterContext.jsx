import { useContext } from "react";
import { ShelterContext } from "../context/ShelterContextProvider";

const useShelterContext=  ()=>  useContext(ShelterContext);

export default useShelterContext;
