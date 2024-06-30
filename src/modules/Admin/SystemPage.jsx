import { Outlet, useLoaderData } from "react-router-dom";
import NavBarAdmin from "../../components/NavBarAdmin";
import { Suspense, useContext, useEffect } from "react";
import FallbackElement from "../../components/FallbackElement";
import ShelterContextProvider, { ShelterContext } from "../../context/ShelterContextProvider";
import BackgroundLayout from "../../layouts/BackgroundLayout";
import useShelterContext from "../../utilis/useShelterContext";


export default function SystemPage() {

  return (
    <>
      <ShelterContextProvider>
        <NavBarAdmin />
        <Suspense fallback={<FallbackElement />}>
            <Outlet />
          <FallbackElement />
        </Suspense>
      </ShelterContextProvider>
    </>
  );
}
