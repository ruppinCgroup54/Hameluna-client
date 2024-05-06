import { Outlet , RouterProvider, createBrowserRouter, useLoaderData  } from "react-router-dom";
import DogsCardPage from "./DogsCardPage";

export const employeesRoutes=[
    {
        path: "/employees/",
        element: <DogsCardPage/>,
      },

    ]

export default function IndexEmployees() {
    return(
    <>
     <Outlet/>
     
    </>
    
    );
}