import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLoaderData,
} from "react-router-dom";
import NavBarAdmin from "../../components/NavBarAdmin";
import { element } from "prop-types";
import lazyLoad from "../../utilis/LazyLoad";
import WhosHome from "./WhosHome";
import { Suspense } from "react";
import AdoptersLayout from "../../layouts/AdoptersLayout";
import Logo from "../../components/Logo";
import FallbackElement from "../../components/FallbackElement";
import ShelterContextProvider, {
  ShelterContext,
} from "../../context/ShelterContextProvider";

const LogInPage = lazyLoad("../modules/Admin/LogInPage");
const SystemPage = lazyLoad("../modules/Admin/SystemPage");
const ControlPage = lazyLoad("../modules/Admin/ControlPage");

export const adminRouts = [
  {
    path: "/admin/",
    element: <LogInPage />,
    loader: async () => {
      return fetch(`${import.meta.env.VITE_APP_SERVERURL}Cells/shelter/1`);
    },
  },
  {
    //register
  },
  {
    path: "/admin/shelter",
    element: <SystemPage />,
    children: [
      {
        path: "/admin/shelter/",
        element: <ControlPage />,
      },
      {
        path: "/admin/shelter/whosHome/",
        element: <WhosHome />,
        // loader: async () => {
        //   return fetch(`${import.meta.env.VITE_APP_SERVERURL}Cells/shelter/1`);
        // },
      },
    ],
  },
];

export default function IndexAdmin() {
  return (
    <ShelterContextProvider>
      <Suspense fallback={<FallbackElement />}>
        <Outlet />
      </Suspense>
    </ShelterContextProvider>
  );
}
