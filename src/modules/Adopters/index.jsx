import React, { Suspense } from "react";

import { Outlet } from "react-router-dom";

import AdoptersContextProvider from "../../context/AdoptersContext";
import FallbackElement from "../../components/FallbackElement";


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
