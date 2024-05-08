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

export const pathes = [
  {
    path: "/admin/shelter/",
    element: <ControlPage />,
    id:"דף הבית"
  },
  {
    path: "/admin/shelter/whosHome/",
    element: <WhosHome />,
    id: "מי בבית"
  },
  {
    path: "/admin/shelter/whosHome/",
    element: <WhosHome />,
    id: "משימות"
  },
  {
    path: "/admin/shelter/whosHome/",
    element: <WhosHome />,
    id: "סיכומים"
  },
];

export const adminRouts = [
  {
    path: "/admin/",
    element: <LogInPage />,
  },
  {
    //register
  },
  {
    path: "/admin/shelter",
    element: <SystemPage />,
    id: "כלבייה",
    loader: async () => {
      return fetch(`${import.meta.env.VITE_APP_SERVERURL}Cells/shelter/1`);
    },
    children:pathes,
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
