import { useContext } from "react";
import { AdopterContext } from "../context/AdopterContex";


 const useAdoptersContext=()=> useContext(AdopterContext)
export default useAdoptersContext;