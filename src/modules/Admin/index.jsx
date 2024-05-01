import { Outlet, RouterProvider, createBrowserRouter, useLoaderData } from "react-router-dom";
import NavBarAdmin from "../../components/NavBarAdmin";
import { element } from "prop-types";
import lazyLoad from "../../utilis/LazyLoad";

const LogInPage = lazyLoad("../modules/Admin/LogInPage");
const SystemPage = lazyLoad("../modules/Admin/SystemPage");
const ControlPage = lazyLoad("../modules/Admin/ControlPage");

export const adminRouts= [
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
    children:[
      {
        path: "/admin/shelter/",
        element: <ControlPage/>,
        loader: async () => {
          return fetch(`/api/Cells/shelter/1`);
        },
      }
    ]
  }
]

export default function IndexAdmin() {


  return (
    <>
      <Outlet/>
    </>
  );
}
