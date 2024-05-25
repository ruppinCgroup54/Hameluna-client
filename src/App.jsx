import { Suspense } from "react";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";

import "./App.css";
import ThemeContext from "./context/ThemeContext";

import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";


import ErrorPage from "./components/ErrorPage";
import FallbackElement from "./components/FallbackElement";
import { adminRouts, adopterRoutes, employeesRoutes } from "./modules/Routes";

const router = createHashRouter([
  {//adopters root
    path: "/",
    // element: <IndexAdopters />,
    lazy: () => import("./modules/Adopters/index"),
    children: adopterRoutes,
    errorElement: <ErrorPage />,
    id:"adopter",
    loader: async () => {
      let getId = JSON.parse(localStorage.getItem('_id'));
      if(getId){
        return fetch(import.meta.env.VITE_APP_SERVERURL + "dogs/favorites/" + getId.id);
      }
      else {
          const res = await fetch(import.meta.env.VITE_APP_SERVERURL + "Chats");
          const data = await res.json();
          localStorage.setItem("_id",JSON.stringify(data))
          return [];
      }
    },
  },
  {//admin root
    path: "/admin",
    lazy: () => import("./modules/Admin/index"),
    children: adminRouts,
    errorElement: <ErrorPage />
  },
  {//employees root
    path: "/employees",
    lazy: () => import("./modules/Employees/index"),
    children: employeesRoutes
  },
]);

function App() {

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <>
      <ThemeContext>
        <CacheProvider value={cacheRtl} >
          <RouterProvider router={router}>
            <Suspense fallback={<FallbackElement />}>
              <Outlet />
            </Suspense>
          </RouterProvider>
        </CacheProvider>
      </ThemeContext>
    </>
  );
}

export default App;
