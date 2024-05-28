import { useContext } from "react";
import { AdoptersContext } from "../context/AdoptersContext";

 const useAdoptersContext=()=>{
  return useContext(AdoptersContext);
}
export default useAdoptersContext;