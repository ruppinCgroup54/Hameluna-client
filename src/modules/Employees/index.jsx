import { Outlet , RouterProvider, createBrowserRouter, useLoaderData  } from "react-router-dom";
import Chekls from "../Employees/components/chacklistCollapse"
// import DogId from "./DogID";
import CardComp2 from "./components/cardComp2";
import DogsList from "./DogsList";


export const employeesRoutes=[
    {
        path: "/employees/",
        element: <DogsList/>,
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
    
    )
}