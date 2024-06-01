import React, { Suspense } from "react";

import { Outlet } from "react-router-dom";

// import AdoptersContextProvider from "../../context/AdoptersContext";
import FallbackElement from "../../components/FallbackElement";
import AdoptersContextProvider from "../../context/AdoptersContext";


export default function IndexAdopter() {
  return (
    <>
    <AdoptersContextProvider>

      <Suspense>
        <Outlet />
      </Suspense>

      <FallbackElement />
    </AdoptersContextProvider>
    </>
  );
}
