import { Suspense } from "react";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";

import "./App.css";
import ThemeContext from "./context/ThemeContext";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import lazyLoad from "./utilis/LazyLoad";

const AdoptersHomePage = lazyLoad("../modules/Adopters/AdoptersHomePage/index");

const AdminPage = lazyLoad("../modules/Admin/index");
const LogInPage = lazyLoad("../modules/Admin/LogInPage");

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
    path: "admin",
    children: [
      {
        path: "/admin/",
        element: (
          <>
            <h1>first</h1>
            <h1>first</h1>
            <h1>first</h1>
            <h1>first</h1>
          </>
        ),
      },
      {
        path: "/admin/howshome",
        element: (
          <>
            <h1>seconde</h1>
            <h1>seconde</h1>
            <h1>seconde</h1>
            <h1>seconde</h1>
          </>
        ),
      },
    ],
  },
  {
    path: "logIn",
    element: <LogInPage />,
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
