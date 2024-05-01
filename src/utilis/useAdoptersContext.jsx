import { useContext } from "react";
import { AdoptersContext } from "../context/AdoptersContext";

const useAdoptersContext=()=>useContext(AdoptersContext);

export default useAdoptersContext;