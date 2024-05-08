import { Suspense } from "react";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";

import "./App.css";
import ThemeContext from "./context/ThemeContext";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import lazyLoad from "./utilis/LazyLoad";

import ErrorPage from "./components/ErrorPage";
import FallbackElement from "./components/FallbackElement";
import { adminRouts, adopterRoutes } from "./modules/Routes";

const IndexAdopters = lazyLoad("../modules/Adopters/index");
const IndexAdmin = lazyLoad("../modules/Admin/index");


const router = createBrowserRouter([
  {//adopters root
    path: "/",
    element: <IndexAdopters />,
    children: adopterRoutes,
    errorElement:<ErrorPage />
  },
  {//admin root
    path: "/admin",
    element: <IndexAdmin />,
    children: adminRouts,
    errorElement:<ErrorPage />
  },
  {//employees root
    // path: "/admin",
    // children: employeesRoutes,
  },
]);

function App() {

  // const {state}=useNavigation();

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <>
    <ThemeContext>
      <CacheProvider value={cacheRtl} >
        <RouterProvider router={router}>
          <Suspense fallback={<FallbackElement/>}>
            <Outlet />
          </Suspense>
        </RouterProvider>
      </CacheProvider>
    </ThemeContext>
    </>
  );
}

export default App;
