import {Outlet} from "react-router-dom";
import { Suspense } from "react";
import FallbackElement from "../../components/FallbackElement";
import ShelterContextProvider from "../../context/ShelterContextProvider";



export default function IndexAdmin() {
  return (
      <Suspense fallback={<FallbackElement />}>
        <Outlet />
      </Suspense>
  );
}
