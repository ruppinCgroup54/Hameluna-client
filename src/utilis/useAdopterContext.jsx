import { useContext } from "react";
import { AdoptersContext } from "../context/AdopterContex";


 const useAdoptersContext=()=> useContext(AdoptersContext)
export default useAdoptersContext;