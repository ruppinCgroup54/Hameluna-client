import { Suspense } from "react";

import "./App.css";
import ThemeContext from "./context/ThemeContext";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import lazyLoad from "./utilis/LazyLoad";

const AdoptersHomePage = lazyLoad("../modules/Adopters/AdoptersHomePage/index");
const AdminPage = lazyLoad("../modules/Admin/index");





//const EmployeesPage= lazyLoad("../modules/Adopters/AdoptersHomePage/index");

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdoptersHomePage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children:[
      {
        path:"/admin/",
        element:<AdopterHomePage/>

      }
    ]

  },
]);

function App() {
  return (
    <ThemeContext>
      <RouterProvider router={router}>
        <Suspense fallback={<h1>loading...</h1>}>
          <Outlet />
        </Suspense>
      </RouterProvider>
    </ThemeContext>
  );
}

export default App;
