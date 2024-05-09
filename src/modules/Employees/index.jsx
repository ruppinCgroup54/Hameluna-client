import { Outlet , RouterProvider, createBrowserRouter, useLoaderData  } from "react-router-dom";
import DogsCardPage from "./DogsCardPage";
import Chekls from "../Employees/components/chacklistCollapse"
import DogId from "./DogID";
import CardComp2 from "./components/cardComp2"


export const employeesRoutes=[
    {
        path: "/employees/",
        element: <DogsCardPage/>,
      },
      {
        path: "/employees/DogID",
        element: <CardComp2/>,
      },      

    ]

export default function IndexEmployees() {
    return(
    <>
     <Outlet/>
     
    </>
    
    );
}