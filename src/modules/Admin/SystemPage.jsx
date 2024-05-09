import { Outlet, useLoaderData } from "react-router-dom";
import NavBarAdmin from "../../components/NavBarAdmin";
import { Suspense, useContext, useEffect } from "react";
import FallbackElement from "../../components/FallbackElement";
import { ShelterContext } from "../../context/ShelterContextProvider";

export default function SystemPage() {

  return (
    <>
      <NavBarAdmin />

      <Suspense fallback={<FallbackElement />}>
        <Outlet />
      </Suspense>
    </>
  );
}
