import React, { Suspense } from "react";

import { Outlet } from "react-router-dom";

// import AdoptersContextProvider from "../../context/AdoptersContext";
import FallbackElement from "../../components/FallbackElement";
import { AdoptersContextProvider } from "../../context/AdopterContex";


export default function index() {
  return (
    <AdoptersContextProvider>
      <Suspense>
        <Outlet />
      </Suspense>

      <FallbackElement />
    </AdoptersContextProvider>
  );
}
