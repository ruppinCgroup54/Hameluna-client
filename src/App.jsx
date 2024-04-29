import { Suspense } from "react";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";

import "./App.css";
import ThemeContext from "./context/ThemeContext";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import lazyLoad from "./utilis/LazyLoad";
import { adminRouts } from "./modules/Admin";

const AdoptersHomePage = lazyLoad("../modules/Adopters/AdoptersHomePage/index");

const IndexAdmin = lazyLoad("../modules/Admin/index");
//const EmployeesPage= lazyLoad("../modules/Adopters/AdoptersHomePage/index");


const router = createBrowserRouter([
  {
    path: "/",
    element: <AdoptersHomePage />,

    children: [
      {
        path: "/",
      },
    ],
  },
  {
    path: "/admin",
    element: <IndexAdmin />,
    children: adminRouts
  },
  {
    //employees module
  },
]);

function App() {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <ThemeContext>
      <CacheProvider value={cacheRtl}>
        <RouterProvider router={router}>
          <Suspense fallback={<h1>loading...</h1>}>
            <Outlet />
          </Suspense>
        </RouterProvider>
      </CacheProvider>
    </ThemeContext>
  );
}

export default App;
