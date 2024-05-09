import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLoaderData,
} from "react-router-dom";
import NavBarAdmin from "../../components/NavBarAdmin";
import { element } from "prop-types";
import lazyLoad from "../../utilis/LazyLoad";
import { Suspense } from "react";
import AdoptersLayout from "../../layouts/AdoptersLayout";
import Logo from "../../components/Logo";
import FallbackElement from "../../components/FallbackElement";
import ShelterContextProvider, {
  ShelterContext,
} from "../../context/ShelterContextProvider";






export default function IndexAdmin() {
  return (
    <ShelterContextProvider>
      <Suspense fallback={<FallbackElement />}>
        <Outlet />
      </Suspense>
    </ShelterContextProvider>
  );
}
